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

export function readTime(content: string): string {
  const words = content.trim() ? content.trim().split(/\s+/).length : 0
  return `${Math.max(1, Math.ceil(words / 200))} min read`
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
