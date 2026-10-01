export interface Project {
  name: string
  description: string
  tags: string[]
  url: string
  source?: string
  color: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'danger' | 'muted'
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'wishlistful',
    description: 'A simple app to make and share wishlists for birthdays, new homes, or any other occasion.',
    tags: ['wishlist', 'sharing', 'web app'],
    url: 'https://wishlistful.avrdu.de',
    color: 'primary',
    featured: true,
  },
  {
    name: 'Game of Slop',
    description: "A Conway's Game of Life variant where AI-slop species fight for dominance in a Windows 98-style interface.",
    tags: ['game', 'cellular automata', 'ai', 'react'],
    url: 'https://slop.avrdu.de',
    source: 'https://github.com/avr6ude/gameofslop',
    color: 'secondary',
  },
  {
    name: 'casky',
    description: 'An app for batch installing Mac apps via Homebrew.',
    tags: ['macos', 'homebrew', 'app setup', 'react'],
    url: 'https://casky.app',
    source: 'https://github.com/avr6ude/casky',
    color: 'info',
  },
  {
    name: 'stop using SSR',
    description: 'Manifesto on why you should not use SSR.',
    tags: ['static sites', 'ssr', 'web architecture'],
    url: 'https://stopusingssr.com',
    color: 'accent',
  },
  {
    name: 'simmer',
    description: 'WIP iOS kitchen assistant with meal planing, a recipe browser and grocery list generation.',
    tags: ['recipes', 'offline', 'meal planning', 'grocery lists'],
    url: 'https://simmer.avrdu.de',
    color: 'success',
  },
  {
    name: '@neobrut-vue/core',
    description: 'Neobrutalism components for Vue 3.',
    tags: ['vue 3', 'components', 'accessibility', 'npm'],
    url: 'https://neobrut.avrdu.de',
    source: 'https://github.com/avr6ude/neobrut-vue',
    color: 'danger',
  },
  {
    name: 'avrdu.de',
    description: 'My page to show off stuff.',
    tags: ['nuxt', 'markdown', 'static site', 'cloudflare pages'],
    url: 'https://avrdu.de',
    source: 'https://github.com/avr6ude/avrdu.de',
    color: 'muted',
  },
]
