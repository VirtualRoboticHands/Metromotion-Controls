import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/contact/ContactForm'
import { buildPageMetadata, siteUrl } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Metromotion Controls for industrial automation, PLC programming, SCADA, and control systems engineering in Melbourne.',
  path: '/contact',
})

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Metromotion Controls',
  url: `${siteUrl}/contact`,
  telephone: '(03) 9807 6896',
  email: 'info@metromotioncontrols.com.au',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '39 Sunhill Rd',
    addressLocality: 'Mount Waverley',
    addressRegion: 'VIC',
    postalCode: '3149',
    addressCountry: 'AU',
  },
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px' }}>
        <section className="contact-header" style={{ padding: '80px 52px', background: 'var(--off)' }}>
          <div className="section-label">Contact</div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(40px, 4.4vw, 60px)',
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: '#1a1a1a',
            }}
          >
            Contact Us
          </h1>
          <p style={{ maxWidth: '620px', color: 'var(--muted)', marginTop: '14px', lineHeight: 1.75 }}>
            Let us know what you&apos;re building and our engineering team will respond with practical next steps.
          </p>
        </section>

        <section
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div className="contact-form-col" style={{ padding: '64px 52px', borderRight: '1px solid var(--border)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '30px',
                lineHeight: 1.15,
                color: '#1a1a1a',
                marginBottom: '30px',
              }}
            >
              Send an Enquiry
            </h2>
            <ContactForm />
          </div>

          <aside style={{ padding: '64px 52px', background: 'var(--off)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '30px',
                lineHeight: 1.15,
                color: '#1a1a1a',
                marginBottom: '28px',
              }}
            >
              Get in Touch
            </h2>

            <div style={{ display: 'grid', gap: '20px', marginBottom: '28px' }}>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  Phone
                </div>
                <a href="tel:0398076896" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                  (03) 9807 6896
                </a>
              </div>

              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  Email
                </div>
                <a href="mailto:info@metromotioncontrols.com.au" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                  info@metromotioncontrols.com.au
                </a>
              </div>

              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  Address
                </div>
                <p style={{ color: 'var(--ink)' }}>39 Sunhill Rd, Mount Waverley VIC 3149</p>
              </div>
            </div>

            <iframe
              title="Metromotion Controls on Google Maps"
              src="https://www.google.com/maps?q=39%20Sunhill%20Rd%2C%20Mount%20Waverley%20VIC%203149&output=embed"
              width="100%"
              height="320"
              loading="lazy"
              style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </aside>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Footer />
    </>
  )
}
