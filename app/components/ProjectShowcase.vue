<script setup lang="ts">
import { NbBadge, NbCard, NbSeparator } from '@neobrut-vue/core'
import { projects } from '~/utils/projects'
</script>

<template>
  <section class="projects-showcase page-section" aria-labelledby="projects-title">
    <div class="projects-showcase__heading">
      <h2 id="projects-title" class="section-title">projects.</h2>
      <p>Stuff I built, shipped, or keep poking at.</p>
    </div>
    <NbSeparator />
    <div class="project-list">
      <NbCard
        v-for="(project, index) in projects"
        :key="project.name"
        tone="paper"
        :class="['project-card', { 'project-card--featured': project.featured }]"
        :style="{ '--project-card-bg': `var(--nb-color-${project.color})` }"
        interactive
      >
        <template #header>
          <div class="project-card__header">
            <span class="project-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="project-card__tags">
              <NbBadge v-for="tag in project.tags" :key="tag" tone="paper" size="sm">{{ tag }}</NbBadge>
            </div>
          </div>
        </template>
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <template #footer>
          <div class="project-card__links">
            <a :href="project.url" target="_blank" rel="noopener">visit ↗</a>
            <a v-if="project.source" :href="project.source" target="_blank" rel="noopener">source ↗</a>
          </div>
        </template>
      </NbCard>
    </div>
  </section>
</template>

<style scoped>
.projects-showcase.page-section { padding: 2.5rem 0 5rem; }
.projects-showcase__heading { display: grid; grid-template-columns: minmax(0, 1fr) minmax(18rem, 30rem); align-items: end; gap: 2rem; }
.projects-showcase__heading p { width: 100%; max-width: none; margin: 0; line-height: 1.45; text-align: right; text-wrap: pretty; }
.project-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; padding-top: 2rem; }
.project-card { max-width: none; background: var(--project-card-bg); }
.project-card--featured { grid-column: 1 / -1; }
.project-card__header, .project-card__links { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.project-card__number { font-family: var(--nb-font-mono); font-size: 0.8rem; font-weight: 800; }
.project-card__tags { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.4rem; }
.project-card h3 { margin: 0; font-family: var(--nb-font-display); font-size: clamp(2.25rem, 6vw, 4.5rem); line-height: 0.88; letter-spacing: -0.07em; }
.project-card p { max-width: 50ch; margin: 1.5rem 0 0; font-size: 1.05rem; line-height: 1.55; }
.project-card__links { justify-content: flex-start; }
.project-card__links a { font-family: var(--nb-font-mono); font-size: 0.8rem; font-weight: 800; text-decoration: none; text-transform: uppercase; }
.project-card__links a:hover { text-decoration: underline; }

@media (max-width: 700px) {
  .projects-showcase.page-section { padding: 2rem 0 2.75rem; }
  .projects-showcase__heading { grid-template-columns: 1fr; gap: 0.75rem; }
  .projects-showcase__heading p { text-align: left; }
  .project-list { grid-template-columns: 1fr; gap: 1.25rem; }
  .project-card--featured { grid-column: auto; }
  .project-card h3 { font-size: clamp(1.9rem, 10vw, 3.2rem); }
  .project-card p { margin-top: 1rem; font-size: 0.94rem; }
}
</style>
