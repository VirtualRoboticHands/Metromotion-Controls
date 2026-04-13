'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'blog' | 'project'

type BlogForm = {
  title: string
  slug: string
  description: string
  category: string
  tags: string
  targetKeyword: string
  readingTime: string
  featured: boolean
  faq1q: string
  faq1a: string
  faq2q: string
  faq2a: string
  faq3q: string
  faq3a: string
  intro: string
}

type ProjectForm = {
  slug: string
  client: string
  category: string
  title: string
  overview: string
  deliverable1: string
  deliverable2: string
  deliverable3: string
  deliverable4: string
  technologies: string
  testimonialQuote: string
  testimonialAuthor: string
  testimonialRole: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function today() {
  return new Date().toISOString().split('T')[0]
}

function inferCategory(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('scada') || t.includes('hmi')) return 'SCADA & HMI'
  if (t.includes('plc') || t.includes('control system')) return 'PLC & Control Systems'
  if (t.includes('panel') || t.includes('electrical')) return 'Control Panel Engineering'
  if (t.includes('oee') || t.includes('iiot') || t.includes('data') || t.includes('analytics')) return 'Industrial Data & IIoT'
  if (t.includes('safety') || t.includes('sil') || t.includes('functional')) return 'Functional Safety'
  if (t.includes('network') || t.includes('ot') || t.includes('remote')) return 'OT Networks'
  if (t.includes('commission') || t.includes('fat') || t.includes('sat')) return 'Commissioning'
  return 'Industrial Automation'
}

// ─── Blog generator ───────────────────────────────────────────────────────────

function generateBlogMdx(f: BlogForm): string {
  const date = today()
  const slug = f.slug || slugify(f.title)
  const tags = f.tags.split(',').map(t => `"${t.trim()}"`).join(', ')
  const faqs = [
    f.faq1q && f.faq1a ? `  - question: "${f.faq1q.replace(/"/g, "'")}"
    answer: "${f.faq1a.replace(/"/g, "'")}"` : null,
    f.faq2q && f.faq2a ? `  - question: "${f.faq2q.replace(/"/g, "'")}"
    answer: "${f.faq2a.replace(/"/g, "'")}"` : null,
    f.faq3q && f.faq3a ? `  - question: "${f.faq3q.replace(/"/g, "'")}"
    answer: "${f.faq3a.replace(/"/g, "'")}"` : null,
  ].filter(Boolean).join('\n')

  const pillarMap: Record<string, string> = {
    'Industrial Automation': 'industrial-automation',
    'PLC & Control Systems': 'plc-control-systems',
    'SCADA & HMI': 'scada-hmi',
    'Control Panel Engineering': 'control-panel-engineering',
    'Industrial Data & IIoT': 'industrial-data-iiot',
    'OT Networks': 'ot-networks',
    'Functional Safety': 'functional-safety',
    'Commissioning': 'commissioning',
  }

  return `---
title: "${f.title}"
slug: "${slug}"
description: "${f.description}"
publishedAt: "${date}"
updatedAt: "${date}"
author: "Metromotion Controls"
category: "${f.category}"
tags: [${tags}]
targetKeyword: "${f.targetKeyword}"
searchIntent: "commercial/informational"
pillar: "${pillarMap[f.category] || 'industrial-automation'}"
postType: "definitive-guide"
readingTime: ${f.readingTime || 5}
featured: ${f.featured}
${faqs ? `faqs:\n${faqs}` : ''}
---

${f.intro || `Opening paragraph introducing the topic of ${f.targetKeyword}. State the practical value for the reader.`}

## Section heading

Content paragraph. Write 150–250 words of practical, engineering-focused copy. Use tables for comparisons. Avoid generic claims.

## Section heading

Content paragraph.

| Column | Column | Column |
| --- | --- | --- |
| Value | Value | Value |

## Section heading

Content paragraph.

## Practical steps

1. Step one
2. Step two
3. Step three
`
}

// ─── Project generator ────────────────────────────────────────────────────────

