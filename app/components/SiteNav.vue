<script setup lang="ts">
import { NbLink } from '@neobrut-vue/core'
import { NuxtLink } from '#components'
</script>

<template>
  <header class="site-nav">
    <div class="site-nav__inner">
      <NbLink :as="NuxtLink" class="site-nav__brand" to="/" aria-label="avrdu.de home" tone="ink">
        <span class="site-nav__mark" aria-hidden="true">a/</span>
        <span>avrdu.de</span>
      </NbLink>

      <nav class="site-nav__links" aria-label="Main navigation">
        <NbLink :as="NuxtLink" to="/#writing" tone="ink">writing</NbLink>
        <NbLink :as="NuxtLink" to="/projects/" tone="ink">projects</NbLink>
        <NbLink :as="NuxtLink" to="/about/" tone="ink">about</NbLink>
        <NbLink href="/rss.xml" tone="ink">rss</NbLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-nav {
  padding: 1.25rem 0;
  border-bottom: var(--nb-border-width) solid var(--nb-color-ink);
  background: var(--nb-color-primary);
}

.site-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(100% - 2rem, var(--page-width));
  margin: 0 auto;
}

.site-nav__brand,
.site-nav__links a {
  font-family: var(--nb-font-mono);
  font-weight: 800;
  text-decoration: none;
}

.site-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.05rem;
}

.site-nav__mark {
  display: grid;
  width: 2rem;
  height: 1.8rem;
  place-items: center;
  border: 2px solid var(--nb-color-ink);
  border-radius: var(--nb-radius-sm);
  background: var(--nb-color-accent);
  box-shadow: 3px 3px 0 var(--nb-color-ink);
  font-family: var(--nb-font-display);
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.12em;
  line-height: 1;
  transform: rotate(-4deg);
}

.site-nav__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.7rem 1.1rem;
}

.site-nav__links a {
  padding: 0.2rem 0.35rem;
  border-bottom: 2px solid transparent;
}

.site-nav__links a:hover,
.site-nav__links a.router-link-active {
  border-bottom-color: currentColor;
}

@media (max-width: 560px) {
  .site-nav { padding: 0.8rem 0; }
  .site-nav__inner { align-items: center; flex-direction: row; gap: 0.6rem; }
  .site-nav__brand { font-size: 0.86rem; }
  .site-nav__mark { width: 1.7rem; height: 1.5rem; font-size: 0.9rem; }
  .site-nav__links { justify-content: flex-end; gap: 0.25rem; }
  .site-nav__links a { padding: 0.15rem 0.2rem; font-size: 0.68rem; }
}
</style>
