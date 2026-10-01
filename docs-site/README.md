# avrdu docs

Shared documentation for libraries by avrdude. Each library owns a top-level folder under `src/content/docs/` and a sidebar group in `astro.config.mjs`.

## Local development

Use Node 24.14.1 or newer:

```sh
npm ci
npm run dev
npm run build
```

Astro emits static files to `dist/`. There is no request-time SSR server.

## Cloudflare Pages

Create a Pages project connected to `avr6ude/avrdu.de` with:

- Root directory: `docs-site`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=24.14.1`
- Custom domain: `docs.avrdu.de`

Attach the custom domain in Pages before changing DNS; a DNS record alone will not provision the Pages route and certificate. Verify `https://docs.avrdu.de/` and `https://docs.avrdu.de/neobrut-vue/` after deployment.
