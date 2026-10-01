import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

// Vite's Vue transform reads the parent Nuxt tsconfig even for this standalone build.
const config = new URL('../../.nuxt/tsconfig.json', import.meta.url)
if (!existsSync(config)) {
  mkdirSync(new URL('../../.nuxt/', import.meta.url), { recursive: true })
  writeFileSync(config, '{}\n')
}
