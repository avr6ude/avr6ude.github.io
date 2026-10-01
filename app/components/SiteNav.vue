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
        <NbLink :as="NuxtLink" to="/" tone="ink">projects</NbLink>
        <NbLink :as="NuxtLink" to="/posts/" tone="ink">writing</NbLink>
        <NbLink :as="NuxtLink" to="/about/" tone="ink">about</NbLink>
        <NbLink href="/rss.xml" tone="ink">rss</NbLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-nav {
  padding: var(--site-space-5) 0;
  border-bottom: var(--site-border);
  background: var(--nb-color-primary);
}

.site-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--site-space-4);
  width: min(100% - (2 * var(--site-gutter)), var(--page-width));
  margin: 0 auto;
}

.site-nav__brand,
.site-nav__links a {
  font-family: var(--nb-font-mono);
  font-weight: var(--site-weight-bold);
  text-decoration: none;
}

.site-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--site-space-2);
  font-size: var(--site-font-body-lg);
}

.site-nav__mark {
  display: grid;
  width: var(--site-size-mark-width);
  height: var(--site-size-mark-height);
  place-items: center;
  border: var(--site-border-thin);
  border-radius: var(--site-radius-small);
  background: var(--nb-color-accent);
  box-shadow: var(--site-shadow-small);
  font-family: var(--nb-font-display);
  font-size: var(--site-font-body-lg);
  font-weight: var(--site-weight-bold);
  letter-spacing: var(--site-tracking-tight);
  line-height: var(--site-leading-single);
  transform: rotate(-4deg);
}

.site-nav__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--site-space-3) var(--site-space-5);
}

.site-nav__links a {
  padding: var(--site-space-1) var(--site-space-2);
  border-bottom: var(--site-border-transparent);
}

.site-nav__links a:hover,
.site-nav__links a.router-link-active {
  border-bottom-color: currentColor;
}

@media (max-width: 560px) {
  .site-nav { padding: var(--site-space-3) 0; }
  .site-nav__inner { align-items: center; flex-direction: row; gap: var(--site-space-2); }
  .site-nav__brand { font-size: var(--site-font-body-sm); }
  .site-nav__mark { width: var(--site-size-mark-width-mobile); height: var(--site-size-mark-height-mobile); font-size: var(--site-font-body-md); }
  .site-nav__links { justify-content: flex-end; gap: var(--site-space-1); }
  .site-nav__links a { padding: var(--site-space-1) var(--site-space-1); font-size: var(--site-font-label); }
}
</style>
