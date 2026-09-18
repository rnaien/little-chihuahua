# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Köpek Rehberi" (Dog Guide) — a Turkish-language static site about dog breeds, their care, and feeding. It lives physically inside the `claude-dersleri/my-first-project` learning sandbox folder, but it is its **own separate git repository** (remote: `github.com/rnaien/little-chihuahua`), deployed independently to Vercel. It is unrelated to the personal-site pages (`index.html`, `projects.html`, `about.html`) one level up — this folder has its own shared stylesheet and does not use the parent `style.css`.

There is no build step, bundler, or dependency — open any `.html` file directly in a browser to view/verify changes.

## Commands

- No build, lint, or test tooling — verify changes by opening the relevant `.html` file in a browser.
- **Deploy**: push to `main` (`git push origin main`). Vercel is connected to the GitHub repo and automatically rebuilds and republishes on every push — there is no separate manual deploy step.

## Structure

- `kopek-rehberi.html` — home page; hero section with links into `kopek-cinsler.html` (breed list) and `kopek-bakim.html` (general care). Its footer also fetches `/api/status` to display whether the `SITE_BUILD_TAG` env var is set, as a live demo that env vars aren't committed to git.
- `kopek-cinsler.html` — grid of breed cards (`.breed-card`), one per breed page, each with an inline SVG icon + tail decoration.
- `kopek-bakim.html` — general care tips that apply to all breeds, cross-linking to specific breed pages for breed-specific notes.
- `kopek-<breed>.html` — one file per breed (husky, chihuahua, golden-retriever, border-collie, alman-coban [German Shepherd]): a header with the breed's SVG icon, origin/climate line, description, `.stat-badge` row (size/energy/coat/trainability), and a `.care-list` of three `.care-item`s (Özel Bakım Yöntemleri / Beslenme / İlgi Alanları).
- `kopek-rehberi.css` — the single shared stylesheet for every page in this folder, driven by CSS custom properties on `:root` (`--bg-color`, `--accent-color`, etc.). Edit it once to restyle every page here.
- `api/status.js` — a Vercel serverless function returning whether `process.env.SITE_BUILD_TAG` is set; backs the footer demo on the home page.
- `vercel.json` — rewrites `/` to `kopek-rehberi.html`, and redirects legacy `/köpek/*` paths (both raw and percent-encoded) to the root, since the site used to be served from under a `/köpek/` prefix.
- `.gitignore` — excludes `.env`/`.env.*` (keeps `.env.example`), since `SITE_BUILD_TAG` and any other env vars belong only in Vercel's server-side settings, never in git.

## Working conventions

- All visible text is Turkish — match that language and tone (light, friendly, dog-themed) when adding or editing content.
- Every page shares the same `<head>` boilerplate: UTF-8 meta, an inline SVG data-URI paw favicon, Google Fonts preconnect + `Baloo 2`/`Inter` stylesheet link, and `<link rel="stylesheet" href="kopek-rehberi.css">`. Keep new pages consistent with this pattern rather than inlining styles or fonts. Headings use `Baloo 2` rather than `Fredoka` because Fredoka's font file is missing the Turkish `ş`/`ğ` glyphs (confirmed via cmap inspection) — don't switch heading fonts without checking glyph coverage for `ı ş ğ ç ö ü` first.
- Every page's header (`.dog-header`) has a `.dog-brand` link back to `kopek-rehberi.html` plus a `.dog-nav` with three links (Ana Sayfa / Cinsler / Bakım) — keep this identical across pages when adding new ones.
- Breed icons and tail decorations are defined once per page as inline `<svg><symbol id="icon-...">` blocks near the top of `<body>`, then referenced elsewhere via `<use href="#icon-...">`. When adding a new breed, add its `icon-<breed>` (and `icon-tail-<breed>` where used, e.g. in `kopek-cinsler.html`) symbol and reuse it via `<use>` rather than duplicating raw SVG paths.
- Breed pages are chained into a linear sequence via `.breed-pager` (← Önceki cins / Sonraki cins →) at the bottom of each page. Current order: Husky → Chihuahua → Golden Retriever → Border Collie → Alman Çoban Köpeği (Husky has no "previous", the last breed has no "next" — use an empty `<span></span>` as the placeholder side, as existing pages do). When inserting a new breed, update the prev/next links on its neighbors too.
- New breed pages must also get a `.breed-card` entry in `kopek-cinsler.html`'s `.breed-grid`.
- Several files contain Turkish characters (ı, ş, ğ, ç, ü, ö), and the folder name itself (`köpek`) is non-ASCII. This tool's shell runs PowerShell non-interactively with `-NoProfile`, so reading/writing text via `Get-Content`/`Set-Content`/`cat`/`Out-File` needs an explicit `-Encoding UTF8` to avoid mojibake — confirmed: without it, lines containing Turkish characters can even fail to match in filters/searches. **Prefer the Bash tool (or the Read/Write/Edit tools) for reading and editing these files**, since they handle UTF-8 correctly with no extra flags; only fall back to PowerShell `Get-Content`/`Set-Content` with explicit `-Encoding UTF8` (and `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8` for display) when PowerShell is required.
