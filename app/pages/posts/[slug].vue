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
    { name: 'description', content: post.value?.description ?? 'Personal blog and projects' },
    { property: 'og:title', content: `${post.value?.title ?? 'Post'} — avrdu.de` },
    { property: 'og:description', content: post.value?.description ?? '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: canonical.value },
    { property: 'og:image', content: 'https://avrdu.de/og.png' },
    { name: 'twitter:title', content: `${post.value?.title ?? 'Post'} — avrdu.de` },
    { name: 'twitter:description', content: post.value?.description ?? '' },
    { name: 'twitter:image', content: 'https://avrdu.de/og.png' },
  ],
}))
</script>

<template>
  <article v-if="post" class="post page-section">
    <header class="post__header">
      <NuxtLink class="post__back" to="/#writing">← back to the archive</NuxtLink>
      <div class="post__kicker">
        <NbBadge v-if="post.til" tone="accent" size="sm">TIL</NbBadge>
        <span>field note / {{ post.tags[0] }}</span>
      </div>
      <h1>{{ post.title }}</h1>
      <PostMeta :date="post.date" :tags="post.tags" :read-time="readTime(post.description)" />
      <p class="post__excerpt">{{ post.description }}</p>
    </header>

    <NbSeparator />

    <div class="article-copy">
      <ContentRenderer :value="post" />
    </div>
  </article>
</template>

<style scoped>
.post { max-width: var(--reading-width); margin: 0 auto; }
.post__header { padding: 1.5rem 0 3.5rem; }
.post__back { display: inline-block; margin-bottom: 3rem; font-family: var(--nb-font-mono); font-size: 0.8rem; font-weight: 800; }
.post__kicker { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 1.25rem; font-family: var(--nb-font-mono); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
.post h1 { max-width: 16ch; margin: 0 0 1.5rem; font-family: var(--nb-font-display); font-size: clamp(3rem, 8vw, 6rem); line-height: 0.88; letter-spacing: -0.075em; }
.post__excerpt { max-width: 55ch; margin: 1.5rem 0 0; font-size: 1.18rem; line-height: 1.55; }
.article-copy { padding-top: 3rem; }

@media (max-width: 700px) {
  .post__header { padding: 0.75rem 0 2.25rem; }
  .post__back { margin-bottom: 2rem; font-size: 0.72rem; }
  .post__kicker { margin-bottom: 0.9rem; font-size: 0.68rem; }
  .post h1 { font-size: clamp(2.35rem, 13vw, 4.5rem); }
  .post__excerpt { margin-top: 1rem; font-size: 1rem; line-height: 1.5; }
  .article-copy { padding-top: 2rem; }
}
</style>
