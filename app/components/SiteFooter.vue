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
  margin-top: var(--site-space-20);
  padding: var(--site-space-8) 0;
  border-top: var(--site-border);
  background: var(--nb-color-secondary);
}

.site-footer__inner {
  display: flex;
  justify-content: space-between;
  gap: var(--site-space-4);
  width: min(100% - (2 * var(--site-gutter)), var(--page-width));
  margin: 0 auto;
  font-family: var(--nb-font-mono);
  font-size: var(--site-font-caption);
  font-weight: var(--site-weight-strong);
}

.site-footer p { margin: 0; }
.site-footer a { font-weight: var(--site-weight-bold); }

@media (max-width: 560px) {
  .site-footer__inner { flex-direction: column; }
}
</style>
