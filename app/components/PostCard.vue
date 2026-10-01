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
  transform: translate(var(--site-space-1), var(--site-space-1));
  box-shadow: var(--site-shadow-small);
}

.post-card__topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--site-space-4);
}

.post-card__tags {
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
  min-width: 0;
  overflow: hidden;
  color: color-mix(in srgb, var(--nb-color-ink) 74%, var(--nb-color-paper));
  font-family: var(--nb-font-mono);
  font-size: var(--site-font-small);
  font-weight: var(--site-weight-bold);
  line-height: var(--site-leading-meta);
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
  font-size: var(--site-size-card);
  line-height: var(--site-leading-tight);
  letter-spacing: var(--site-tracking-card);
}

.post-card p {
  max-width: none;
  margin: var(--site-space-4) 0 var(--site-space-6);
  color: color-mix(in srgb, var(--nb-color-ink) 74%, var(--nb-color-paper));
  line-height: var(--site-leading-readable);
}

.post-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--site-space-4);
}

.post-card__footer :deep(.nb-button) {
  flex: 0 0 auto;
  white-space: nowrap;
}

@media (max-width: 700px) {
  .post-card h3 { font-size: var(--site-size-card-mobile); }
  .post-card p { margin: var(--site-space-3) 0 var(--site-space-4); font-size: var(--site-font-body-sm); line-height: var(--site-leading-copy); }
  .post-card__tags { font-size: var(--site-font-compact); }
}
</style>
