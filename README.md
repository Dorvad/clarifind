# Clarifind

A personal brand website for **Clarifind** — a studio focused on learning design, UX, and AI-enhanced digital products.

Built as a static site with plain HTML, CSS, and JavaScript. No frameworks, no build step. Works directly on GitHub Pages.

---

## What it is

Clarifind presents:
- A clear positioning and brand story
- Services in learning design, UX, and AI-based tools
- Selected project portfolio
- Experience highlights
- Collaboration models
- Approach and philosophy
- Contact / call to action

---

## File Structure

```
clarifind/
├── index.html          — Main page (all sections)
├── style.css           — All styles, design tokens, responsive rules
├── script.js           — GSAP animations, interactions, canvas
├── assets/
│   ├── icons/
│   │   └── favicon.svg — SVG favicon (Clarifind mark)
│   └── images/
│       └── og-image.svg — Open Graph image placeholder
└── README.md
```

---

## How to deploy on GitHub Pages

1. Push this folder to a GitHub repository (e.g. `clarifind`)
2. Go to **Settings → Pages**
3. Under **Source**, choose `Deploy from a branch`
4. Select the **main** branch and the **/ (root)** folder
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/clarifind/`

> If the repo IS your main GitHub Pages repo (named `yourusername.github.io`), the site will deploy to `https://yourusername.github.io/`

---

## How to edit content

All content is in **`index.html`** in clearly commented sections. No special tools needed — edit directly.

### Key content areas

| What to change | Where to find it |
|---|---|
| Your name / tagline | Hero section (`<section class="hero">`) |
| Services cards | `<section class="services">` — each `<article class="service-card">` |
| Project cards | `<section class="projects">` — each `<article class="project-card">` |
| Experience milestones | `<section class="experience">` — each `<div class="milestone">` |
| How we work modes | `<section class="how-we-work">` — each `<div class="work-mode">` |
| Approach / philosophy | `<section class="approach">` |
| Contact links | `<section class="contact">` |

---

## Where to replace contact links

In `index.html`, search for these placeholders and replace with your real links:

```html
<!-- Email (appears 2x — in contact-links and final CTA) -->
href="mailto:hello@clarifind.com"

<!-- LinkedIn -->
href="https://linkedin.com/in/yourprofile"

<!-- GitHub (optional — remove the <a> block if not needed) -->
href="https://github.com/yourusername"
```

---

## Where to replace OG image

1. Create a PNG image at `1200×630px` with your brand
2. Save it as `assets/images/og-image.png`
3. In `index.html`, update this line:
   ```html
   <meta property="og:image" content="assets/images/og-image.png" />
   ```
4. Also update the `og:url` meta tag with your real domain

---

## Design system

Colors, spacing, and typography are controlled via CSS custom properties at the top of `style.css`:

```css
:root {
  --color-accent:  #2A5EBB;   /* Main brand blue */
  --font-display:  'Syne', sans-serif;
  --font-body:     'DM Sans', sans-serif;
  /* ... */
}
```

Change `--color-accent` to rebrand the entire site instantly.

---

## Dependencies (CDN only)

- [GSAP 3.12](https://gsap.com) — animations and scroll triggers
- [Syne](https://fonts.google.com/specimen/Syne) — display font (Google Fonts)
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — body font (Google Fonts)

No npm, no build tools. The site works offline-first from the file system or any static host.

---

## Notes

- All animations respect `prefers-reduced-motion`
- Site is fully responsive (mobile / tablet / desktop)
- Accessible: semantic HTML, ARIA labels, keyboard navigation, focus states
- SEO-ready: meta description, Open Graph tags, clean heading hierarchy

---

© Clarifind. Built with care.
