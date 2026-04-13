export function BlogAuthor({ author }: { author: string }) {
  return (
    <section className="mt-12 rounded-2xl border border-[#e8e4de] p-6">
      <h2 className="font-[var(--font-serif)] text-2xl text-[#1a1a1a]">About the author</h2>
      <p className="mt-3 text-[#4a4a4a]">
        {author} is a Melbourne-based automation engineering team delivering PLC, SCADA,
        controls integration, and commissioning support for manufacturers across Australia.
      </p>
    </section>
  )
}
