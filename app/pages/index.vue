<script setup lang="ts">
import { NbButton, NbSeparator } from '@neobrut-vue/core'

useSeoMeta({
  title: 'avrdu.de — projects and writing',
  description: 'Projects and writing by avrdu.',
  ogTitle: 'avrdu.de — projects and writing',
  ogDescription: 'Projects and writing by avrdu.',
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

    <section class="writing-callout page-section">
      <div>
        <p class="eyebrow">the other tab</p>
        <h2 class="section-title">writing.</h2>
      </div>
      <NbButton to="/posts/" as="NuxtLink" tone="accent">read the posts ↗</NbButton>
    </section>
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
.hero__lede { align-self: center; max-width: 30ch; margin: 0; font-size: 1.05rem; line-height: 1.55; }
.writing-callout { display: flex; align-items: end; justify-content: space-between; gap: 2rem; }
.writing-callout .eyebrow { margin: 0 0 0.4rem; font-family: var(--nb-font-mono); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
.writing-callout .section-title { margin: 0; }

@media (max-width: 800px) {
  .hero { grid-template-columns: 1fr; gap: 1.25rem; }
  .hero__lede { max-width: 42ch; }
}
@media (max-width: 560px) {
  .hero.page-section { padding: 1.75rem 0 1.5rem; }
  .hero .display-title { font-size: clamp(2.35rem, 13vw, 4rem); }
  .hero__lede { font-size: 0.96rem; line-height: 1.5; }
  .writing-callout { align-items: start; flex-direction: column; gap: 1.25rem; }
}
</style>
