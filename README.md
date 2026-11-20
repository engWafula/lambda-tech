# Lambda Technologies website

Next.js 16 (App Router) + Sanity CMS, built from the **1b "Bold modern"** homepage direction:
Archivo + IBM Plex Mono, warm paper `#F2F0EA`, ink `#111`, one loud accent `#FF4D1A`.

## Run it

```bash
pnpm install
pnpm dev            # http://localhost:3410
```

The site runs straight away on bundled seed content (`src/lib/seed.ts`). Connect Sanity to make it editable.

## Connect Sanity

1. Create a project: `npx sanity@latest init --bare` (or at sanity.io/manage). Note the project id.
2. `cp .env.example .env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In sanity.io/manage → API → CORS origins, add `http://localhost:3410` (allow credentials).
4. Load the starter content: `npx sanity login && pnpm seed`
5. Open the embedded Studio at **http://localhost:3410/studio**.

Optional:
- `SANITY_API_WRITE_TOKEN` (Editor token): contact-form submissions are saved to the Studio **Inbox**.
- `SANITY_REVALIDATE_SECRET`: add a Sanity webhook → `POST https://<site>/api/revalidate`,
  projection `{_type}`, same secret. Published edits then show instantly; otherwise pages refresh every 60 s.

## Content model

| Type | Used on |
| --- | --- |
| Site settings (singleton) | Hero headline/accent/intro/CTA/photo, contact email, footer heading, SEO |
| Service | Home "What we do" rows, `/services`, `/services/[slug]` |
| Case study | Home "Selected work" (featured), `/work`, `/work/[slug]` |
| Who we serve | Startups / Enterprises / Public sector columns |
| Job opening | `/careers`, `/careers/[slug]` |
| Contact submission | Read-only inbox filled by `/contact` |

## Layout

```
sanity.config.ts            Studio config (mounted at /studio)
src/sanity/                 client, env, GROQ queries, schemas, desk structure
src/lib/content.ts          fetchers: Sanity when configured, seed content otherwise
src/app/(site)/             public pages
src/app/studio/             embedded Sanity Studio
src/app/api/revalidate/     webhook for on-publish revalidation
scripts/seed-ndjson.ts      exports seed content for `sanity dataset import`
```
