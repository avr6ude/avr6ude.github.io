<script setup lang="ts">
import { NbBadge, NbButton, NbCard } from '@neobrut-vue/core'
import { readTime, tagHref } from '~/utils/blog'

defineProps<{
  post: {
    path: string
    title: string
    date: string | Date
    tags: string[]
    excerpt: string
    til?: boolean
    body?: unknown
  }
}>()
</script>

<template>
  <NbCard class="post-card" tone="paper" interactive>
    <template #header>
      <div class="post-card__topline">
        <PostMeta :date="post.date" :tags="[]" :til="post.til" :read-time="readTime(post.body)" />
        <NbBadge v-if="post.til" tone="secondary" size="sm">NOTE</NbBadge>
      </div>
    </template>
    <h3>{{ post.title }}</h3>
    <p>{{ post.excerpt }}</p>
    <template #footer>
      <div class="post-card__footer">
        <div class="post-card__tags" aria-label="Post tags">
          <span v-for="(tag, index) in post.tags.slice(0, 3)" :key="tag">
            <span v-if="index" aria-hidden="true"> · </span>
            <NuxtLink class="post-card__tag" :to="tagHref(tag)">#{{ tag }}</NuxtLink>
          </span>
          <span v-if="post.tags.length > 3" aria-hidden="true"> · +{{ post.tags.length - 3 }}</span>
        </div>
        <NbButton variant="primary" size="sm" @click="navigateTo(post.path + '/')">
          read more <span aria-hidden="true">↗</span>
        </NbButton>
      </div>
    </template>
  </NbCard>
</template>

<style scoped>
.post-card {
  color: inherit;
}

.post-card:hover {
  transform: translate(3px, 3px);
  box-shadow: 3px 3px 0 var(--nb-color-ink);
}

.post-card__topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.post-card__tags {
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
  min-width: 0;
  overflow: hidden;
  color: color-mix(in srgb, var(--nb-color-ink) 74%, var(--nb-color-paper));
  font-family: var(--nb-font-mono);
  font-size: 0.7rem;
  font-weight: 800;
  line-height: 1.35;
  text-align: left;
  white-space: nowrap;
}

.post-card__tags > span {
  flex: 0 0 auto;
}

.post-card__tag {
  color: inherit;
  text-decoration: none;
}

.post-card__tag:hover,
.post-card__tag:focus-visible {
  text-decoration: underline;
  text-decoration-thickness: 0.12em;
}

.post-card h3 {
  margin: 0;
  font-family: var(--nb-font-display);
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.post-card p {
  max-width: none;
  margin: 1rem 0 1.5rem;
  color: color-mix(in srgb, var(--nb-color-ink) 74%, var(--nb-color-paper));
  line-height: 1.55;
}

.post-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.post-card__footer :deep(.nb-button) {
  flex: 0 0 auto;
  white-space: nowrap;
}

@media (max-width: 700px) {
  .post-card h3 { font-size: clamp(1.3rem, 7vw, 1.8rem); }
  .post-card p { margin: 0.75rem 0 1rem; font-size: 0.92rem; line-height: 1.45; }
  .post-card__tags { font-size: 0.66rem; }
}
</style>
