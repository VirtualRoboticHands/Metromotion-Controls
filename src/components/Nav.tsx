'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="site-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 52px', height: '72px',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <Link href="/" className="nav-logo" style={{
        display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none',
      }}>
        <div style={{
          width: '34px', height: '34px', background: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'none', stroke: 'white', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <strong style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'var(--ink)' }}>
            Metromotion Controls
          </strong>
          <span style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--red)' }}>
            Industrial Automation
          </span>
        </div>
      </Link>

      {/* Desktop nav */}
      <ul style={{
        display: 'flex', gap: '32px', listStyle: 'none',
      }} className="nav-links-desktop">
        {[
          { href: '/services', label: 'Services' },
          { href: '/#industries', label: 'Industries' },
          { href: '/#projects', label: 'Projects' },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
        ].map(link => (
          <li key={link.href}>
            <Link href={link.href} style={{
              fontSize: '13.5px', fontWeight: 400, color: 'var(--muted)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/contact" style={{
        background: 'var(--red)', color: 'white', border: 'none',
        padding: '10px 22px', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
        letterSpacing: '0.02em', cursor: 'pointer', transition: 'background 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#a8201a')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--red)')}
      className="nav-cta-btn"
      >
        Get in Touch
      </Link>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="nav-mobile-toggle"
        style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
          width: '32px', height: '32px', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', gap: '5px',
        }}
        aria-label="Toggle menu"
      >
        <span style={{ width: '20px', height: '1.5px', background: 'var(--ink)', transition: 'all 0.2s' }} />
        <span style={{ width: '20px', height: '1.5px', background: 'var(--ink)', transition: 'all 0.2s' }} />
        <span style={{ width: '20px', height: '1.5px', background: 'var(--ink)', transition: 'all 0.2s' }} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0,
          background: 'white', padding: '24px', zIndex: 99,
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>
          {[
            { href: '/services', label: 'Services' },
            { href: '/#industries', label: 'Industries' },
            { href: '/#projects', label: 'Projects' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '18px', color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-cta" onClick={() => setMobileOpen(false)}
            style={{ textDecoration: 'none', textAlign: 'center', marginTop: '12px' }}
          >
            Get in Touch
          </Link>
        </div>
      )}

    </nav>
  )
}
