import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from '../styles/Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef  = useRef(null)
  const bgRef       = useRef(null)
  const ruleRef     = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const line3Ref    = useRef(null)
  const dateRef     = useRef(null)
  const descRef     = useRef(null)
  const btnsRef     = useRef(null)
  const scrollRef   = useRef(null)
  const d1Ref       = useRef(null)
  const d2Ref       = useRef(null)
  const d3Ref       = useRef(null)
  const d4Ref       = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Set initial states ──
      gsap.set([d1Ref.current], { opacity: 0, x: -80, y: 40, rotation: -20 })
      gsap.set([d2Ref.current], { opacity: 0, x: 80,  y: -40, rotation: 15 })
      gsap.set([d3Ref.current], { opacity: 0, x: -50 })
      gsap.set([d4Ref.current], { opacity: 0, x: 60,  y: -30 })
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { y: '108%' })

      // ── Hero Intro Timeline ──
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl
        .to(bgRef.current,   { scale: 1, duration: 2.5, ease: 'power2.out' }, 0)
        .to(ruleRef.current, { opacity: 1, duration: 0.9 }, 0.5)
        .to([line1Ref.current, line2Ref.current, line3Ref.current], {
          y: '0%', stagger: 0.14, duration: 1.3,
        }, 0.65)
        .to(dateRef.current,   { opacity: 1, duration: 0.9 }, 1.2)
        .to(descRef.current,   { opacity: 1, duration: 0.8 }, 1.45)
        .to(btnsRef.current,   { opacity: 1, duration: 0.8 }, 1.65)
        .to(d1Ref.current,     { opacity: 1, x: 0, y: 0, rotation: 0, duration: 1.4 }, 0.8)
        .to(d2Ref.current,     { opacity: 1, x: 0, y: 0, rotation: 0, duration: 1.4 }, 0.9)
        .to(d3Ref.current,     { opacity: 1, x: 0, duration: 1.2 }, 1.0)
        .to(d4Ref.current,     { opacity: 1, x: 0, y: 0, duration: 1.2 }, 1.1)
        .to(scrollRef.current, { opacity: 1, duration: 0.8 }, 1.9)

      // ── Floating idle loops ──
      gsap.to(d1Ref.current, { y: '+=16', rotation: '+=8',  duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 })
      gsap.to(d2Ref.current, { y: '-=12', rotation: '-=6',  duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3   })
      gsap.to(d3Ref.current, { x: '+=18', duration: 6,      repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.8 })
      gsap.to(d4Ref.current, { y: '+=10', rotation: '+=5',  duration: 4,   repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3.2 })

      // ── Hero BG Parallax on scroll ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
          gsap.set(bgRef.current, { y: self.progress * 120 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      {/* Background image */}
      <div ref={bgRef} className={styles.heroBg} />
      <div className={styles.heroVignette} />

      {/* Decorative shapes */}
      <div ref={d1Ref} className={`${styles.deco} ${styles.decoDiamond}`} />
      <div ref={d2Ref} className={`${styles.deco} ${styles.decoCircle}`} />
      <div ref={d3Ref} className={`${styles.deco} ${styles.decoCross}`}  />
      <div ref={d4Ref} className={`${styles.deco} ${styles.decoLV}`}>LV</div>

      {/* Content */}
      <div className={styles.heroContent}>
        <div ref={ruleRef} className={styles.heroRule}>
          <div className={styles.ruleLine} />
          <span className={styles.ruleText}>Maison Fondée en Paris · 1854</span>
          <div className={styles.ruleLine} />
        </div>

        <h1 className={styles.heroTitle}>
          <span className={styles.titleLine}><span ref={line1Ref}>The <em>Art</em></span></span>
          <span className={styles.titleLine}><span ref={line2Ref}>of the</span></span>
          <span className={styles.titleLine}><span ref={line3Ref}>Journey</span></span>
        </h1>

        <p ref={dateRef} className={styles.heroDate}>
          Savoir-faire, depuis cent soixante-dix ans
        </p>
        <p ref={descRef} className={styles.heroDesc}>
          Craftsmanship · Heritage · Innovation
        </p>

        <div ref={btnsRef} className={styles.heroBtns}>
          <button className="btn-lv">Explore Collection</button>
          <button className="btn-lv-ghost">Notre Maison</button>
        </div>
      </div>

      {/* Scroll invite */}
      <div ref={scrollRef} className={styles.scrollInvite}>
        <span className={styles.scrollText}>Découvrir</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
