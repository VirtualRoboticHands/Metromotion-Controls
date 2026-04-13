# Metromotion Controls Website

Modern website for Metromotion Controls Pty Ltd — industrial automation and control systems engineering.

**Stack:** Next.js 14 · Tailwind CSS · Supabase · Vercel

---

## Quick Start (for Claude Code / AI agents)

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USERNAME/metromotion-controls.git
cd metromotion-controls
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Run locally
npm run dev
# Open http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── globals.css         # Design system (colors, typography, shared styles)
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact form
│   └── api/
│       └── contact/route.ts  # Form submission API
├── components/
│   ├── Nav.tsx             # Fixed navigation
│   └── Footer.tsx          # Site footer
└── lib/
    └── supabase.ts         # Supabase client
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Git Repository
3. Vercel auto-detects Next.js — no config needed
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (for server-side operations)
   - `RESEND_API_KEY` (contact form notifications and confirmations)
   - `ANTHROPIC_API_KEY` (project scoping brief generation)
   - `CONTENT_GENERATOR_USERNAME` and `CONTENT_GENERATOR_PASSWORD` (optional, to expose `/admin/generate` in production)
5. Deploy — Vercel gives you a preview URL automatically

### Custom Domain (later)
Settings → Domains → Add `metromotioncontrols.com.au` + `www.metromotioncontrols.com.au`

---

## Supabase Setup

Apply the tracked migrations in `supabase/migrations/` rather than creating tables manually.

Current site features rely on:

- `enquiries` for contact form submissions
- `scoping_leads` for project scoping submissions and generated briefs
- `scoping-files` storage bucket for uploaded scoping attachments
- content in `content/` and `src/lib/` for statically generated pages

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| White | `#ffffff` | Base background |
| Off-white | `#f7f6f3` | Alternate sections |
| Ink | `#181714` | Text, dark sections |
| Red | `#c8281e` | Accent, CTAs |
| Border | `#e8e4de` | Grid lines, dividers |
| Serif | DM Serif Display | Headlines |
| Sans | DM Sans | Body, UI |

---

## Current Site Coverage

- Homepage with service overview, proof points, selected projects, and the scoping tool
- Service index plus individual service detail pages
- Industries index plus individual industry pages
- Projects index plus detailed case studies
- Blog index plus MDX article pages with metadata and schema
- Contact page with Supabase persistence and Resend notifications
- Internal content generator at `/admin/generate`, hidden from indexing and protected in production
