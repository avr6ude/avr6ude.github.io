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
    description: 'I built wishlistful as a wishlist project.',
    tags: ['web', 'product'],
    url: 'https://wishlistful.avrdu.de',
    tone: 'primary',
  },
  {
    name: 'Game of Slop',
    description: "I built Conway's Game of Life, then made every cell AI-generated slop. Eight species fight for internet dominance in a Windows 98 fever dream.",
    tags: ['react', 'typescript', 'gamedev', 'ai'],
    url: 'https://slop.avrdu.de',
    source: 'https://github.com/avr6ude/gameofslop',
    tone: 'secondary',
  },
  {
    name: 'casky',
    description: 'I built casky to let me pick Mac apps from the Homebrew Cask catalog and get one install command. The setup ritual, compressed.',
    tags: ['bun', 'react', 'homebrew'],
    url: 'https://casky.app',
    source: 'https://github.com/avr6ude/casky',
    tone: 'ink',
  },
  {
    name: 'stop using SSR',
    description: 'I built stopusingssr.com as a small static-site manifesto for pages that do not need a server.',
    tags: ['web', 'ssg'],
    url: 'https://stopusingssr.com',
    tone: 'primary',
  },
  {
    name: 'simmer',
    description: 'I built simmer as a cooking project.',
    tags: ['web', 'food'],
    url: 'https://simmer.avrdu.de',
    tone: 'secondary',
  },
  {
    name: '@neobrut-vue/core',
    description: 'I built @neobrut-vue/core, the neo-brutalist Vue component library powering this site.',
    tags: ['vue', 'ui', 'npm'],
    url: 'https://www.npmjs.com/package/@neobrut-vue/core',
    tone: 'ink',
  },
  {
    name: 'avrdu.de',
    description: 'I built this place as a Markdown blog with Nuxt SSG, a custom neo-brutalist component library, and static files on Cloudflare Pages.',
    tags: ['nuxt', 'vue', 'cloudflare'],
    url: 'https://avrdu.de',
    source: 'https://github.com/avr6ude/avrdu.de',
    tone: 'primary',
  },
]
