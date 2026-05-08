import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * useCursor
 * Attaches the custom gold cursor animation to the page.
 * Returns refs for the dot and ring elements.
 */
export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0 })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.2, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Expand cursor on hover targets
  useEffect(() => {
    const grow = () => gsap.to(dotRef.current, { width: 40, height: 40, background: 'var(--gold2)', duration: 0.25 })
    const shrink = () => gsap.to(dotRef.current, { width: 10, height: 10, background: 'var(--gold)', duration: 0.25 })

    const targets = document.querySelectorAll('button, a, [data-cursor-grow]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    return () => {
      targets.forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  })

  return { dotRef, ringRef }
}
