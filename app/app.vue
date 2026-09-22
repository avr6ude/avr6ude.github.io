<script setup lang="ts">
import '@neobrut-vue/core/style.css'

const route = useRoute()

function canonicalUrl(path: string): string {
  const normalized = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
  return `https://avrdu.de${normalized}`
}

useHead(() => ({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate', type: 'application/rss+xml', title: 'avrdu.de', href: '/rss.xml' },
    { rel: 'canonical', href: canonicalUrl(route.path) },
  ],
  meta: [
    { property: 'og:url', content: canonicalUrl(route.path) },
    { property: 'og:image', content: 'https://avrdu.de/og.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
