<script setup lang="ts">
import { computed } from 'vue'
import { NbBadge, NbSeparator } from '@neobrut-vue/core'
import { readTime } from '~/utils/blog'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const canonical = computed(() => `https://avrdu.de/posts/${slug.value}/`)
const { data: post } = await useAsyncData(
  () => `post-${slug.value}`,
  () => queryCollection('posts').path(`/posts/${slug.value}`).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useHead(() => ({
  title: `${post.value?.title ?? 'Post'} — avrdu.de`,
  link: [{ rel: 'canonical', href: canonical.value }],
  meta: [
    { name: 'description', content: post.value?.excerpt ?? 'Personal blog and projects' },
    { property: 'og:title', content: `${post.value?.title ?? 'Post'} — avrdu.de` },
    { property: 'og:description', content: post.value?.excerpt ?? '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: canonical.value },
    { property: 'og:image', content: 'https://avrdu.de/og.png' },
    { name: 'twitter:title', content: `${post.value?.title ?? 'Post'} — avrdu.de` },
    { name: 'twitter:description', content: post.value?.excerpt ?? '' },
    { name: 'twitter:image', content: 'https://avrdu.de/og.png' },
  ],
}))
</script>

<template>
  <article v-if="post" class="post page-section">
    <header class="post__header">
      <NuxtLink class="post__back" to="/posts/#writing">← back to the archive</NuxtLink>
      <div class="post__kicker">
        <NbBadge v-if="post.til" tone="accent" size="sm">TIL</NbBadge>
        <span>field note / {{ post.tags[0] }}</span>
      </div>
      <h1>{{ post.title }}</h1>
      <PostMeta :date="post.date" :tags="post.tags" :read-time="readTime(post.body)" />
      <p class="post__excerpt">{{ post.excerpt }}</p>
    </header>

    <NbSeparator />

    <div class="article-copy">
      <ContentRenderer :value="post" />
    </div>
  </article>
</template>

<style scoped>
.post { max-width: var(--reading-width); margin: 0 auto; }
.post__header { padding: var(--site-space-6) 0 var(--site-space-14); }
.post__back { display: inline-block; margin-bottom: var(--site-space-12); font-family: var(--nb-font-mono); font-size: var(--site-font-control); font-weight: var(--site-weight-bold); }
.post__kicker { display: flex; align-items: center; gap: var(--site-space-3); margin-bottom: var(--site-space-5); font-family: var(--nb-font-mono); font-size: var(--site-font-meta); font-weight: var(--site-weight-bold); text-transform: uppercase; }
.post h1 { max-width: 16ch; margin: 0 0 var(--site-space-6); font-family: var(--nb-font-display); font-size: var(--site-size-post-title); line-height: var(--site-leading-heading); letter-spacing: var(--site-tracking-display); }
.post__excerpt { max-width: 55ch; margin: var(--site-space-6) 0 0; font-size: var(--site-font-lede); line-height: var(--site-leading-readable); }
.article-copy { padding-top: var(--site-space-12); }

@media (max-width: 700px) {
  .post__header { padding: var(--site-space-3) 0 var(--site-space-9); }
  .post__back { margin-bottom: var(--site-space-8); font-size: var(--site-font-label); }
  .post__kicker { margin-bottom: var(--site-space-3); font-size: var(--site-font-label); }
  .post h1 { font-size: var(--site-size-post-title-mobile); }
  .post__excerpt { margin-top: var(--site-space-4); font-size: var(--site-font-body-md); line-height: var(--site-leading-body); }
  .article-copy { padding-top: var(--site-space-8); }
}
</style>
