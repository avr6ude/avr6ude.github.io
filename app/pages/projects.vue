<script setup lang="ts">
import { NbBadge, NbCard, NbSeparator } from '@neobrut-vue/core'

const projects = [
  {
    name: 'Game of Slop',
    description: "Conway's Game of Life but every cell is AI-generated slop. Eight species fight for internet dominance in a Windows 98 fever dream.",
    tags: ['react', 'typescript', 'gamedev', 'ai'],
    links: [{ label: 'play', url: 'https://slop.avrdu.de' }, { label: 'source', url: 'https://github.com/avr6ude/gameofslop' }],
    tone: 'primary' as const,
  },
  {
    name: 'casky',
    description: 'Pick a pile of Mac apps from the Homebrew Cask catalog and get one install command. The setup ritual, compressed.',
    tags: ['bun', 'react', 'homebrew'],
    links: [{ label: 'visit', url: 'https://casky.app' }, { label: 'source', url: 'https://github.com/avr6ude/casky' }],
    tone: 'secondary' as const,
  },
  {
    name: 'avrdu.de',
    description: 'This place. A Markdown blog rebuilt with Nuxt SSG, a custom neo-brutalist component library, and static files on Cloudflare Pages.',
    tags: ['nuxt', 'vue', 'cloudflare'],
    links: [{ label: 'source', url: 'https://github.com/avr6ude/avrdu.de' }],
    tone: 'ink' as const,
  },
]

useSeoMeta({
  title: 'Projects — avrdu.de',
  description: 'Things avrdu has built or is building.',
})
</script>

<template>
  <div class="projects-page page-section">
    <h1 class="display-title">projects.</h1>
    <p class="projects-page__lede">Small tools, weird experiments, and at least one project that should have been a shell script.</p>
    <NbSeparator />

    <div class="project-list">
      <NbCard v-for="(project, index) in projects" :key="project.name" :tone="project.tone" :class="['project-card', `project-card--${index + 1}`]" interactive>
        <template #header>
          <div class="project-card__header">
            <span class="project-card__number">0{{ index + 1 }}</span>
            <div class="project-card__tags">
              <NbBadge v-for="tag in project.tags" :key="tag" tone="paper" size="sm">{{ tag }}</NbBadge>
            </div>
          </div>
        </template>
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <template #footer>
          <div class="project-card__links">
            <a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" rel="noopener">{{ link.label }} ↗</a>
          </div>
        </template>
      </NbCard>
    </div>
  </div>
</template>

<style scoped>
.projects-page { max-width: 64rem; margin: 0 auto; }
.projects-page__lede { max-width: 42ch; margin: 2rem 0 3rem; font-size: 1.3rem; line-height: 1.45; }
.project-list { display: grid; gap: 2rem; }
.project-card { max-width: 44rem; }
.project-card--2 { margin-left: 10%; }
.project-card--3 { margin-left: 20%; }
.project-card__header, .project-card__links { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.project-card__number { font-family: var(--nb-font-mono); font-size: 0.8rem; font-weight: 800; }
.project-card__tags { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.4rem; }
.project-card h2 { margin: 0; font-family: var(--nb-font-display); font-size: clamp(2.25rem, 6vw, 4.5rem); line-height: 0.88; letter-spacing: -0.07em; }
.project-card p { max-width: 50ch; margin: 1.5rem 0 0; font-size: 1.05rem; line-height: 1.55; }
.project-card__links { justify-content: flex-start; }
.project-card__links a { font-family: var(--nb-font-mono); font-size: 0.8rem; font-weight: 800; text-decoration: none; text-transform: uppercase; }
.project-card__links a:hover { text-decoration: underline; }
@media (max-width: 700px) { .project-card--2, .project-card--3 { margin-left: 0; } }
@media (max-width: 700px) {
  .projects-page__lede { margin: 1.25rem 0 2rem; font-size: 1.05rem; }
  .project-card h2 { font-size: clamp(1.9rem, 10vw, 3.2rem); }
  .project-card p { margin-top: 1rem; font-size: 0.94rem; }
}
</style>
