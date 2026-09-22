# avrdu.de

Personal blog and project notes, built as a Nuxt static site.

## Local development

```sh
npm install
npm run dev
```

Posts live in [`content/posts`](content/posts) as Markdown with frontmatter.

## Static deployment

The production build is SSG: Nuxt renders every route at build time and emits static files. There is no request-time SSR server to run.

```sh
npm run generate
```

For Cloudflare Pages, use:

- Build command: `npm run generate`
- Build output directory: `.output/public`
- Node version: 22.19+ (or the current supported Nuxt Node version)

The generated output includes the page HTML, RSS feed, sitemap, and copied public assets.
