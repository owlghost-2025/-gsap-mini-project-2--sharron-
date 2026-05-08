import React from 'react'
import Cursor      from './components/Cursor'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Maison      from './components/Maison'
import Collections from './components/Collections'
import Stats       from './components/Stats'
import Process     from './components/Process'
import Finale      from './components/Finale'

export default function App() {
  return (
    <>
      {/* Custom cursor — rendered above everything */}
      <Cursor />

      {/* Fixed navigation */}
      <Navbar />

      {/* ── Section 1: Hero Intro ── */}
      <Hero />

      {/* ── Section 2: Maison / Features ── */}
      <Maison />

      {/* ── Section 3: Horizontal Collections Gallery ── */}
      <Collections />

      {/* ── Section 4: Stats Counter ── */}
      <Stats />

      {/* ── Section 5: Layered Process Cards ── */}
      <Process />

      {/* ── Section 6: Final CTA ── */}
      <Finale />
    </>
  )
}
