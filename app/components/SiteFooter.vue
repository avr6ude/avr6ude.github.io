<script setup lang="ts">
import { NbLink } from '@neobrut-vue/core'
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <p>© {{ new Date().getFullYear() }} avrdu.de</p>
      <NbLink href="/rss.xml" tone="ink">RSS feed <span aria-hidden="true">↗</span></NbLink>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 5rem;
  padding: 2rem 0;
  border-top: var(--nb-border-width) solid var(--nb-color-ink);
  background: var(--nb-color-secondary);
}

.site-footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: min(100% - 2rem, var(--page-width));
  margin: 0 auto;
  font-family: var(--nb-font-mono);
  font-size: 0.78rem;
  font-weight: 700;
}

.site-footer p { margin: 0; }
.site-footer a { font-weight: 800; }

@media (max-width: 560px) {
  .site-footer__inner { flex-direction: column; }
}
</style>
