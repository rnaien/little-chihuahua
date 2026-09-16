# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A self-contained mini-site inside the `claude-dersleri/my-first-project` learning sandbox: "Köpek Rehberi" (Dog Guide), a Turkish-language static site about dog breeds, their care, and feeding. It is unrelated to the personal-site pages (`index.html`, `projects.html`, `about.html`) one level up — this folder has its own shared stylesheet and does not use the parent `style.css`.

There is no build step, bundler, or dependency — open any `.html` file directly in a browser to view/verify changes.

## Structure

- `kopek-rehberi.html` — home page; hero section with links into `kopek-cinsler.html` (breed list) and `kopek-bakim.html` (general care).
- `kopek-cinsler.html` — grid of breed cards (`.breed-card`), one per breed page, each with an inline SVG icon + tail decoration.
- `kopek-bakim.html` — general care tips that apply to all breeds, cross-linking to specific breed pages for breed-specific notes.
- `kopek-<breed>.html` — one file per breed (husky, chihuahua, golden-retriever, border-collie, alman-coban [German Shepherd]): a header with the breed's SVG icon, origin/climate line, description, `.stat-badge` row (size/energy/coat/trainability), and a `.care-list` of three `.care-item`s (Özel Bakım Yöntemleri / Beslenme / İlgi Alanları).
- `kopek-rehberi.css` — the single shared stylesheet for every page in this folder, driven by CSS custom properties on `:root` (`--bg-color`, `--accent-color`, etc.). Edit it once to restyle every page here.

## Working conventions

- All visible text is Turkish — match that language and tone (light, friendly, dog-themed) when adding or editing content.
- Every page shares the same `<head>` boilerplate: UTF-8 meta, an inline SVG data-URI paw favicon, Google Fonts preconnect + `Fredoka`/`Inter` stylesheet link, and `<link rel="stylesheet" href="kopek-rehberi.css">`. Keep new pages consistent with this pattern rather than inlining styles or fonts.
- Breed icons and tail decorations are defined once per page as inline `<svg><symbol id="icon-...">` blocks near the top of `<body>`, then referenced elsewhere via `<use href="#icon-...">`. When adding a new breed, add its `icon-<breed>` (and `icon-tail-<breed>` where used, e.g. in `kopek-cinsler.html`) symbol and reuse it via `<use>` rather than duplicating raw SVG paths.
- Breed pages are chained into a linear sequence via `.breed-pager` (← Önceki cins / Sonraki cins →) at the bottom of each page. Current order: Husky → Chihuahua → Golden Retriever → Border Collie → Alman Çoban Köpeği (Husky has no "previous", the last breed has no "next" — use an empty `<span></span>` as the placeholder side, as existing pages do). When inserting a new breed, update the prev/next links on its neighbors too.
- New breed pages must also get a `.breed-card` entry in `kopek-cinsler.html`'s `.breed-grid`.
- Several files contain Turkish characters (ı, ş, ğ, ç, ü, ö), and the folder name itself (`köpek`) is non-ASCII. This tool's shell runs PowerShell non-interactively with `-NoProfile`, so reading/writing text via `Get-Content`/`Set-Content`/`cat`/`Out-File` needs an explicit `-Encoding UTF8` to avoid mojibake.
