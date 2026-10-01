<script setup lang="ts">
import { NbSeparator } from '@neobrut-vue/core'

useSeoMeta({
  title: 'avrdu.de — projects and writing',
  description: 'My projects and writing.',
  ogTitle: 'avrdu.de — projects and writing',
  ogDescription: 'My projects and writing.',
  ogImage: '/og.png',
})
</script>

<template>
  <div>
    <section class="hero page-section">
      <div class="hero__copy">
        <h1 class="display-title">building things for the web.</h1>
      </div>
      <p class="hero__lede">
        Developer, tinkerer, occasional writer, lazy bum, hater. I build stuff and write down what I learn before it evaporates.
      </p>
    </section>

    <NbSeparator />
    <ProjectShowcase />
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 24rem);
  gap: clamp(var(--site-space-8), 7vw, var(--site-space-12));
  align-items: end;
}
.hero.page-section { padding: var(--site-space-12) 0 var(--site-space-10); }
.hero .display-title { max-width: 11ch; font-size: var(--site-size-hero); }
.hero__lede { align-self: center; width: 100%; max-width: 30ch; justify-self: end; margin: 0; font-size: var(--site-font-body-lg); line-height: var(--site-leading-readable); text-align: right; text-wrap: balance; }

@media (max-width: 800px) {
  .hero { grid-template-columns: 1fr; gap: var(--site-space-5); }
  .hero__lede { max-width: 42ch; justify-self: start; text-align: left; }
}
@media (max-width: 560px) {
  .hero.page-section { padding: var(--site-space-7) 0 var(--site-space-6); }
  .hero .display-title { font-size: var(--site-size-hero-mobile); }
  .hero__lede { font-size: var(--site-font-body); line-height: var(--site-leading-body); }
}
</style>
