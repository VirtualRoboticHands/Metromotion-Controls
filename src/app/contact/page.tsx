'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '', challenge: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', company: '', phone: '', email: '', challenge: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    border: '1px solid var(--border2)', background: 'var(--white)',
    fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--ink)',
    outline: 'none', transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const,
    color: 'var(--muted)', fontWeight: 500, marginBottom: '6px', display: 'block',
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px' }}>
        {/* Header */}
        <section style={{
          background: 'var(--ink)', padding: '80px 52px',
        }} className="contact-header">
          <div className="section-label" style={{ color: 'var(--red)' }}>Contact</div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(38px, 4.5vw, 60px)',
            color: 'white', lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>
            Start a <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>conversation</em>
          </h1>
          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75,
            fontWeight: 300, maxWidth: '520px', marginTop: '16px',
          }}>
            Tell us about your project and we&apos;ll come back with a straight answer — scope, timeline and a realistic budget.
          </p>
        </section>

        {/* Form + Details */}
        <section style={{
          display: 'grid', gridTemplateColumns: '1fr 380px', gap: 0,
          borderBottom: '1px solid var(--border)',
        }} className="contact-grid">
          {/* Form */}
          <div style={{ padding: '64px 52px', borderRight: '1px solid var(--border)' }} className="contact-form-col">
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: '28px',
              color: 'var(--ink)', marginBottom: '36px',
            }}>
              Project enquiry
            </h2>

            {status === 'sent' ? (
              <div style={{
                background: 'var(--off)', border: '1px solid var(--border)',
                padding: '48px', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--ink)', marginBottom: '12px' }}>
                  Thanks for getting in touch
                </div>
                <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
                  We&apos;ll review your enquiry and come back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Your name *</label>
                    <input
                      required type="text" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle} placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company *</label>
                    <input
                      required type="text" value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      style={inputStyle} placeholder="Company name"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle} placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      required type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={inputStyle} placeholder="Email address"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>What are you trying to solve? *</label>
                  <select
                    required value={form.challenge}
                    onChange={e => setForm({ ...form, challenge: e.target.value })}
                    style={{ ...inputStyle, appearance: 'none' as const, cursor: 'pointer' }}
                  >
                    <option value="">Select a challenge...</option>
                    <option value="oee">OEE & Production Visibility</option>
                    <option value="scada">SCADA / HMI Upgrade or New Build</option>
                    <option value="plc">PLC Programming or Migration</option>
                    <option value="safety">Safety System Design / SIL Assessment</option>
                    <option value="integration">SAP / ERP / MES Integration</option>
                    <option value="commissioning">Commissioning & Startup Support</option>
                    <option value="legacy">Legacy System Migration</option>
                    <option value="greenfield">Greenfield Plant Automation</option>
                    <option value="support">Ongoing Support Contract</option>
                    <option value="data">Data Analytics & Dashboards</option>
                    <option value="electrical">Electrical Engineering & Panel Build</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Tell us more about your project</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' as const }}
                    placeholder="What's the situation? What are you trying to achieve? Any platforms or constraints we should know about?"
                  />
                </div>

                <button type="submit" className="btn-primary"
                  style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.6 : 1 }}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                </button>

                {status === 'error' && (
                  <p style={{ fontSize: '13px', color: 'var(--red)' }}>
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Sidebar details */}
          <div style={{ padding: '64px 36px', background: 'var(--off)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {[
                { label: 'Phone', value: '(03) 9807 6896', href: 'tel:0398076896' },
                { label: 'Email', value: 'info@metromotioncontrols.com.au', href: 'mailto:info@metromotioncontrols.com.au' },
                { label: 'Address', value: '29–31 Sunhill Road\nMount Waverley VIC 3149', href: 'https://maps.google.com/?q=29-31+Sunhill+Road+Mount+Waverley+VIC+3149' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{
                    fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                    color: 'var(--muted2)', fontWeight: 500, marginBottom: '8px',
                  }}>{item.label}</div>
                  <a href={item.href} style={{
                    fontSize: '15px', color: 'var(--ink)', textDecoration: 'none',
                    lineHeight: 1.5, whiteSpace: 'pre-line',
                  }} target={item.href.startsWith('https') ? '_blank' : undefined}>
                    {item.value}
                  </a>
                </div>
              ))}

              <div>
                <div style={{
                  fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                  color: 'var(--muted2)', fontWeight: 500, marginBottom: '8px',
                }}>Hours</div>
                <div style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: 1.5 }}>
                  Monday – Friday<br/>8:00 AM – 5:00 PM AEST
                </div>
              </div>

              <div style={{
                background: 'var(--white)', border: '1px solid var(--border)',
                padding: '24px',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--ink)', marginBottom: '8px' }}>
                  Prefer to talk?
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>
                  Call us directly and speak to an engineer — not a sales team. We&apos;ll give you a straight answer on the spot.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-header { padding: 60px 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-form-col { padding: 48px 24px !important; border-right: none !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
