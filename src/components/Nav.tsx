'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav className={`site-nav ${scrolled ? 'site-nav-scrolled' : ''}`}>
      <div className="site-nav-inner">
        <Link href="/" className="site-nav-logo" aria-label="Metromotion Controls home">
          <img
            src="/images/cropped-cropped-Company-Logo-Transparent-Black1-e1604547687941.webp"
            alt="Metromotion Controls"
            style={{ height: '44px', width: 'auto' }}
          />
        </Link>

        <div className="site-nav-right">
          <ul className="site-nav-links nav-links-desktop" aria-label="Primary">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

              return (
                <li key={link.href}>
                  <Link href={link.href} className={`site-nav-link ${isActive ? 'active' : ''}`}>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <Link href="/contact" className="btn-cta nav-cta-btn">
            Start a Project
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`site-nav-toggle nav-mobile-toggle ${mobileOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-nav-menu" className={`site-nav-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

          return (
            <Link key={link.href} href={link.href} className={`site-nav-mobile-link ${isActive ? 'active' : ''}`}>
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
