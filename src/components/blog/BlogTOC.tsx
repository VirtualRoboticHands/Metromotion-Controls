export function BlogTOC({ headings }: { headings: { id: string; text: string; level: 2 | 3 }[] }) {
  if (!headings.length) return null

  return (
    <aside className="sticky top-24 rounded-2xl border border-[#e8e4de] bg-[#f7f6f3] p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#1a1a1a]">On this page</h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
            <a className="text-[#4a4a4a] hover:text-[#c8281e]" href={`#${heading.id}`}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
