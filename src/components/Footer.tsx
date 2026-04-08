import Link from 'next/link'

const footerLinks = {
  services: [
    { href: '/services/industrial-automation', label: 'Industrial Automation & Control Systems' },
    { href: '/services/plc-scada-hmi', label: 'PLC, SCADA & HMI Programming' },
    { href: '/services/control-panel-engineering', label: 'Control Panel Engineering & Electrical Design' },
    { href: '/services/systems-integration', label: 'Industrial Systems Integration' },
    { href: '/services/industrial-data-iiot', label: 'Industrial Data, IIoT & Analytics' },
    { href: '/services/ot-networks', label: 'OT Networks, Edge & Remote Access' },
    { href: '/services/functional-safety', label: 'Functional Safety & Safety Systems' },
    { href: '/services/automation-upgrades', label: 'Automation Upgrades, Retrofits & Support' },
    { href: '/services/commissioning', label: 'Commissioning, FAT & SAT' },
  ],
  industries: [
    { href: '/industries/food-beverage', label: 'Food & Beverage' },
    { href: '/industries/dairy', label: 'Dairy' },
    { href: '/industries/fmcg', label: 'FMCG' },
    { href: '/industries/pet-food', label: 'Pet Food' },
    { href: '/industries/packaging', label: 'Packaging' },
    { href: '/industries/agricultural-processing', label: 'Agricultural Processing' },
    { href: '/industries/building-products', label: 'Building Products' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/#projects', label: 'Projects' },
    { href: '/blog', label: 'Resources & Blog' },
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: 'var(--off)', borderTop: '1px solid var(--border)', padding: '64px 52px 36px' }}>
      <div className="footer-top" style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px',
        paddingBottom: '44px', borderBottom: '1px solid var(--border)',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
          <div style={{ width: '30px', height: '30px', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: 'none', stroke: 'white', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'var(--ink)' }}>
            Metromotion <span style={{ color: 'var(--red)' }}>Controls</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '270px', fontWeight: 300 }}>
            Industrial automation and control systems engineering for Australian food, beverage, FMCG, and industrial manufacturing.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
            <a href="tel:0398076896" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>(03) 9807 6896</a>
            <a href="mailto:info@metromotioncontrols.com.au" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>info@metromotioncontrols.com.au</a>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>39 Sunhill Rd, Mount Waverley VIC 3149</span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 style={{
              fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
              color: 'var(--ink)', fontWeight: 600, marginBottom: '16px',
            }}>
              {title}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', fontWeight: 300 }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        paddingTop: '24px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px',
      }}>
        <span style={{ fontSize: '12px', color: 'var(--muted2)' }}>
          © {new Date().getFullYear()} Metromotion Controls Pty Ltd. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['AS 61508'].map(cert => (
            <span key={cert} style={{
              fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase' as const,
              padding: '3px 9px', border: '1px solid var(--border2)', color: 'var(--muted2)', background: 'var(--white)',
            }}>
              {cert}
            </span>
          ))}
        </div>
      </div>

    </footer>
  )
}
