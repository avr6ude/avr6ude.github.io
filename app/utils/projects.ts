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
    name: 'Game of Slop',
    description: "Conway's Game of Life but every cell is AI-generated slop. Eight species fight for internet dominance in a Windows 98 fever dream.",
    tags: ['react', 'typescript', 'gamedev', 'ai'],
    url: 'https://slop.avrdu.de',
    source: 'https://github.com/avr6ude/gameofslop',
    tone: 'primary',
  },
  {
    name: 'casky',
    description: 'Pick a pile of Mac apps from the Homebrew Cask catalog and get one install command. The setup ritual, compressed.',
    tags: ['bun', 'react', 'homebrew'],
    url: 'https://casky.app',
    source: 'https://github.com/avr6ude/casky',
    tone: 'secondary',
  },
  {
    name: 'wishlistful',
    description: 'A wishlist project by avrdu.',
    tags: ['web', 'product'],
    url: 'https://wishlistful.avrdu.de',
    tone: 'ink',
  },
  {
    name: 'stop using SSR',
    description: 'A small static-site manifesto for people who are done paying server rent for pages that do not need it.',
    tags: ['web', 'ssg'],
    url: 'https://stopusingssr.com',
    tone: 'primary',
  },
  {
    name: 'simmer',
    description: 'A cooking project by avrdu.',
    tags: ['web', 'food'],
    url: 'https://simmer.avrdu.de',
    tone: 'secondary',
  },
  {
    name: '@neobrut-vue/core',
    description: 'The neo-brutalist Vue component library powering this site.',
    tags: ['vue', 'ui', 'npm'],
    url: 'https://www.npmjs.com/package/@neobrut-vue/core',
    tone: 'ink',
  },
  {
    name: 'avrdu.de',
    description: 'This place: a Markdown blog rebuilt with Nuxt SSG, a custom neo-brutalist component library, and static files on Cloudflare Pages.',
    tags: ['nuxt', 'vue', 'cloudflare'],
    url: 'https://avrdu.de',
    source: 'https://github.com/avr6ude/avrdu.de',
    tone: 'primary',
  },
]
