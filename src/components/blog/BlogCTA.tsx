import Link from 'next/link'

export function BlogCTA({ topic }: { topic: string }) {
  return (
    <section className="mt-14 rounded-2xl bg-[#1a1a1a] p-8 text-white">
      <h2 className="font-[var(--font-serif)] text-3xl">Need help with {topic}?</h2>
      <p className="mt-3 max-w-xl text-[#d7d2cb]">Talk to our team about engineering, implementation, and commissioning support.</p>
      <Link className="mt-6 inline-flex rounded-lg bg-[#c8281e] px-6 py-3 font-medium text-white hover:bg-[#a8201a]" href="/contact">
        Talk to our team
      </Link>
    </section>
  )
}
