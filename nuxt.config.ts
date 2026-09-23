export default defineNuxtConfig({
  compatibilityDate: '2026-09-21',
  devtools: { enabled: false },
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  mdc: {
    highlight: {
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      autoSubfolderIndex: true,
    },
  },
})
