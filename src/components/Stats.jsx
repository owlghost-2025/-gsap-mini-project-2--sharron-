import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from '../styles/Stats.module.css'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { to: 170,  suffix: '+',   label: 'Years of Heritage' },
  { to: 460,  suffix: '+',   label: 'Maisons Worldwide' },
  { to: 6000, suffix: '+',   label: 'Master Artisans'   },
  { to: 50,   suffix: '',    label: 'Countries Present'  },
]

export default function Stats() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])
  const countRefs  = useRef([])
  const btnRef     = useRef(null)
  const counted    = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ring pulse
      gsap.to(sectionRef.current.querySelector(`.${styles.ring1}`), {
        scale: 1.04, opacity: 1, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
      gsap.to(sectionRef.current.querySelector(`.${styles.ring2}`), {
        scale: 1.04, opacity: 1, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', direction: -1,
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 72%',
        onEnter() {
          if (counted.current) return
          counted.current = true

          cardRefs.current.forEach((card, i) => {
            gsap.to(card, {
              opacity: 1, y: 0, duration: 0.9, delay: i * 0.13, ease: 'power3.out',
              onStart() {
                card.classList.add(styles.vis)
                // Animate count
                const el  = countRefs.current[i]
                const end = STATS[i].to
                const obj = { n: 0 }
                gsap.to(obj, {
                  n: end,
                  duration: 2.2,
                  ease: 'power2.out',
                  onUpdate() {
                    el.textContent = Math.round(obj.n).toLocaleString()
                  },
                })
              },
            })
          })
        },
      })

      gsap.to(btnRef.current, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="chiffres" ref={sectionRef} className={styles.section}>
      <div className={styles.ring1} />
      <div className={styles.ring2} />

      <div className={styles.divider}>
        <div className={styles.divLine} />
        <div className={styles.divDiamond} />
        <div className={styles.divLine} />
      </div>

      <p className={styles.eyebrow}>04 · La Maison en Chiffres</p>
      <h2 className={styles.title}>
        The legacy, <em>in numbers</em>
      </h2>

      <div className={styles.grid}>
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={styles.card}
            ref={el => (cardRefs.current[i] = el)}
          >
            <div className={styles.num}>
              <span
                className={styles.count}
                ref={el => (countRefs.current[i] = el)}
              >0</span>
              <span className={styles.suffix}>{stat.suffix}</span>
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div ref={btnRef} className={styles.btnWrap}>
        <button className="btn-lv">Explore La Maison</button>
      </div>
    </section>
  )
}
