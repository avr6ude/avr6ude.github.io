---
title: "TIL: CSS Container Queries"
date: 2026-03-16
tags: ["css", "frontend"]
excerpt: "Container queries let you style elements based on the size of their container, not just the viewport."
til: true
---

Container queries let you write responsive styles based on the **container's** size rather than the viewport. This is a game-changer for component-based design.

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

The `container-type: inline-size` declaration sets up the containment context. Then `@container` queries work just like `@media` queries, but scoped to the nearest ancestor container.

Browser support is solid across all modern browsers. No polyfill needed.
