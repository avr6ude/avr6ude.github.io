<script setup lang="ts">
import { NbBadge } from '@neobrut-vue/core'
import { formatDate, toTagLinks } from '~/utils/blog'

const props = defineProps<{
  date: string | Date
  tags: string[]
  til?: boolean
  readTime?: string
}>()

const hasMiddle = computed(() => props.til || props.tags.length > 0)
const tagLinks = computed(() => toTagLinks(props.tags))
</script>

<template>
  <div class="post-meta">
    <time :datetime="new Date(props.date).toISOString()">{{ formatDate(props.date) }}</time>
    <template v-if="hasMiddle">
      <span aria-hidden="true">/</span>
      <NbBadge v-if="til" tone="accent" size="sm">TIL</NbBadge>
      <NuxtLink v-for="tagLink in tagLinks" :key="tagLink.href" :to="tagLink.href" class="post-meta__tag">
        {{ tagLink.label }}
      </NuxtLink>
    </template>
    <span v-if="readTime" aria-hidden="true">/</span>
    <span v-if="readTime">{{ readTime }}</span>
  </div>
</template>

<style scoped>
.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--site-space-2) var(--site-space-3);
  color: color-mix(in srgb, var(--nb-color-ink) 68%, var(--nb-color-paper));
  font-family: var(--nb-font-mono);
  font-size: var(--site-font-meta);
  font-weight: var(--site-weight-strong);
}

.post-meta__tag { color: var(--nb-color-ink); }
</style>
