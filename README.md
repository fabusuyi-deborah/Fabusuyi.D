# Deborah Fabusuyi · Portfolio

Personal site for Deborah Fabusuyi, frontend engineer and technical writer.

The site has two views:

- **Normal** (`/`): the editorial site with a live drone-field hero. Opens in light mode.
- **Console** (`/terminal`): an interactive terminal with the same content. Opens in dark mode.

Visitors can switch views from the header (or with `~`) and toggle light/dark (or press `T`).

## Stack

Next.js 15· React 19 · TypeScript · Tailwind CSS v4. Fonts are self-hosted: Big Shoulders Display (in `src/fonts`) and Geist / Geist Mono (from the `geist` package), so builds don't need network access to Google Fonts.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Updating content

Everything the site shows lives in `src/content`. The normal view and the console both read from these files, so one edit updates both.

| What | File |
| --- | --- |
| Name, intro, tagline, email, socials, about text, "Now" list | `src/content/site.ts` |
| Selected works (keep to four) | `src/content/projects.ts` |
| Building / in-incubation projects | `src/content/building.ts` |
| Hand-picked articles (any platform) | `src/content/writing.ts` |
| Timeline, gallery photos, talks | `src/content/about.ts` |

### Images

- **Project screenshots:** add to `public/images/projects/` and set `image: "/images/projects/your-file.png"` on the project. Without `image`, the card shows its placeholder artwork. 16:10 works best.
- **Gallery photos:** add to `public/images/photos/` and set `src` and `alt` on the photo. Without `src`, the tile shows a striped placeholder.
- **Building icons:** optional square image via `icon` on a building project.

### Resume

Put the PDF at `public/deborah-fabusuyi.pdf` (or change `resume` in `site.ts`).

### Adding a console command

Add an entry to `commands` in `src/components/console/commands.tsx`. Give it a `help` string and it shows up in `help` and Tab completion automatically.

## Project structure

```
src/
  app/                 routes, metadata, OG image, sitemap, robots
    page.tsx           normal view
    terminal/page.tsx  console view
  components/
    header/            nav, Building dropdown, mobile menu, mode switch, theme toggle
    sections/          hero + drone field, works, writing, about, gallery, speaking, contact, footer
    console/           terminal UI and command registry
  content/             all site copy and data
  lib/                 theme + small event helpers
  fonts/               self-hosted display font
```

## Deploying

Works on Vercel with zero config. Update `url` in `src/content/site.ts` once the final domain is set; it feeds the metadata, sitemap and social preview.
