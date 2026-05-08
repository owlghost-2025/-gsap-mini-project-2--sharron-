import React from 'react'
import { useCursor } from '../hooks/useCursor'
import styles from '../styles/Cursor.module.css'

export default function Cursor() {
  const { dotRef, ringRef } = useCursor()

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