function generateProjectTs(f: ProjectForm): string {
  const deliverables = [f.deliverable1, f.deliverable2, f.deliverable3, f.deliverable4]
    .filter(Boolean)
    .map(d => `    '${d.trim().replace(/'/g, "\\'")}',`)
    .join('\n')

  const techs = f.technologies.split(',').map(t => `'${t.trim().replace(/'/g, "\\'")}'`).join(', ')

  const testimonial = f.testimonialQuote
    ? `  testimonial: {
    quote: '${f.testimonialQuote.replace(/'/g, "\\'")}',
    author: '${f.testimonialAuthor.replace(/'/g, "\\'")}',
    role: '${f.testimonialRole.replace(/'/g, "\\'")}',
  },`
    : ''

  return `  {
    slug: '${f.slug || slugify(f.client + '-' + f.title)}',
    client: '${f.client.replace(/'/g, "\\'")}',
    category: '${f.category}',
    title: '${f.title.replace(/'/g, "\\'")}',
    overview: '${f.overview.replace(/'/g, "\\'")}',
    deliverables: [
${deliverables}
    ],
    technologies: [${techs}],${testimonial ? '\n' + testimonial : ''}
  },`
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      style={{
        background: copied ? '#2a7a3b' : '#c8281e',
        color: 'white', border: 'none', padding: '8px 18px',
        fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em',
        cursor: 'pointer', textTransform: 'uppercase' as const,
      }}
    >
      {copied ? 'Copied!' : 'Copy to clipboard'}
    </button>
  )
}

// ─── Blog tab ─────────────────────────────────────────────────────────────────

