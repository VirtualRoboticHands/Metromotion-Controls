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
    { href: '/services/support', label: 'Automation Support & Maintenance' },
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
    <footer className="site-footer bg-off border-t border-border px-[52px] pt-16 pb-9">
      <div className="footer-top grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-11 border-b border-border">
        {/* Brand */}
        <div className="flex flex-col gap-[13px]">
          <div className="w-[30px] h-[30px] bg-ink flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-none stroke-white stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div className="text-[12px] font-semibold tracking-[0.07em] uppercase text-ink">
            Metromotion <span className="text-red">Controls</span>
          </div>
          <p className="text-[13px] text-muted leading-[1.65] max-w-[270px] font-light">
            Industrial automation and control systems engineering for Australian food, beverage, FMCG, and industrial manufacturing.
          </p>
          <div className="flex flex-col gap-1 mt-1">
            <a href="tel:0398076896" className="text-[13px] text-muted no-underline">(03) 9807 6896</a>
            <a href="mailto:info@metromotioncontrols.com.au" className="text-[13px] text-muted no-underline">info@metromotioncontrols.com.au</a>
            <span className="text-[13px] text-muted">39 Sunhill Rd, Mount Waverley VIC 3149</span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-[10px] tracking-[0.12em] uppercase text-ink font-semibold mb-4">
              {title}
            </h4>
            <ul className="list-none flex flex-col gap-2">
              {links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-muted no-underline font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-6 flex justify-between items-center flex-wrap gap-3">
        <span className="text-[12px] text-muted2">
          © {new Date().getFullYear()} Metromotion Controls Pty Ltd. All rights reserved.
        </span>
        <div className="flex gap-[6px]">
          {['AS 61508'].map(cert => (
            <span key={cert} className="text-[10px] tracking-[0.06em] uppercase px-[9px] py-[3px] border border-border2 text-muted2 bg-white">
              {cert}
            </span>
          ))}
        </div>
      </div>

    </footer>
  )
}
