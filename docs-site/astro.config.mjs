import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'

export default defineConfig({
  site: 'https://docs.avrdu.de',
  // Keep this standalone docs build independent of the parent Nuxt tsconfig.
  vite: { resolve: { tsconfigPaths: false } },
  integrations: [
    starlight({
      title: 'Docs',
      description: 'Guides for open-source libraries.',
      customCss: ['./src/styles/docs.css'],
      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Neobrut Vue',
          items: [
            { label: 'Overview', link: '/neobrut-vue/' },
            { label: 'Getting started', link: '/neobrut-vue/getting-started/' },
            { label: 'Components', link: '/neobrut-vue/components/' },
            { label: 'Button', link: '/neobrut-vue/button/' },
            { label: 'Input', link: '/neobrut-vue/input/' },
            { label: 'Select', link: '/neobrut-vue/select/' },
            { label: 'Switch', link: '/neobrut-vue/switch/' },
            { label: 'Accordion', link: '/neobrut-vue/accordion/' },
            { label: 'Tabs', link: '/neobrut-vue/tabs/' },
            { label: 'Dialog', link: '/neobrut-vue/dialog/' },
            { label: 'Forms', link: '/neobrut-vue/forms/' },
            { label: 'Accessibility', link: '/neobrut-vue/accessibility/' },
          ],
        },
      ],
    }),
    mdx(),
    vue(),
  ],
})
