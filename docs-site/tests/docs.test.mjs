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

test('the example tablist contains only tabs', () => {
  const html = readFileSync(new URL('../dist/neobrut-vue/button/index.html', import.meta.url), 'utf8')
  const tabs = html.indexOf('role="tablist" aria-label="Button example"')
  const tabsEnd = html.indexOf('</div>', tabs)
  const copy = html.indexOf('data-copy', tabs)
  assert.ok(tabs >= 0 && tabsEnd > tabs && copy > tabsEnd)
})

test('the docs entry and catalog show live components, not a text-only list', () => {
  const home = readFileSync(new URL('../dist/neobrut-vue/index.html', import.meta.url), 'utf8')
  const catalog = readFileSync(new URL('../dist/neobrut-vue/components/index.html', import.meta.url), 'utf8')
  assert.match(home, /<astro-island/)
  assert.match(home, /data-example/)
  assert.equal((catalog.match(/class="nb-doc-example" data-example/g) ?? []).length, 8)
  assert.equal((catalog.match(/<astro-island/g) ?? []).length, 8)
  assert.match(catalog, /ButtonDemo/)
  assert.match(catalog, /FormDemo/)
})

test('copy stays with the code panel', () => {
  const html = readFileSync(new URL('../dist/neobrut-vue/button/index.html', import.meta.url), 'utf8')
  assert.match(html, /data-panel="code" hidden>\s*<button[^>]*data-copy/)
})
