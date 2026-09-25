<script setup lang="ts">
import { computed } from 'vue'
import { NbBadge, NbCard, NbSeparator } from '@neobrut-vue/core'
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
  title: 'avrdu.de — building things for the web',
  description: 'Personal blog and projects by avrdu.',
  ogTitle: 'avrdu.de — building things for the web',
  ogDescription: 'Personal blog and projects by avrdu.',
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

    <section id="writing" class="writing page-section">
      <div class="writing__heading">
        <div>
          <h2 class="section-title">writing.</h2>
        </div>
        <div v-if="activeTag" class="writing__summary">
          <p>Showing {{ visiblePosts.length }} post<span v-if="visiblePosts.length !== 1">s</span> tagged #{{ activeTag }} · <NuxtLink to="/#writing">show all</NuxtLink></p>
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
.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 24rem);
  gap: clamp(2rem, 7vw, 6rem);
  align-items: end;
  min-height: 0;
}

.hero.page-section { padding: 3rem 0 2.5rem; }
.hero__copy { position: relative; z-index: 1; }
.hero .display-title { max-width: 11ch; font-size: clamp(2.75rem, 7vw, 5.5rem); }
.hero__lede { align-self: center; max-width: 30ch; margin: 0; font-size: 1.05rem; line-height: 1.55; }
.aside-label {
  margin: 0;
  font-family: var(--nb-font-mono);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.topic-link { text-decoration: none; }

.writing__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.writing__summary { max-width: 32ch; margin: 0; line-height: 1.55; }
.writing__summary p { margin: 0; }
.writing__summary a { color: inherit; font-weight: 800; }
.writing__grid { display: grid; grid-template-columns: minmax(0, 1fr) 18rem; gap: 3rem; align-items: start; }
.writing__list { display: grid; gap: 1.5rem; }
.writing__aside { display: grid; gap: 2rem; position: sticky; top: 1.5rem; }

.stats { display: grid; gap: 0.8rem; }
.stats div { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; border-bottom: 2px solid var(--nb-color-ink); padding-bottom: 0.45rem; }
.stats strong { font-family: var(--nb-font-display); font-size: 2rem; line-height: 1; }
.stats span { font-family: var(--nb-font-mono); font-size: 0.72rem; font-weight: 800; text-transform: uppercase; }
.aside-block { padding-top: 0.25rem; }
.recent-list { display: grid; gap: 0.7rem; margin: 0; padding: 0; list-style: none; }
.recent-list li { padding-bottom: 0.7rem; border-bottom: 2px solid var(--nb-color-ink); font-family: var(--nb-font-display); font-size: 1.2rem; line-height: 1; }
.recent-list a { text-decoration: none; }
.recent-list a:hover { text-decoration: underline; text-decoration-thickness: 0.12em; }
.topic-list { display: flex; width: 100%; flex-wrap: wrap; justify-content: flex-start; gap: 0.5rem; }

@media (max-width: 800px) {
  .hero { grid-template-columns: 1fr; gap: 1.25rem; min-height: auto; }
  .hero__lede { max-width: 42ch; }
  .writing__grid { grid-template-columns: 1fr; }
  .writing__aside { position: static; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .aside-block--topics { grid-column: 1 / -1; }
}

@media (max-width: 560px) {
  .hero.page-section { padding: 1.75rem 0 1.5rem; }
  .hero .display-title { font-size: clamp(2.35rem, 13vw, 4rem); }
  .hero__lede { font-size: 0.96rem; line-height: 1.5; }
  .writing__heading { align-items: start; flex-direction: column; gap: 0.8rem; margin-bottom: 1.75rem; }
  .writing__summary { font-size: 0.92rem; }
  .writing__list { gap: 1rem; }
  .writing__aside { gap: 1.5rem; }
  .stats strong { font-size: 1.65rem; }
  .stats span { font-size: 0.65rem; }
  .recent-list li { font-size: 1rem; }
  .writing__aside { grid-template-columns: 1fr; }
}
</style>
