---
title: "i built a website to tell people to stop using ssr"
date: 2025-03-17
tags: ["ssr", "nextjs", "webdev"]
excerpt: "the ecosystem keeps pushing SSR as the default for everything. i got tired of it."
til: false
---

i'm fucking sick of it.

every tutorial, every job posting, every "modern web dev" course. Next.js this, Nuxt.js that. SSR. server components. as if rendering HTML on a server is some revolutionary idea we just invented and not literally what PHP was doing twenty years ago.

so i built [stopusingssr.com](https://stopusingssr.com). a static website. deployed to a CDN. about how you don't need a server to render your website. all for free.

the irony was the point.

![fix everything switch meme](/images/ssr-switch.webp)

---

## how it started

we needed a blog. a company blog. static content, published occasionally, read by humans and maybe some crawlers. the most boring infrastructure problem in existence.

our CTO didn't want to deploy a Node.js server for it. he's not a frontend guy - he wasn't making a point about SSR vs static or SEO or any of that. his reason was simpler: we already had a project drowning in microservices. adding another server, another deployment, another thing to monitor and maintain and wake up at 3am for - for a simple blog - made no sense to him. and to make it worse, we didn't have a single Node.js deployment in the entire project. not one. every service was running python or rust. so this wasn't just "another server" - it was introducing a whole new runtime into the stack. for a blog. pure infrastructure pragmatism.

our team lead wanted Next.js anyway. for "SEO" and "React".

i tried to explain the frontend side of it - static HTML on a CDN is already the best thing you can do for SEO. faster, globally cached, no server latency, no cold starts. Next.js wasn't going to help. it was going to add complexity without adding anything.

the lead didn't want to hear it. from either of us.

so we got a Node.js server. for a blog. one more thing to maintain in a pile that was already too big, solving a problem that didn't exist, for SEO reasons that were never real.

and our CTO - who just didn't want more servers, which is a completely reasonable thing to not want - was pushed out over it among other things.

that's the story. someone's ego and an unquestioned default choice cost a good engineer their time and gave a company a server they never needed.

i built stopusingssr.com because that conversation happens everywhere, every day, and most of the time nobody wins the argument even when they're obviously fucking right. maybe a website helps.

---

## the thing nobody says out loud

Vercel built Next.js. Vercel charges you per function invocation. Vercel's entire business model scales with how much server compute your app uses.

and Vercel's documentation, their tutorials, their examples, their conference talks, tons of paid articles on how Next.js "helped with their website" - all of them push you toward SSR by default. to give them more money. to make someone rich.

i'm not saying it's a conspiracy. i'm saying it's a conflict of interest and you should factor that in when the ecosystem tells you "just use Next.js."

the receipts are real. [$96k in one month](https://news.ycombinator.com/item?id=40618220). [$46k after hitting 450M pageviews](https://serverlesshorrors.com/). [$23k from someone spamming a form](https://serverlesshorrors.com/). these aren't edge cases. they're what happens when your architecture bills per request and something goes wrong.

a SPA on Cloudflare Pages? the same traffic costs zero. literally zero. because you're serving files, not running a server. it won't cost you a dime to do this. don't want to deal with Cloudflare? go use github pages. you are free to choose. you can even host it on your router, your landing with flashy graphics and stock images is not something you need a whole-ass server for.

---

## the php argument

here's the thing that really gets me.

SSR is not new. it's not modern. it's not innovative. it's PHP. good old PHP that we all hate yet keep using. it's what the entire industry spent a decade escaping when SPAs became viable.

people moved client-side because servers were expensive, deployments were painful, and the user experience of a well-built SPA was genuinely better. that was the right call.

and now we're back. same idea, different branding. "React Server Components" instead of "PHP templates." `getServerSideProps` instead of `<?php echo $title ?>`. a $20/month Vercel bill instead of a $5 VPS plan or Cloudflare Pages again.

at least PHP was honest about what it was.

---

## when SSR actually makes sense (or does it?)

i'm not saying never use SSR. i'm saying stop using it as the default.

it makes sense when:
- you have public pages that need real SEO - like an e-commerce product catalog or a news site
- each URL needs unique metadata for social sharing
- the content changes per URL, not per user

and even then - if SEO is genuinely your concern, you don't need React or Vue or any other flashy framework to solve it. you just need HTML. vanilla JS. the stuff browsers have been running natively for thirty years. you don't need a server runtime and a framework and a deployment pipeline to write a `<title>` tag and some `<meta>` descriptions. the platform already does that. it has always done that.

that's it. that's the whole list.

if your app is behind a login, SSR gives you nothing. if you're building a dashboard, SSR still gives you nothing. if you're building a SaaS product where "the users" are your customers, SSR gives you nothing except a server to maintain and a bill that scales with your traffic.

---

## what i actually built

the site is pure HTML. no build step beyond minification. deployed to Cloudflare Pages. for free.

it has:
- a breakdown of reasons SSR is the wrong default
- unironically a PHP comparison (because someone had to say it)
- actual documented billing incidents from people who fell victim
- a decision tree: questions that tell you whether you actually need SSR (trust me, you don't)
- a side-by-side comparison of SSR vs SPA

the whole thing scores 100 on Lighthouse. obviously. it's a static file.
and this post you're reading right now? static too.

"but wait - this blog runs Astro. isn't that hypocritical?"
nope. Astro runs once, at build time, on your machine or in CI. it reads your markdown, generates HTML files, and then it's done. 

there's no Astro or React or Vue or whatever running anywhere when you load this page. no server, no runtime, no invocations. just a file Cloudflare found on a shelf and handed to your browser.

that's why Astro exists in the first place - not to be a server, but to make building static sites with components and markdown actually pleasant for a lazy ass like me. it's a build tool that happens to understand HTML really well. once it's done building, it disappears.

a goddamn blog. a simple thing a lot of people reach Next.js for. running as flat files on a CDN.

it's its own proof.

---

## the point

i'm not trying to tell you what to build with. use whatever makes sense for your project. that's literally the message.

the problem is the community (and Vercel with its paid articles) has normalized SSR as the starting point, the safe choice, the "professional" option - and it's none of those things for most apps.

your users have devices that run AAA games. their browsers are more capable than ever. the CDN infrastructure available for free in 2025 would have seemed insane ten years ago.

you don't need a server to render a string of HTML for them. you never did.

[stopusingssr.com](https://stopusingssr.com)
