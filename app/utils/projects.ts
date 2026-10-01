export interface Project {
  name: string
  description: string
  tags: string[]
  url: string
  source?: string
  tone: 'primary' | 'secondary' | 'ink'
}

export const projects: Project[] = [
  {
    name: 'wishlistful',
    description: 'I built wishlistful to make and share wishlists for birthdays, new homes, or any occasion.',
    tags: ['wishlist', 'sharing', 'web app'],
    url: 'https://wishlistful.avrdu.de',
    tone: 'primary',
  },
  {
    name: 'Game of Slop',
    description: "I built a Conway's Game of Life variant where AI-slop species fight for dominance in a Windows 98-style interface.",
    tags: ['game', 'cellular automata', 'ai', 'react'],
    url: 'https://slop.avrdu.de',
    source: 'https://github.com/avr6ude/gameofslop',
    tone: 'secondary',
  },
  {
    name: 'casky',
    description: 'I built casky to browse the Homebrew Cask catalog, select Mac apps, and generate one install command for a fresh machine.',
    tags: ['macos', 'homebrew', 'app setup', 'react'],
    url: 'https://casky.app',
    source: 'https://github.com/avr6ude/casky',
    tone: 'ink',
  },
  {
    name: 'stop using SSR',
    description: 'I built stopusingssr.com as a static-site manifesto arguing that most public apps do not need SSR.',
    tags: ['static sites', 'ssr', 'web architecture'],
    url: 'https://stopusingssr.com',
    tone: 'primary',
  },
  {
    name: 'simmer',
    description: 'I built simmer as a recipe box that works offline, scales ingredients, converts units, and builds grocery lists.',
    tags: ['recipes', 'offline', 'meal planning', 'grocery lists'],
    url: 'https://simmer.avrdu.de',
    tone: 'secondary',
  },
  {
    name: '@neobrut-vue/core',
    description: 'I built @neobrut-vue/core as colorful, accessible neo-brutalist components for Vue 3.',
    tags: ['vue 3', 'components', 'accessibility', 'npm'],
    url: 'https://www.npmjs.com/package/@neobrut-vue/core',
    tone: 'ink',
  },
  {
    name: 'avrdu.de',
    description: 'I built this static Nuxt site to host Markdown posts and the projects below, using @neobrut-vue/core and Cloudflare Pages.',
    tags: ['nuxt', 'markdown', 'static site', 'cloudflare pages'],
    url: 'https://avrdu.de',
    source: 'https://github.com/avr6ude/avrdu.de',
    tone: 'primary',
  },
]
