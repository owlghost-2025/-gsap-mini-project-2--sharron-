import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from '../styles/Finale.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Finale() {
  const sectionRef = useRef(null)
  const ruleRef    = useRef(null)
  const titleRef   = useRef(null)
  const subRef     = useRef(null)
  const btnWrapRef = useRef(null)
  const glowRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      tl
        .to(sectionRef.current, { backgroundColor: '#050403', duration: 1.2 }, 0)
        .to(ruleRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2)
        .to(titleRef.current,   { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'expo.out' }, 0.4)
        .to(subRef.current,     { opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.7)
        .to(btnWrapRef.current, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.6)' }, 0.95)
        .to(glowRef.current,    { opacity: 1, duration: 1 }, 0.85)

      // Button glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.85, scale: 1.4, duration: 2.2,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="finale" ref={sectionRef} className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.vignette} />

      <div className={styles.content}>
        <div ref={ruleRef} className={styles.rule}>
          <div className={styles.ruleLine} />
          <span className={styles.ruleText}>06 · L'Invitation</span>
          <div className={styles.ruleLine} />
        </div>

        <h2 ref={titleRef} className={styles.title}>
          Let's Create<br /><em>Something</em><br />Extraordinary
        </h2>

        <p ref={subRef} className={styles.sub}>
          Begin your Louis Vuitton story. Discover pieces crafted to accompany
          you through every chapter of a remarkable life.
        </p>

        <div ref={btnWrapRef} className={styles.btnWrap}>
          <div ref={glowRef} className={styles.btnGlow} />
          <button className={`btn-lv ${styles.btn}`}>
            Explore the Collection ↗
          </button>
        </div>
      </div>

      <p className={styles.footnote}>
        Louis Vuitton Malletier · Paris, France · Fondé en 1854
      </p>
    </section>
  )
}
