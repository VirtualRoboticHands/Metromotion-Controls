import type { BlogFaq } from '@/lib/blog'

export function BlogFAQ({ faqs }: { faqs: BlogFaq[] }) {
  if (!faqs.length) return null

  return (
    <section className="mt-14 rounded-2xl bg-[#f7f6f3] p-8">
      <h2 className="font-[var(--font-serif)] text-3xl text-[#1a1a1a]">Common questions</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-xl border border-[#e8e4de] bg-white p-4">
            <summary className="cursor-pointer font-semibold text-[#1a1a1a]">{faq.question}</summary>
            <p className="mt-3 text-[#4a4a4a]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
