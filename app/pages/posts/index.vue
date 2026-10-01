<script setup lang="ts">
import { computed } from 'vue'
import { NbBadge, NbCard } from '@neobrut-vue/core'
import { getTagCounts, sortPosts, tagHref } from '~/utils/blog'

const { data: postData } = await useAsyncData('posts', () => queryCollection('posts').all())
const route = useRoute()
const posts = computed(() => sortPosts(postData.value ?? []))
const activeTag = computed(() => typeof route.query.tag === 'string' ? route.query.tag : null)
const visiblePosts = computed(() => activeTag.value ? posts.value.filter((post) => post.tags.includes(activeTag.value!)) : posts.value)
const tagCounts = computed(() => getTagCounts(posts.value))
const recentPosts = computed(() => visiblePosts.value.slice(0, 3))
const tilCount = computed(() => visiblePosts.value.filter((post) => post.til).length)

useSeoMeta({
  title: 'Writing — avrdu.de',
  description: 'My writing and field notes.',
})
</script>

<template>
  <div>
    <section id="writing" class="writing page-section">
      <div class="writing__heading">
        <div>
          <p class="eyebrow">field notes</p>
          <h1 class="section-title">writing.</h1>
        </div>
        <div v-if="activeTag" class="writing__summary">
          <p>Showing {{ visiblePosts.length }} post<span v-if="visiblePosts.length !== 1">s</span> tagged #{{ activeTag }} · <NuxtLink to="/posts/#writing">show all</NuxtLink></p>
        </div>
      </div>

      <div class="writing__grid">
        <div class="writing__list">
          <PostCard v-for="post in visiblePosts" :key="post.path" :post="post" />
        </div>

        <aside class="writing__aside">
          <NbCard tone="primary">
            <template #header><span class="aside-label">field notes</span></template>
            <div class="stats">
              <div><strong>{{ posts.length }}</strong><span>posts</span></div>
              <div><strong>{{ tilCount }}</strong><span>TILs</span></div>
              <div><strong>{{ Object.keys(tagCounts).length }}</strong><span>topics</span></div>
            </div>
          </NbCard>

          <div class="aside-block">
            <ul class="recent-list">
              <li v-for="post in recentPosts" :key="post.path">
                <NuxtLink :to="`${post.path}/`">{{ post.title }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="aside-block aside-block--topics">
            <div class="topic-list">
              <span v-for="([tag, count]) in Object.entries(tagCounts).sort((a, b) => b[1] - a[1])" :key="tag">
                <NuxtLink :to="tagHref(tag)" class="topic-link">
                  <NbBadge tone="paper" size="sm">{{ tag }} ×{{ count }}</NbBadge>
                </NuxtLink>
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.writing__heading { display: flex; align-items: end; justify-content: space-between; gap: var(--site-space-8); margin-bottom: var(--site-space-10); }
.eyebrow { margin: 0 0 var(--site-space-2); font-family: var(--nb-font-mono); font-size: var(--site-font-meta); font-weight: var(--site-weight-bold); text-transform: uppercase; }
.writing__heading .section-title { margin: 0; }
.writing__summary { max-width: 32ch; margin: 0; line-height: var(--site-leading-readable); }
.writing__summary p { margin: 0; }
.writing__summary a { color: inherit; font-weight: var(--site-weight-bold); }
.writing__grid { display: grid; grid-template-columns: minmax(0, 1fr) var(--site-size-sidebar); gap: var(--site-space-12); align-items: start; }
.writing__list { display: grid; gap: var(--site-space-6); }
.writing__aside { display: grid; gap: var(--site-space-8); position: sticky; top: var(--site-space-6); }
.aside-label { margin: 0; font-family: var(--nb-font-mono); font-size: var(--site-font-label); font-weight: var(--site-weight-bold); letter-spacing: var(--site-tracking-label); text-transform: uppercase; }
.stats { display: grid; gap: var(--site-space-3); }
.stats div { display: flex; align-items: baseline; justify-content: space-between; gap: var(--site-space-4); border-bottom: var(--site-border-thin); padding-bottom: var(--site-space-2); }
.stats strong { font-family: var(--nb-font-display); font-size: var(--site-font-stat); line-height: var(--site-leading-single); }
.stats span { font-family: var(--nb-font-mono); font-size: var(--site-font-label); font-weight: var(--site-weight-bold); text-transform: uppercase; }
.aside-block { padding-top: var(--site-space-1); }
.recent-list { display: grid; gap: var(--site-space-2); margin: 0; padding: 0; list-style: none; }
.recent-list li { padding-bottom: var(--site-space-2); border-bottom: var(--site-border-thin); font-family: var(--nb-font-display); font-size: var(--site-font-lede); line-height: var(--site-leading-single); }
.recent-list a { text-decoration: none; }
.recent-list a:hover { text-decoration: underline; text-decoration-thickness: 0.12em; }
.topic-list { display: flex; width: 100%; flex-wrap: wrap; justify-content: flex-start; gap: var(--site-space-2); }
.topic-link { text-decoration: none; }

@media (max-width: 800px) {
  .writing__grid { grid-template-columns: 1fr; }
  .writing__aside { position: static; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .aside-block--topics { grid-column: 1 / -1; }
}
@media (max-width: 560px) {
  .writing__heading { align-items: start; flex-direction: column; gap: var(--site-space-3); margin-bottom: var(--site-space-7); }
  .writing__summary { font-size: var(--site-font-body-sm); }
  .writing__list { gap: var(--site-space-4); }
  .writing__aside { grid-template-columns: 1fr; gap: var(--site-space-6); }
  .stats strong { font-size: var(--site-font-stat-mobile); }
  .stats span { font-size: var(--site-font-compact); }
  .recent-list li { font-size: var(--site-font-body-md); }
}
</style>
