import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
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
      <main className="pt-[72px]">
        <section className="contact-header relative overflow-hidden bg-off px-[52px] py-[80px]">
          <Image
            src="/images/ContactUsBanner-e1623751245652.png"
            alt="Contact Metromotion Controls engineering team for industrial automation projects"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="section-label relative z-10 text-red">Contact</div>
          <h1 className="relative z-10 font-serif text-[clamp(40px,4.4vw,60px)] leading-[1.06] tracking-[-0.02em] text-white">
            Contact Us
          </h1>
          <p className="relative z-10 max-w-[620px] text-white/85 mt-[14px] leading-[1.75]">
            Tell us about your project and an engineer will follow up within one business day.
          </p>
        </section>

        <section className="contact-grid grid grid-cols-[1.2fr_1fr] border-t border-border border-b border-border">
          <div className="contact-form-col px-[52px] py-16 border-r border-border">
            <h2 className="font-serif text-[30px] leading-[1.15] text-[#1a1a1a] mb-[30px]">
              Send an Enquiry
            </h2>
            <ContactForm />
          </div>

          <aside className="px-[52px] py-16 bg-off">
            <h2 className="font-serif text-[30px] leading-[1.15] text-[#1a1a1a] mb-7">
              Get in Touch
            </h2>

            <div className="grid gap-5 mb-7">
              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-muted">
                  Phone
                </div>
                <a href="tel:0398076896" className="text-ink no-underline">
                  (03) 9807 6896
                </a>
              </div>

              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-muted">
                  Email
                </div>
                <a href="mailto:info@metromotioncontrols.com.au" className="text-ink no-underline">
                  info@metromotioncontrols.com.au
                </a>
              </div>

              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-muted">
                  Address
                </div>
                <p className="text-ink">39 Sunhill Rd, Mount Waverley VIC 3149</p>
              </div>
            </div>

            <iframe
              title="Metromotion Controls on Google Maps"
              src="https://www.google.com/maps?q=39%20Sunhill%20Rd%2C%20Mount%20Waverley%20VIC%203149&output=embed"
              width="100%"
              height="320"
              loading="lazy"
              className="border border-border bg-white"
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