function BlogTab() {
  const [form, setForm] = useState<BlogForm>({
    title: '', slug: '', description: '', category: 'Industrial Automation',
    tags: '', targetKeyword: '', readingTime: '5', featured: false,
    faq1q: '', faq1a: '', faq2q: '', faq2a: '', faq3q: '', faq3a: '', intro: '',
  })
  const [output, setOutput] = useState('')

  const set = (k: keyof BlogForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))

  const handleTitleBlur = () => {
    if (!form.slug) setForm(prev => ({ ...prev, slug: slugify(prev.title) }))
    if (!form.category || form.category === 'Industrial Automation') {
      const inferred = inferCategory(form.title)
      setForm(prev => ({ ...prev, category: inferred }))
    }
  }

  const generate = () => setOutput(generateBlogMdx(form))

  const fieldStyle = {
    width: '100%', padding: '9px 12px', border: '1px solid #e8e4de',
    fontSize: '13px', fontFamily: 'DM Sans, sans-serif', background: 'white',
    color: '#181714', outline: 'none',
  }
  const labelStyle = { fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#7a7671', display: 'block', marginBottom: '5px' }

  const categories = ['Industrial Automation', 'PLC & Control Systems', 'SCADA & HMI', 'Control Panel Engineering', 'Industrial Data & IIoT', 'OT Networks', 'Functional Safety', 'Commissioning']

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Title *</label>
          <input style={fieldStyle} value={form.title} onChange={set('title')} onBlur={handleTitleBlur} placeholder="e.g. Food and Beverage Automation in Australia" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Slug (auto-generated)</label>
            <input style={fieldStyle} value={form.slug} onChange={set('slug')} placeholder="food-beverage-automation-australia" />
          </div>
          <div>
            <label style={labelStyle}>Target keyword *</label>
            <input style={fieldStyle} value={form.targetKeyword} onChange={set('targetKeyword')} placeholder="food beverage automation Australia" />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Meta description (150–160 chars) *</label>
          <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '72px' }} value={form.description} onChange={set('description')} placeholder="How Australian food and beverage manufacturers..." />
          <div style={{ fontSize: '11px', color: form.description.length > 160 ? '#c8281e' : '#b0aca6', marginTop: '4px' }}>{form.description.length} / 160</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px', gap: '12px', alignItems: 'end' }}>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={fieldStyle} value={form.category} onChange={set('category')}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Reading time (min)</label>
            <input style={fieldStyle} type="number" min="1" max="20" value={form.readingTime} onChange={set('readingTime')} />
          </div>
          <div style={{ paddingBottom: '1px' }}>
            <label style={{ ...labelStyle, marginBottom: '8px' }}>Featured</label>
            <input type="checkbox" checked={form.featured} onChange={set('featured')} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Tags (comma-separated)</label>
          <input style={fieldStyle} value={form.tags} onChange={set('tags')} placeholder="food and beverage, automation, Australia, PLC, SCADA" />
        </div>
        <div>
          <label style={labelStyle}>Opening paragraph (optional — leave blank to use placeholder)</label>
          <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '88px' }} value={form.intro} onChange={set('intro')} placeholder="Opening sentence that draws the reader in and sets up the guide..." />
        </div>
        <div style={{ borderTop: '1px solid #e8e4de', paddingTop: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7a7671', marginBottom: '12px' }}>FAQs (frontmatter — these render in the post and as JSON-LD)</div>
          {([1, 2, 3] as const).map(n => (
            <div key={n} style={{ display: 'grid', gap: '8px', marginBottom: '14px' }}>
              <input style={fieldStyle} value={(form as any)[`faq${n}q`]} onChange={set(`faq${n}q` as keyof BlogForm)} placeholder={`FAQ ${n} question`} />
              <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '56px' }} value={(form as any)[`faq${n}a`]} onChange={set(`faq${n}a` as keyof BlogForm)} placeholder={`FAQ ${n} answer`} />
            </div>
          ))}
        </div>
        <button onClick={generate} style={{
          background: '#c8281e', color: 'white', border: 'none', padding: '13px 24px',
          fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', cursor: 'pointer',
          textTransform: 'uppercase' as const,
        }}>
          Generate MDX
        </button>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a7671' }}>
            Output — save as <code style={{ background: '#f0ede8', padding: '2px 6px', fontSize: '11px' }}>content/blog/{form.slug || 'your-slug'}.mdx</code>
          </div>
          {output && <CopyButton text={output} />}
        </div>
        {output ? (
          <pre style={{
            background: '#181714', color: '#e8e4de', padding: '20px', fontSize: '11.5px',
            lineHeight: 1.65, overflow: 'auto', maxHeight: '680px', whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>{output}</pre>
        ) : (
          <div style={{
            background: '#f7f6f3', border: '1px dashed #d4cfc8', padding: '40px',
            textAlign: 'center', color: '#b0aca6', fontSize: '13px',
          }}>
            Fill in the form and click Generate MDX to see the output here.
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Project tab ──────────────────────────────────────────────────────────────

function ProjectTab() {
  const [form, setForm] = useState<ProjectForm>({
    slug: '', client: '', category: 'Large Capital Projects', title: '', overview: '',
    deliverable1: '', deliverable2: '', deliverable3: '', deliverable4: '',
    technologies: '', testimonialQuote: '', testimonialAuthor: '', testimonialRole: '',
  })
  const [output, setOutput] = useState('')

  const set = (k: keyof ProjectForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleClientTitleBlur = () => {
    if (!form.slug && form.client && form.title) {
      setForm(prev => ({ ...prev, slug: slugify(prev.client + '-' + prev.title) }))
    }
  }

  const generate = () => setOutput(generateProjectTs(form))

  const fieldStyle = {
    width: '100%', padding: '9px 12px', border: '1px solid #e8e4de',
    fontSize: '13px', fontFamily: 'DM Sans, sans-serif', background: 'white',
    color: '#181714', outline: 'none',
  }
  const labelStyle = { fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#7a7671', display: 'block', marginBottom: '5px' }
  const categories = ['Large Capital Projects', 'Factory Automation Upgrades', 'OEM Automation Projects', 'Engineering Services']

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Client name *</label>
            <input style={fieldStyle} value={form.client} onChange={set('client')} onBlur={handleClientTitleBlur} placeholder="e.g. Chobani" />
          </div>
          <div>
            <label style={labelStyle}>Project title *</label>
            <input style={fieldStyle} value={form.title} onChange={set('title')} onBlur={handleClientTitleBlur} placeholder="e.g. Greenfields Yoghurt Plant" />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Slug (auto-generated)</label>
            <input style={fieldStyle} value={form.slug} onChange={set('slug')} placeholder="chobani-yoghurt-plant" />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={fieldStyle} value={form.category} onChange={set('category')}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Project overview *</label>
          <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '100px' }} value={form.overview} onChange={set('overview')} placeholder="2–4 sentences describing the client, the challenge, and what Metromotion Controls delivered." />
        </div>
        <div>
          <label style={labelStyle}>Deliverables (one per field)</label>
          {(['deliverable1', 'deliverable2', 'deliverable3', 'deliverable4'] as const).map((k, i) => (
            <input key={k} style={{ ...fieldStyle, marginBottom: '6px' }} value={form[k]} onChange={set(k)} placeholder={`Deliverable ${i + 1}`} />
          ))}
        </div>
        <div>
          <label style={labelStyle}>Technologies (comma-separated)</label>
          <input style={fieldStyle} value={form.technologies} onChange={set('technologies')} placeholder="Rockwell ControlLogix, Ignition SCADA, EtherNet/IP" />
        </div>
        <div style={{ borderTop: '1px solid #e8e4de', paddingTop: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7a7671', marginBottom: '12px' }}>Testimonial (optional)</div>
          <textarea style={{ ...fieldStyle, resize: 'vertical', minHeight: '72px', marginBottom: '8px' }} value={form.testimonialQuote} onChange={set('testimonialQuote')} placeholder="Quote from the client contact" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input style={fieldStyle} value={form.testimonialAuthor} onChange={set('testimonialAuthor')} placeholder="Name" />
            <input style={fieldStyle} value={form.testimonialRole} onChange={set('testimonialRole')} placeholder="Role, Company" />
          </div>
        </div>
        <button onClick={generate} style={{
          background: '#c8281e', color: 'white', border: 'none', padding: '13px 24px',
          fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', cursor: 'pointer',
          textTransform: 'uppercase' as const,
        }}>
          Generate TypeScript
        </button>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a7671' }}>
            Output — paste into <code style={{ background: '#f0ede8', padding: '2px 6px', fontSize: '11px' }}>src/lib/projects.ts</code>
          </div>
          {output && <CopyButton text={output} />}
        </div>
        {output ? (
          <pre style={{
            background: '#181714', color: '#e8e4de', padding: '20px', fontSize: '11.5px',
            lineHeight: 1.65, overflow: 'auto', maxHeight: '680px', whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>{output}</pre>
        ) : (
          <div style={{
            background: '#f7f6f3', border: '1px dashed #d4cfc8', padding: '40px',
            textAlign: 'center', color: '#b0aca6', fontSize: '13px',
          }}>
            Fill in the form and click Generate TypeScript to see the output here.
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GeneratePage() {
  const [tab, setTab] = useState<Tab>('blog')

  const tabStyle = (active: boolean) => ({
    padding: '11px 28px', border: 'none', cursor: 'pointer',
    fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    background: active ? '#c8281e' : 'transparent',
    color: active ? 'white' : '#7a7671',
    borderBottom: active ? '2px solid #c8281e' : '2px solid transparent',
    transition: 'all 0.15s',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f7f6f3', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#181714', padding: '20px 52px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '8px', height: '8px', background: '#c8281e', borderRadius: '50%' }} />
          <span style={{ color: 'white', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Metromotion Controls</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Content Generator</span>
        </div>
      </div>

      <div style={{ padding: '40px 52px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', color: '#181714', lineHeight: 1.1, marginBottom: '10px' }}>
            Content Generator
          </h1>
          <p style={{ fontSize: '14px', color: '#7a7671', lineHeight: 1.7, maxWidth: '600px' }}>
            Generate ready-to-use MDX frontmatter for blog posts and TypeScript entries for project case studies. Fill in the form, click Generate, then copy the output into the codebase.
          </p>
        </div>

        {/* Instructions */}
        <div style={{
          background: 'white', border: '1px solid #e8e4de', padding: '20px 24px',
          marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8281e', marginBottom: '8px' }}>Blog post workflow</div>
            <ol style={{ fontSize: '13px', color: '#3a3733', lineHeight: 1.8, paddingLeft: '18px', margin: 0 }}>
              <li>Fill in the form and generate MDX</li>
              <li>Copy and save as <code style={{ background: '#f0ede8', padding: '1px 5px', fontSize: '11px' }}>content/blog/your-slug.mdx</code></li>
              <li>Add the article body between the frontmatter sections</li>
              <li>Commit with <code style={{ background: '#f0ede8', padding: '1px 5px', fontSize: '11px' }}>/commit</code> and push</li>
            </ol>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8281e', marginBottom: '8px' }}>Project case study workflow</div>
            <ol style={{ fontSize: '13px', color: '#3a3733', lineHeight: 1.8, paddingLeft: '18px', margin: 0 }}>
              <li>Fill in the form and generate TypeScript</li>
              <li>Paste the object into the <code style={{ background: '#f0ede8', padding: '1px 5px', fontSize: '11px' }}>projects</code> array in <code style={{ background: '#f0ede8', padding: '1px 5px', fontSize: '11px' }}>src/lib/projects.ts</code></li>
              <li>Add metadata to <code style={{ background: '#f0ede8', padding: '1px 5px', fontSize: '11px' }}>src/lib/metadata.ts</code> under <code style={{ background: '#f0ede8', padding: '1px 5px', fontSize: '11px' }}>projectMetadataBySlug</code></li>
              <li>Commit and push</li>
            </ol>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #e8e4de', marginBottom: '32px' }}>
          <button style={tabStyle(tab === 'blog')} onClick={() => setTab('blog')}>Blog Post</button>
          <button style={tabStyle(tab === 'project')} onClick={() => setTab('project')}>Project Case Study</button>
        </div>

        {/* Tab content */}
        {tab === 'blog' ? <BlogTab /> : <ProjectTab />}
      </div>
    </div>
  )
}
