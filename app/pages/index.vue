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
  gap: clamp(2rem, 7vw, 6rem);
  align-items: end;
}
.hero.page-section { padding: 3rem 0 2.5rem; }
.hero .display-title { max-width: 11ch; font-size: clamp(2.75rem, 7vw, 5.5rem); }
.hero__lede { align-self: center; width: 100%; max-width: 30ch; justify-self: end; margin: 0; font-size: 1.05rem; line-height: 1.55; text-align: right; text-wrap: balance; }

@media (max-width: 800px) {
  .hero { grid-template-columns: 1fr; gap: 1.25rem; }
  .hero__lede { max-width: 42ch; justify-self: start; text-align: left; }
}
@media (max-width: 560px) {
  .hero.page-section { padding: 1.75rem 0 1.5rem; }
  .hero .display-title { font-size: clamp(2.35rem, 13vw, 4rem); }
  .hero__lede { font-size: 0.96rem; line-height: 1.5; }
}
</style>
