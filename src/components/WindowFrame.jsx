import { useEffect, useRef, useState } from 'react'
import './WindowFrame.css'

/**
 * Contenedor draggable para ventanas flotantes.
 * - Drag por elemento .win-drag (mouse + touch)
 * - Click en cualquier parte trae al frente (onFocus)
 * - Mobile: swipe vertical hacia abajo (>90px) sobre el titlebar cierra la ventana
 * - Constraints: nunca sale del viewport (mínimo 80px visibles)
 */
export default function WindowFrame({
  children,
  defaultPos = { x: 60, y: 60 },
  zIndex = 100,
  onFocus,
  onSwipeClose,
  minimized = false,
  maximized = false,
}) {
  const [pos, setPos] = useState(defaultPos)
  const posRef = useRef(pos)
  useEffect(() => { posRef.current = pos }, [pos])

  const startDrag = (e) => {
    const handle = e.target.closest('.win-drag')
    if (!handle) return
    if (e.target.closest('button, input, textarea, select, .mc')) return

    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const origX = posRef.current.x
    const origY = posRef.current.y

    // Bloquear selección durante el drag
    document.body.classList.add('is-dragging')
    if (window.getSelection) window.getSelection().removeAllRanges()

    let lastDeltaY = 0
    const isMobile = window.innerWidth <= 640
    const SWIPE_CLOSE_THRESHOLD = 90   // px verticales para disparar close

    const onMove = (ev) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      lastDeltaY = dy

      const maxX = Math.max(0, window.innerWidth - 80)
      const maxY = Math.max(0, window.innerHeight - 80)
      const nx = Math.max(0, Math.min(maxX, origX + dx))
      const ny = Math.max(0, Math.min(maxY, origY + dy))
      setPos({ x: nx, y: ny })
    }
    const onUp = () => {
      document.body.classList.remove('is-dragging')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)

      // Mobile: si el gesto fue hacia abajo >90px, cerrar la ventana
      if (isMobile && lastDeltaY > SWIPE_CLOSE_THRESHOLD && onSwipeClose) {
        onSwipeClose()
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  return (
    <div
      className={`win-frame ${minimized ? 'minimized' : ''} ${maximized ? 'maximized' : ''}`}
      style={maximized ? { zIndex } : { left: pos.x, top: pos.y, zIndex }}
      onPointerDown={(e) => { onFocus?.(); if (!maximized) startDrag(e) }}
    >
      {children}
    </div>
  )
}
