import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from '../styles/Maison.module.css'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    year: 'Héritage · Since 1854',
    roman: 'I',
    title: 'Heritage & Tradition',
    body: 'Born in Paris by trunk-maker Louis Vuitton, every piece carries 170 years of accumulated knowledge. Each craftsperson trains for years before their hands touch the iconic Monogram canvas.',
    tag: 'La Maison · Paris',
  },
  {
    year: 'Création · Ateliers d\'Art',
    roman: 'II',
    title: 'Iconic Design',
    body: 'The Monogram canvas, Damier pattern, and Toile Empreinte — each motif a language. Nicolas Ghesquière continues the dialogue between Louis Vuitton\'s past and the world of tomorrow.',
    tag: 'Monogram · Damier · Empreinte',
  },
  {
    year: 'Exclusivité · Rare Crafts',
    roman: 'III',
    title: 'Exclusive Collections',
    body: 'Les Extraordinaires. Haute Maroquinerie. Each piece made to order, each stitch placed by a single pair of hands. The rarest leather goods in the world begin with a conversation, not a catalogue.',
    tag: 'Sur Mesure · Exclusif',
  },
  {
    year: 'Rayonnement · Global Presence',
    roman: 'IV',
    title: 'Global Presence',
    body: 'From the Champs-Élysées flagship to the shores of Japan — 460 Maisons in 50 countries. Each store a stage, each collection an act. Louis Vuitton travels the world to bring the world to you.',
    tag: '460 Stores · 50 Countries',
  },
]

export default function Maison() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([sectionRef.current.querySelector(`.${styles.eyebrow}`),
                 sectionRef.current.querySelector(`.${styles.title}`)], {
        opacity: 0, y: 35, stagger: 0.18, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      })

      cardRefs.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 55, duration: 0.95, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 87%', toggleActions: 'play none none reverse' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="maison" ref={sectionRef} className={styles.maison}>
      <p className={styles.eyebrow}>La Maison · Notre Savoir-Faire</p>
      <h2 className={styles.title}>
        170 years of<br /><em>uncompromising</em> craft
      </h2>

      <div className={styles.grid}>
        {CARDS.map((card, i) => (
          <div
            key={card.roman}
            className={styles.card}
            ref={el => (cardRefs.current[i] = el)}
            data-cursor-grow
          >
            <p className={styles.cardYear}>{card.year}</p>
            <div className={styles.cardRoman}>{card.roman}</div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardBody}>{card.body}</p>
            <span className={styles.cardTag}>{card.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
