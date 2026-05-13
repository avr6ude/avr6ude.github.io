---
title: "casky: batch cask installer for homebrew because every other package manager has one"
date: 2026-05-13
tags: ["project", "macos", "homebrew", "react", "parkui"]
excerpt: "winget has winstall. chocolatey has chocolatey.org. apt has tasksel. aur has meta-packages. homebrew cask had macapps.link, and then it died"
til: false
---

so i built [casky](https://casky.app).

it's a web app that lets you tick a bunch of mac apps from the homebrew cask catalog, copy one `brew install --cask ...` line, paste it into a fresh mac, and walk away. that's the whole product.

## why

every other package manager already has this and homebrew doesn't.

- winget → [winstall.app](https://winstall.app)
- chocolatey → the official site lists everything, you copy `choco install a b c` and ship it
- arch's aur → meta-packages and `pacman -S - < list.txt`
- debian/ubuntu → `tasksel`, plus the entire pre-seed ecosystem, plus `apt install $(cat pkgs.txt)`

homebrew cask can absolutely do `brew install --cask a b c d` — the binary supports it. what's missing is the discovery surface. the thing that lets you scroll through ~7000 casks, tick the twenty you actually want on a new mac, and end up with a single line.

[macapps.link](https://macapps.link) used to be that thing. it was a curated, hand-maintained list of `.pkg` urls wrapped in a one-liner script. great idea, but the maintainer stepped away years ago, the list froze, and the urls rot the way hardcoded download links always do. nobody replaced it.

so casky is a revival of the idea, but cheating: instead of curating apps by hand, it pulls the entire live homebrew cask catalog from brew formulaes and lets you build your line from that. when homebrew updates the catalog, casky updates with it. no maintenance treadmill.

## for whom

three people:

1. **sysadmins doing mass mac rollouts.** company buys twenty MacBooks, someone has to set them up. ticking apps in a UI and pasting one line into each new machine beats the hell out of a per-app dance through twenty installer DMGs.
2. **people setting up their own new mac.** every couple years you do this once and forget the list you used last time. casky lets you share a link with your selections, so you can bookmark "my new mac kit" and never think about it again.
3. **people sending a setup link to a less technical friend.** "open terminal, paste this, hit enter." done.

it's not trying to replace `brew bundle` and a `Brewfile` for people who already live in dotfiles. those people are sorted. it's for the much larger group who don't want to write a brewfile and just want to click stuff.

## stack

- **bun + vite + react + typescript.** bun because the dev loop is fast and i didn't need anything node-specific. vite for the build. react 19 because i aimed of doing this as a portfolio project.
- **park ui (ark ui primitives) + panda css.** ark gives you headless behavior, park ui gives you styled recipes on top, panda compiles your styles to atomic css at build time. zero runtime style cost.
- **zustand** for cart + filters + catalog. it's three slices and ~150 lines, react built-in state management sucks so this is the simplest way.
- **fuse.js** for fuzzy search across ~7000 casks. indexed once on catalog load, queries are sub-ms.
- **react virtuoso** for the grid virtualization. you cannot render 7000 DOM nodes and expect the page to be useable.
- **framer motion** for the cool animations.
- **idb-keyval** wrapping indexeddb for a stale-while-revalidate cache of the catalog. first visit fetches ~7000 casks, every subsequent visit reads from indexeddb instantly and revalidates in the background after 24h.

## the share URL trick

selections are encoded into the URL path — `casky.app/share/<encoded>` — so links round-trip a full selection without any backend. the client decodes the path on load and rehydrates the cart.

repo: [github.com/avr6ude/casky](https://github.com/avr6ude/casky). cask metadata is homebrew's. if you find yourself wishing it had a "kits" page for, say, "data engineering on a fresh mac" or "videographer starter pack", PRs are more than welcome.
