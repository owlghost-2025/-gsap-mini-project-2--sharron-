import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from '../styles/Navbar.module.css'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['Collections', 'Savoir-Faire', 'La Maison', 'Voyage']
const NAV_RIGHT = ['Search', 'Account', 'Bag (0)']

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    let lastDir = 0
    const st = ScrollTrigger.create({
      start: 'top -100',
      onUpdate(self) {
        const dir = self.getVelocity() > 0 ? -1 : 1
        if (dir !== lastDir) {
          gsap.to(navRef.current, {
            yPercent: dir === 1 ? 0 : -110,
            duration: 0.45,
            ease: 'power3.out',
          })
          lastDir = dir
        }
      },
    })
    return () => st.kill()
  }, [])

  return (
    <nav ref={navRef} className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.brandName}>LOUIS VUITTON</span>
        <span className={styles.brandSub}>Maison Fondée en 1854</span>
      </div>

      <div className={styles.links}>
        {NAV_LINKS.map(link => (
          <a key={link} href="#" className={styles.link}>{link}</a>
        ))}
      </div>

      <div className={styles.right}>
        {NAV_RIGHT.map(item => (
          <span key={item} className={styles.navIcon}>{item}</span>
        ))}
      </div>
    </nav>
  )
}
