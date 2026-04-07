'use client'

import { useMemo } from 'react'

export function ShareButtons({ title }: { title: string }) {
  const url = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), [])

  return (
    <div className="mt-8 flex items-center gap-3">
      <span className="text-sm text-[#7a7671]">Share:</span>
      <a className="text-sm text-[#c8281e]" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a className="text-sm text-[#c8281e]" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
        X
      </a>
    </div>
  )
}
