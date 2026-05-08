import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from '../styles/Collections.module.css'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    num: '01 / 05 — Maroquinerie',
    title: ['La Grande', 'Maroquinerie'],
    titleEm: 1,
    desc: 'The Speedy, the Neverfull, the Capucines. Icons are born, not made. Each handbag begins as a sketch, becomes a prototype, and earns its name only after it earns its place in history.',
    cta: 'Discover Handbags',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85',
    bg: '#07060a',
  },
  {
    num: '02 / 05 — Prêt-à-Porter',
    title: ['Prêt-à-', 'Porter'],
    titleEm: 1,
    desc: "Nicolas Ghesquière's vision for Louis Vuitton womenswear — a synthesis of architectural precision and feminine strength. Each season a new chapter in the ongoing narrative of modern luxury.",
    cta: 'Discover Ready-to-Wear',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85',
    bg: '#080a07',
  },
  {
    num: '03 / 05 — Souliers',
    title: ['Les', 'Souliers'],
    titleEm: 1,
    desc: 'From the Archlight to the Run Away — Louis Vuitton footwear is the marriage of the Maison\'s rigorous craftsmanship with contemporary silhouette. Each step is a statement.',
    cta: 'Discover Shoes',
    img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=85',
    bg: '#0a0707',
  },
  {
    num: '04 / 05 — Horlogerie',
    title: ['Horlogerie &', 'Joaillerie'],
    titleEm: 1,
    desc: 'The Tambour — a revolution in watchmaking that dared to be different. Louis Vuitton timepieces are born at La Fabrique du Temps, a Geneva manufacture dedicated to the mastery of complication.',
    cta: 'Discover Watches & Jewelry',
    img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=900&q=85',
    bg: '#08080a',
  },
  {
    num: '05 / 05 — Parfums',
    title: ['Les', 'Parfums'],
    titleEm: 1,
    desc: 'Master Perfumer Jacques Cavallier Belletrud creates olfactory journeys as layered and complex as the Maison itself. Perfume as the invisible accessory.',
    cta: 'Discover Fragrances',
    img: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=900&q=85',
    bg: '#090709',
  },
]

export default function Collections() {
  const wrapRef  = useRef(null)
  const trackRef = useRef(null)
  const textRefs = useRef([])
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${(PANELS.length - 1) * window.innerWidth}`,
          onUpdate(self) {
            const prog = self.progress
            const idx  = Math.round(prog * (PANELS.length - 1))
            setActiveIdx(idx)

            textRefs.current.forEach((t, i) => {
              if (!t) return
              const dist = Math.abs(i - prog * (PANELS.length - 1))
              gsap.to(t, { opacity: dist < 0.55 ? 1 : 0.07, duration: 0.3 })
              gsap.to(t, { x: (i - prog * (PANELS.length - 1)) * -28, duration: 0.4 })
            })

            // Zoom last panel image
            const lastImg = wrapRef.current.querySelector('[data-last-img]')
            if (lastImg) {
              const zp = Math.max(0, (prog - 0.8) / 0.2)
              gsap.to(lastImg, { scale: 1.04 + zp * 0.04, duration: 0.4 })
            }
          },
        },
      })

      tl.to(trackRef.current, {
        x: () => -(PANELS.length - 1) * window.innerWidth,
        ease: 'none',
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div id="collections" ref={wrapRef} className={styles.wrap}>
      <div ref={trackRef} className={styles.track}>
        {PANELS.map((panel, i) => (
          <div
            key={i}
            className={styles.panel}
            style={{ background: panel.bg }}
          >
            {/* Top bar only on first panel */}
            {i === 0 && (
              <div className={styles.topBar}>
                <span className={styles.topLabel}>03 · Les Collections</span>
                <div className={styles.dots}>
                  {PANELS.map((_, di) => (
                    <div
                      key={di}
                      className={`${styles.dot} ${di === activeIdx ? styles.dotActive : ''}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Background image blurred */}
            <div
              className={styles.panelBg}
              style={{ backgroundImage: `url('${panel.img}')` }}
            />

            <div className={styles.inner}>
              {/* Text side */}
              <div
                className={styles.textSide}
                ref={el => (textRefs.current[i] = el)}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p className={styles.panelNum}>{panel.num}</p>
                <h3 className={styles.panelTitle}>
                  {panel.title[0]} <em>{panel.title[1]}</em>
                </h3>
                <p className={styles.panelDesc}>{panel.desc}</p>
                <span className={styles.panelCta} data-cursor-grow>
                  {panel.cta}
                </span>
              </div>

              {/* Image side */}
              <div className={styles.imgSide}>
                <img
                  src={panel.img}
                  alt={panel.title.join(' ')}
                  data-last-img={i === PANELS.length - 1 ? true : undefined}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
