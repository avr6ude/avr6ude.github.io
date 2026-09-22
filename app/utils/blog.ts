export interface BlogSummary {
  title: string
  date: string | Date
  tags: string[]
}

export function sortPosts<T extends BlogSummary>(posts: T[]): T[] {
  return [...posts].sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
}

export function getTagCounts(posts: BlogSummary[]): Record<string, number> {
  return posts.reduce<Record<string, number>>((counts, post) => {
    for (const tag of post.tags) counts[tag] = (counts[tag] ?? 0) + 1
    return counts
  }, {})
}

export function readTime(content: unknown): string {
  const text = contentText(content).trim()
  const words = text ? text.split(/\s+/).length : 0
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function contentText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) {
    const isElement = typeof node[0] === 'string' && (node.length < 2 || typeof node[1] === 'object')
    return (isElement ? node.slice(2) : node).map(contentText).filter(Boolean).join(' ')
  }
  if (node && typeof node === 'object' && 'value' in node) {
    return contentText((node as { value: unknown }).value)
  }
  return ''
}

export function tagHref(tag: string): string {
  return `/?tag=${encodeURIComponent(tag)}#writing`
}

export function toTagLinks(tags: string[]): Array<{ label: string; href: string }> {
  return tags.map((tag) => ({ label: `#${tag}`, href: tagHref(tag) }))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function toTimestamp(date: string | Date): number {
  return new Date(date).valueOf()
}
