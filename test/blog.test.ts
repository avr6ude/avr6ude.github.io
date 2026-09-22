import { describe, expect, it } from 'vitest'
import { getTagCounts, readTime, sortPosts, tagHref, toTagLinks } from '../app/utils/blog'

const posts = [
  { title: 'Older', date: '2026-03-15', tags: ['meta', 'vue'] },
  { title: 'Newest', date: '2026-05-13', tags: ['vue', 'nuxt'] },
  { title: 'Middle', date: '2026-04-01', tags: ['vue'] },
]

describe('blog helpers', () => {
  it('sorts posts newest first without mutating the collection', () => {
    expect(sortPosts(posts).map((post) => post.title)).toEqual(['Newest', 'Middle', 'Older'])
    expect(posts.map((post) => post.title)).toEqual(['Older', 'Newest', 'Middle'])
  })

  it('counts tags across the collection', () => {
    expect(getTagCounts(posts)).toEqual({ meta: 1, vue: 3, nuxt: 1 })
  })

  it('calculates a minimum one-minute reading time at 200 words per minute', () => {
    expect(readTime('one two three')).toBe('1 min read')
    expect(readTime(Array.from({ length: 401 }, () => 'word').join(' '))).toBe('3 min read')
    expect(readTime({ type: 'minimark', value: [['p', {}, 'one', 'two', 'three']] })).toBe('1 min read')
  })

  it('builds a writing filter link for a tag', () => {
    expect(tagHref('cloudflare')).toBe('/?tag=cloudflare#writing')
  })

  it('maps post tags to clickable filter links', () => {
    expect(toTagLinks(['security', 'cloudflare'])).toEqual([
      { label: '#security', href: '/?tag=security#writing' },
      { label: '#cloudflare', href: '/?tag=cloudflare#writing' },
    ])
  })
})
