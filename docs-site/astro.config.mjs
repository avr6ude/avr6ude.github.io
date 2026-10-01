import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://docs.avrdu.de',
  // Keep this standalone docs build independent of the parent Nuxt tsconfig.
  vite: { resolve: { tsconfigPaths: false } },
  integrations: [
    starlight({
      title: 'Docs',
      description: 'Guides for open-source libraries.',
      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Neobrut Vue',
          items: [
            { label: 'Overview', link: '/neobrut-vue/' },
            { label: 'Getting started', link: '/neobrut-vue/getting-started/' },
            { label: 'Components', link: '/neobrut-vue/components/' },
            { label: 'Forms', link: '/neobrut-vue/forms/' },
            { label: 'Accessibility', link: '/neobrut-vue/accessibility/' },
          ],
        },
      ],
    }),
  ],
})
