import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from '../styles/Process.module.css'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    step:  '01 · Vision — Imagine',
    roman: 'I',
    title: ['Born from a', 'Creative Vision'],
    titleEm: 1,
    body:  "Every Louis Vuitton piece begins as a conversation between heritage and the present moment. The Creative Studio in Paris distils the spirit of the Maison into forms that feel inevitable — as if they could not be otherwise.",
    cta:   'Explore the creative process',
  },
  {
    step:  '02 · Création — Create',
    roman: 'II',
    title: ['Crafted by', 'One Pair of Hands'],
    titleEm: 1,
    body:  'A single artisan completes each piece from first cut to final stitch. No assembly line — one craftsperson, one creation, one unbroken thread of responsibility and pride running through every seam.',
    cta:   'Meet our artisans',
  },
  {
    step:  '03 · Livraison — Deliver',
    roman: 'III',
    title: ['Presented with', 'Excellence'],
    titleEm: 1,
    body:  "From the Asnières Ateliers to your hands — every Louis Vuitton piece travels in ceremony. Signature packaging, handwritten notes, and the final quality inspection that has remained unchanged since 1854.",
    cta:   'Learn about delivery',
  },
]

export default function Process() {
  const wrapRef = useRef(null)
  const c1Ref   = useRef(null)
  const c2Ref   = useRef(null)
  const c3Ref   = useRef(null)
  const [activeCard, setActiveCard] = useState(0)

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900

  useEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=220%',
          onUpdate(self) {
            const p = self.progress
            setActiveCard(p < 0.4 ? 0 : p < 0.75 ? 1 : 2)
          },
        },
      })

      tl
        .to(c1Ref.current, { scale: 0.91, opacity: 0.12, filter: 'blur(2px)', z: -80, ease: 'power2.in' }, 0)
        .to(c2Ref.current, { scale: 1,    y: 0,   z: 0,  ease: 'expo.out' }, 0)
        .to(c2Ref.current, { scale: 0.91, opacity: 0.12, filter: 'blur(2px)', z: -80, ease: 'power2.in' })
        .to(c3Ref.current, { scale: 1,    y: 0,   z: 0,  ease: 'expo.out' }, '<')
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div id="process" ref={wrapRef} className={styles.wrap}>
      <div className={styles.stage}>
        <p className={styles.stageLabel}>05 · Notre Processus</p>

        {/* Pager dots */}
        <div className={styles.pager}>
          {[0, 1, 2].map(i => (
            <div key={i} className={`${styles.pDot} ${i === activeCard ? styles.pDotActive : ''}`} />
          ))}
        </div>

        {/* Card 3 — bottom */}
        <div className={styles.card} ref={c3Ref} style={{ zIndex: 1, transform: 'scale(0.934) translateY(44px)' }}>
          <CardContent card={CARDS[2]} />
        </div>

        {/* Card 2 — middle */}
        <div className={styles.card} ref={c2Ref} style={{ zIndex: 2, transform: 'scale(0.967) translateY(22px)' }}>
          <CardContent card={CARDS[1]} />
        </div>

        {/* Card 1 — top (active first) */}
        <div className={styles.card} ref={c1Ref} style={{ zIndex: 3 }}>
          <CardContent card={CARDS[0]} />
        </div>
      </div>
    </div>
  )
}

function CardContent({ card }) {
  return (
    <>
      <p className={styles.cardStep}>{card.step}</p>
      <div className={styles.cardDivider}>
        <div className={styles.divLine} />
        <div className={styles.cardRoman}>{card.roman}</div>
      </div>
      <h3 className={styles.cardTitle}>
        {card.title[0]} <em>{card.title[1]}</em>
      </h3>
      <p className={styles.cardBody}>{card.body}</p>
      <span className={styles.cardCta} data-cursor-grow>{card.cta}</span>
    </>
  )
}
