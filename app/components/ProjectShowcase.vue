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
    <NbSeparator class="projects-showcase__rule" />
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
.projects-showcase.page-section { padding: var(--site-space-10) 0 var(--site-space-20); }
.projects-showcase__heading { display: grid; grid-template-columns: minmax(0, 1fr) minmax(18rem, 26rem); align-items: end; gap: clamp(var(--site-space-8), 8vw, var(--site-space-20)); padding-bottom: var(--site-space-6); }
.projects-showcase__heading .section-title { line-height: var(--site-leading-display); }
.projects-showcase__heading p { width: 100%; max-width: 26ch; justify-self: end; margin: 0; line-height: var(--site-leading-copy); text-align: right; text-wrap: balance; }
.projects-showcase__rule { margin-bottom: var(--site-space-8); }
.project-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(var(--site-space-4), 2vw, var(--site-space-6)); align-items: stretch; }
.project-card { display: flex; max-width: none; height: 100%; flex-direction: column; background: var(--project-card-bg); }
.project-card--featured { grid-column: 1 / -1; }
.project-card :deep(.nb-card__body) { flex: 1; }
.project-card__header, .project-card__links { display: flex; align-items: center; justify-content: space-between; gap: var(--site-space-4); }
.project-card__number { font-family: var(--nb-font-mono); font-size: var(--site-font-control); font-weight: var(--site-weight-bold); }
.project-card__tags { display: flex; min-width: 0; flex-wrap: wrap; justify-content: flex-end; gap: var(--site-space-2); }
.project-card h3 { max-width: 12ch; margin: 0; font-family: var(--nb-font-display); font-size: var(--site-size-project); line-height: var(--site-leading-heading); letter-spacing: var(--site-tracking-display); text-wrap: balance; }
.project-card--featured h3 { max-width: 14ch; font-size: var(--site-size-project-featured); }
.project-card p { max-width: 50ch; margin: var(--site-space-6) 0 0; font-size: var(--site-font-body-lg); line-height: var(--site-leading-readable); }
.project-card__links { justify-content: flex-start; }
.project-card__links a { font-family: var(--nb-font-mono); font-size: var(--site-font-control); font-weight: var(--site-weight-bold); text-decoration: none; text-transform: uppercase; }
.project-card__links a:hover { text-decoration: underline; }

@media (max-width: 700px) {
  .projects-showcase.page-section { padding: var(--site-space-8) 0 var(--site-space-10); }
  .projects-showcase__heading { grid-template-columns: 1fr; gap: var(--site-space-3); }
  .projects-showcase__heading p { max-width: 42ch; justify-self: start; text-align: left; }
  .projects-showcase__rule { margin-bottom: var(--site-space-5); }
  .project-list { grid-template-columns: 1fr; gap: var(--site-space-5); }
  .project-card--featured { grid-column: auto; }
  .project-card h3, .project-card--featured h3 { max-width: 14ch; font-size: var(--site-size-project-mobile); }
  .project-card p { margin-top: var(--site-space-4); font-size: var(--site-font-body); }
}
</style>
