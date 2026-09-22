import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import matter from 'gray-matter'

const root = resolve(process.cwd())
const postsDir = join(root, 'content/posts')
const publicDir = join(root, 'public')
const site = 'https://avrdu.de'

const files = (await readdir(postsDir)).filter((file) => file.endsWith('.md'))
const posts = (await Promise.all(files.map(async (file) => {
  const source = await readFile(join(postsDir, file), 'utf8')
  const { data } = matter(source)
  return {
    slug: file.replace(/\.md$/, ''),
    title: String(data.title),
    date: new Date(data.date),
    excerpt: String(data.excerpt),
  }
}))).sort((a, b) => b.date.valueOf() - a.date.valueOf())

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

const rssItems = posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site}/posts/${post.slug}/</link>
      <guid>${site}/posts/${post.slug}/</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join('')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>avrdu.de</title>
    <link>${site}/</link>
    <description>Personal blog and projects</description>
    <language>en</language>${rssItems}
  </channel>
</rss>
`

const routes = ['/', '/about/', '/projects/', '/ui/', ...posts.map((post) => `/posts/${post.slug}/`)]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${site}${route}</loc></url>`).join('\n')}
</urlset>
`

await mkdir(publicDir, { recursive: true })
await writeFile(join(publicDir, 'rss.xml'), rss)
await writeFile(join(publicDir, 'sitemap.xml'), sitemap)
