'use client'

import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type CountUpStatProps = {
  value: number
  suffix?: string
  label: string
}

export default function CountUpStat({ value, suffix = '', label }: CountUpStatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      setCount(value)
      return
    }

    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.round(latest)),
    })

    return () => controls.stop()
  }, [inView, reducedMotion, value])

  return (
    <motion.div ref={ref}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '52px', color: 'var(--ink)', lineHeight: 1, marginBottom: '5px' }}>
        {count}
        {suffix && <em style={{ color: 'var(--red)', fontStyle: 'normal', fontSize: '38px' }}>{suffix}</em>}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 400 }}>
        {label}
      </div>
    </motion.div>
  )
}
