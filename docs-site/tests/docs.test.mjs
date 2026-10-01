import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

for (const page of ['button', 'input', 'select', 'switch', 'accordion', 'tabs', 'dialog', 'forms']) {
  test(`${page} docs include a live preview and its code`, () => {
    const html = readFileSync(new URL(`../dist/neobrut-vue/${page}/index.html`, import.meta.url), 'utf8')
    assert.match(html, /data-example/)
    assert.match(html, /<astro-island/)
    assert.match(html, /role="tab"[^>]*>Preview/)
    assert.match(html, /role="tab"[^>]*>Code/)
    assert.match(html, /data-panel="code"/)
  })
}
