---
title: "i made conway's game of life but every cell is AI slop"
date: 2026-03-17
tags: ["project", "react", "ai", "gamedev"]
excerpt: "a cellular automaton where AI art, ChatGPT essays, deepfakes, and SEO spam fight for internet dominance. windows 98 UI because why not."
til: false
---

so i built [game of slop](https://slop.avrdu.de).

it's conway's game of life, except instead of cells being alive or dead, they're different types of AI-generated content fighting for control of the internet.

each one has its own survival rules, and they eat each other in a food chain. SEO spam consumes AI art. clickbait outcompetes SEO spam. AI influencers co-opt clickbait. and so on, in two interlocking cycles that keep the ecosystem from collapsing into a monoculture.

it looks like windows 98 because the internet peaked in 1998 and it's been downhill ever since.

---

## the rules

classic game of life is binary. alive or dead. three neighbors to be born, two or three to survive. elegant, boring after five minutes.

game of slop has eight species competing in a shared grid. each type has:
- a **survival range** - how many friendly neighbors it needs to stay alive
- a **birth condition** - what the neighborhood needs to look like for a new cell to appear
- a **predator** - another type that converts it when enough of them surround it

the predation mechanic is what makes it interesting. cells don't just die - they get *converted* to their predator type. so you get these waves of content washing over the grid, one trend replacing another, like watching twitter in real time but at 200ms per tick.

there are two food chains running simultaneously:

**the content pipeline:** SEO spam → AI art → AI influencers → clickbait → SEO spam

**the tech pipeline:** ChatGPT essays → AI code → AI music → deepfakes → ChatGPT essays

the result is a grid that never stabilizes into something boring. types expand, hit their predator, collapse, seed new growth. it's the dead internet theory as a screensaver.

---

## the ui

the whole thing is styled like windows 98. title bars, beveled borders, taskbar with a start menu and clock, the works. [98.css](https://jdan.github.io/98.css/) does most of the heavy lifting - it's a simple CSS to make your UI look like windows 98 duh.

there's a boot sequence when you first load the page. a whole fake BIOS. then a splash screen with a progress bar. because commitment to the bit matters.

the taskbar has a scrolling news ticker that i used AI to generate the random ass news for.

CRT scanlines are on by default because it's a vibe.

---

## the tech

react, typescript, zustand for state management, vite + bun for the build. the simulation engine and canvas renderer are pure typescript - no react in the hot path. the engine writes to zustand stores directly via `getState()`, and the canvas runs on `requestAnimationFrame` polling a render version counter. react never re-renders for grid updates.

im actually applying for react positions and i need to keep my skill up. even with the ai stuff. otherwise pure JS would've been enough here.

the grid is a double-buffered `Uint8Array` - two flat arrays, one for current state, one for next state, swap pointers after each tick. cache-friendly and zero-allocation per tick.

rendering uses `ImageData` for small cell sizes (write directly to the pixel buffer) and `fillRect` + cached emoji bitmaps for larger sizes. at 16px cells you get actual emoji rendered on each cell which looks surprisingly good.

the whole thing is ~235KB gzipped.

---

## why

because the internet is filling up with AI-generated garbage and the only appropriate response is to make more AI-generated garbage, because it's hella fun (and i've got free claude subscription).

this game is kind of like the actual internet, except this one runs in a browser tab and doesn't try to sell you anything.

[slop.avrdu.de](https://slop.avrdu.de) · [source on github](https://github.com/avr6ude/gameofslop)
