# Metromotion Controls — Claude Code Project Guide

## Project Overview

**Company:** Metromotion Controls Pty Ltd  
**Website:** metromotioncontrols.com.au  
**Industry:** Industrial automation and control systems engineering  
**Location:** 39 Sunhill Road, Mount Waverley VIC 3149, Melbourne, Australia  
**Project root:** `C:\Users\Metromotion\metromotioncontrols_website\metromotion-controls`

---

## Tech Stack

- **Hosting / Deployment:** Vercel
- **Backend / Database:** Supabase
- **Frontend:** Next.js + React
- **Maintained by:** AI (Claude Code) — no manual code editing

---

## Design System

- **Theme:** Light
- **Base colours:** White `#ffffff`, warm off-white `#f7f6f3`, dark ink sections, red accent `#c8281e`
- **Typography:** DM Serif Display (headings) + DM Sans (body)
- **Layout:** Grid-based precision layout
- **Reference file:** `metromotion-homepage-v2.html` (approved homepage design)

---

## Contact / Notifications

- **General:** info@metromotioncontrols.com.au
- **Developer:** tommy.kim@metromotioncontrols.com.au
- Contact form submissions save to Supabase **and** send email notifications to both addresses above

---

## Installed Plugins

### `frontend-design`
Use when building or modifying any UI component, page, or layout. Generates polished, production-grade frontend code that matches the Metromotion design system. Avoid generic AI aesthetics — this site must look sharp and professional.

### `github`
Use for all repository operations: creating issues, managing PRs, reviewing code, and searching the repo. Prefer this over raw `git` commands for anything that touches GitHub directly.

### `playwright`
Use for browser automation, end-to-end testing, and UI validation. Run Playwright tests after any significant frontend change to confirm pages render and forms behave correctly.

### `vercel`
Use for all deployment operations. Manage builds, check logs, inspect domains, and handle environment variables through this plugin rather than the Vercel dashboard. Always confirm a clean Vercel build after merging to main.

### `supabase`
Use for all database work: running SQL queries, creating or modifying tables, writing migrations, generating TypeScript types from the schema, and checking Edge Function logs. Never modify the database schema manually through the dashboard — always use migrations tracked through this plugin.

### `commit-commands`
Use these commands to manage all git workflow. Do not write commit messages manually.

| Command | When to use |
|---|---|
| `/commit` | After completing a unit of work — stages files and generates a commit message matching repo conventions |
| `/commit-push-pr` | When a feature is ready — commits, pushes to a feature branch, and opens a PR with summary and test plan |
| `/clean_gone` | Periodically — removes local branches already deleted from remote |

---

## Git Workflow

1. Work on a feature branch (created automatically by `/commit-push-pr` if needed)
2. Use `/commit` for incremental saves during development
3. Use `/commit-push-pr` when the feature is complete and ready for review/deploy
4. Vercel auto-deploys on merge to `main`
5. Run `/clean_gone` to keep local branches tidy

---

## SEO Requirements

This site must be optimised for both:
- **Traditional SEO** — meta tags, structured data (JSON-LD), semantic HTML, page speed
- **AI SEO** — clear entity definitions, factual structured content, citations and references that AI systems (ChatGPT, Claude, Perplexity) can surface

Every page should have complete meta titles, descriptions, and appropriate schema markup.

---

## Copy and Tone Guidelines

- No em dashes (—) anywhere in copy
- No dramatic two-part sentences ("We don't just X, we Y")
- Tone: precise, confident, professional — industrial engineering audience
- Company name is always **Metromotion Controls** — never just "Metromotion"

---

## Model and Effort Reference

| Task type | Model | Effort |
|---|---|---|
| UI components, copy, routine features | Sonnet | medium |
| Supabase schema, migrations, API wiring | Sonnet | medium |
| SEO, metadata, structured data | Sonnet | medium |
| Debugging deploy or integration issues | Sonnet | high |
| Architecture decisions | Opus | high |
| Hard bugs, race conditions | Opus | max |

Set effort with `/effort <level>` or pass `--effort <level>` at session start.  
Try raising Sonnet's effort before switching to Opus — it's often enough and faster.

---

## Outstanding TODO

- [ ] Confirm `RESEND_API_KEY`, `ANTHROPIC_API_KEY`, and optional admin credentials are set in Vercel before production release
- [ ] Deploy the current Next.js build to replace the legacy public site
