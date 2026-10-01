# Projects-First Blog Design

**Date:** 2026-10-01  
**Status:** Proposed for written review

## Goal

Make avrdu.de a projects-first portfolio while keeping the Markdown blog intact and easy to reach at a dedicated `/posts/` route.

## Constraints

- Keep Nuxt static generation; no SSR runtime.
- Keep posts in Markdown under `content/posts`.
- Keep the existing neo-brutalist visual language and use `@neobrut-vue/core` primitives for UI.
- Commit directly to `main`; do not create a pull request.
- Do not add a second UI/component library or speculative project system.

## Information architecture

### `/`

The home page becomes the project index. It contains:

1. A compact projects-first introduction.
2. A project showcase using the existing `NbCard`, `NbBadge`, `NbLink`, and `NbSeparator` primitives.
3. A small link to `/posts/` for writing.

The current projects-page lede (“at least one project that should have been a shell script”) is removed. Project cards are the primary visual and content hierarchy; the homepage no longer renders the blog listing.

### `/posts/`

Move the current homepage writing flow here:

- Markdown post collection and date sorting remain unchanged.
- Existing tag filtering remains query-based and links back to `/posts/?tag=...#writing`.
- The field-notes stats, recent posts, topic badges, and `PostCard` list move with the flow.
- The page title and metadata identify this as the writing archive.

### `/posts/[slug]/`

Keep the existing Markdown detail route and rendering behavior unchanged except for links that previously targeted the homepage writing section.

### `/projects/`

Keep the route as a compatibility entry point for the same project catalog. It may reuse the project data and showcase markup used by the homepage; it must not become a second source of project truth.

## Project catalog

Retain the current projects and add these entries:

- Game of Slop — `https://slop.avrdu.de`
- casky — `https://casky.app`
- avrdu.de — `https://avrdu.de`
- wishlistful — `https://wishlistful.avrdu.de`
- stop using SSR — `https://stopusingssr.com`
- simmer — `https://simmer.avrdu.de`
- `@neobrut-vue/core` — `https://www.npmjs.com/package/@neobrut-vue/core`

The requested “@neobrut/core” entry is normalized to the package that actually exists in this repository’s dependency graph: `@neobrut-vue/core`. Do not claim a different package name or invent a package URL.

Project metadata stays local and static. Each entry has a name, description, tags, tone, primary URL, and optional source URL. No API, CMS, or runtime fetch is introduced.

## Components and data boundaries

- Add one shared static project-data module so `/` and `/projects/` cannot drift.
- Reuse existing local components and library primitives; do not create replacement card, badge, link, or separator primitives.
- Keep post-specific querying and filtering in the existing blog utility/page flow.
- Update `SiteNav` so `projects` points to `/` and `writing` points to `/posts/`.

## Responsive behavior

- Desktop: project cards use the current asymmetric neo-brutalist composition, with tags and links remaining readable at the card edges.
- Tablet: project cards collapse to a single column without horizontal overflow.
- Mobile: cards become full-width, tags wrap naturally, and the primary project URL remains a usable touch target.
- The writing archive keeps its current mobile stacking behavior after moving routes.

## “Fix this line” reference

The screenshot’s awkward projects-page intro line is removed rather than rewrapped or replaced with another joke. The cards themselves carry the project context, reducing noise above the first project.

## SEO and generated output

- Home metadata describes projects and things built.
- `/posts/` metadata describes the writing archive.
- Existing post metadata, RSS generation, and static prerendering remain working.
- The generated output must include `/`, `/posts/`, `/projects/`, and every existing post route.

## Verification

- Unit tests continue to pass.
- Nuxt typecheck passes.
- `nuxt generate` passes with the static preset.
- The Impeccable layout detector reports no unexplained layout findings.
- Desktop and mobile rendered checks confirm projects lead on `/`, posts are absent from `/`, and the archive works at `/posts/`.
- `git diff --check` is clean before the direct commit to `main`.
