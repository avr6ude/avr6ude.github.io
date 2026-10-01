# Docs

Shared documentation for my libraries. Neobrut Vue now lives at [neobrut.avrdu.de/docs](https://neobrut.avrdu.de/docs/); its old URLs redirect there.

Interactive examples use the published `@neobrut-vue/core` package in client-only Vue islands. Each example's Code tab displays its own `.vue` source file.

## Local development

Use Node 24.14.1 or newer:

```sh
npm ci
npm run dev
npm run build
```

Astro emits static files to `dist/`. There is no request-time SSR server.

## Cloudflare Pages

Create a Pages project connected to `avr6ude/avr6ude.github.io` with:

- Root directory: `docs-site`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=24.14.1`
- Custom domain: `docs.avrdu.de`

Attach the custom domain in Pages before changing DNS; a DNS record alone will not provision the Pages route and certificate. Verify `https://docs.avrdu.de/` and the Neobrut redirect after deployment.
