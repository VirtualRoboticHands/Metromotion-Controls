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
5. Deploy — Vercel gives you a preview URL automatically

### Custom Domain (later)
Settings → Domains → Add `metromotioncontrols.com.au` + `www.metromotioncontrols.com.au`

---

## Supabase Setup

Create a table for contact form submissions:

```sql
CREATE TABLE contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  company text NOT NULL,
  phone text,
  email text NOT NULL,
  challenge text NOT NULL,
  message text,
  submitted_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (the contact form)
CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

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

## Pages to Build Next

- [ ] Individual service pages (×8)
- [ ] Industry landing pages (×6)
- [ ] Blog/resources section
- [ ] SEO schema markup
- [ ] Scoping tool integration
