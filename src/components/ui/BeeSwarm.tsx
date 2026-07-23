import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ORG } from '../../data/content'
import g1 from '../../assets/bee/g1.svg'
import g2 from '../../assets/bee/g2.svg'
import g3 from '../../assets/bee/g3.svg'
import g5 from '../../assets/bee/g5.svg'
import g6 from '../../assets/bee/g6.svg'

// Secuencia de aleteo: alas arriba (g1) -> alas abajo (g6) y vuelta (ping-pong).
const FLAP = [g1, g2, g3, g5, g6, g5, g3, g2]

const COUNT = 33
const BEE = 26 // px, abeja chica
const GAP = 24 // separación entre el círculo y el texto
const PERIOD = 17000 // ms por vuelta completa (ya ensamblado)
const ENT_DUR = 620 // ms de vuelo recto de entrada
const STAGGER = 70 // ms entre una abeja y la siguiente (fila india)
const SLIDE_STEP = 52 // ms que tarda en recorrer cada "casilla" del anillo
const HOLD = 200 // ms de pausa una vez armado el anillo, antes de girar

type Geom = { R: number; side: number }

type BeeSwarmProps = { className?: string }

/**
 * 33 abejas que entran volando en dos flujos —desde la izquierda por la parte
 * superior y desde la derecha por la inferior—, se enganchan en el círculo y,
 * una vez armado el anillo, giran encadenadas alrededor del nombre.
 */
export function BeeSwarm({ className }: BeeSwarmProps) {
  const kickerRef = useRef<HTMLSpanElement>(null)
  const brandRef = useRef<HTMLSpanElement>(null)
  const beeRefs = useRef<(HTMLImageElement | null)[]>([])
  const [geom, setGeom] = useState<Geom | null>(null)

  // 1) Igualar el ancho de "APES" al de "Asociación Civil" y medir el bloque de
  //    texto para dimensionar el círculo de modo que lo englobe sin tocarlo.
  useLayoutEffect(() => {
    let cancelled = false
    const measure = () => {
      const k = kickerRef.current
      const b = brandRef.current
      if (!k || !b || cancelled) return
      b.style.transform = 'scaleX(1)'
      const wk = k.getBoundingClientRect().width
      const wb = b.getBoundingClientRect().width
      if (wb > 0) b.style.transform = `scaleX(${wk / wb})`
      const blockW = wk
      const blockH = k.getBoundingClientRect().height + b.getBoundingClientRect().height + 6
      const halfDiag = Math.hypot(blockW / 2, blockH / 2)
      const R = Math.round(halfDiag + GAP + BEE / 2)
      const side = Math.round(2 * (R + BEE))
      setGeom({ R, side })
    }
    measure()
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => {
      cancelled = true
      window.removeEventListener('resize', measure)
    }
  }, [])

  // 2) Aleteo: cambiar de cuadro por intervalo, escribiendo el src directamente.
  useEffect(() => {
    let idx = 0
    const id = window.setInterval(() => {
      idx = (idx + 1) % FLAP.length
      beeRefs.current.forEach((el, i) => {
        if (el) el.src = FLAP[(idx + i) % FLAP.length]
      })
    }, 85)
    return () => window.clearInterval(id)
  }, [])

  // 3) Movimiento: entrada en dos flujos + órbita, vía requestAnimationFrame.
  useEffect(() => {
    if (!geom) return
    const { R, side } = geom
    const cx = side / 2
    const cy = side / 2
    const omega = (2 * Math.PI) / PERIOD // rad/ms
    const step = (2 * Math.PI) / COUNT
    const entryLeftX = -side * 0.9
    const entryRightX = side * 1.9
    const TWO_PI = Math.PI * 2

    // Dos filas indias que se funden con el anillo de forma tangente (sin frenar
    // ni doblar en los costados). Flujo A: entra por la IZQUIERDA y se incorpora
    // por ARRIBA (tope), barriendo la mitad derecha en sentido horario. Flujo B:
    // entra por la DERECHA y se incorpora por ABAJO, barriendo la mitad izquierda.
    type Plan = {
      slotAng: number // φ final (continuo)
      startAng: number // φ del punto de enganche (tope o base)
      entryX: number
      targetX: number
      entryY: number
      entryDirX: number
      start: number
      enterEnd: number
      slideEnd: number
    }
    type Slot = { a: number; top: boolean; slide: number }
    const slots: Slot[] = []
    for (let m = 0; m < COUNT; m++) {
      const raw = -Math.PI / 2 + m * step
      const a = Math.atan2(Math.sin(raw), Math.cos(raw)) // (-π, π]
      const dTop = (((a + Math.PI / 2) % TWO_PI) + TWO_PI) % TWO_PI // horario desde el tope
      const top = dTop < Math.PI // mitad derecha => entra por el tope
      const slide = top ? dTop : (dTop - Math.PI) // horario desde tope (A) o base (B)
      slots.push({ a, top, slide })
    }
    const topSlots = slots.filter((s) => s.top).sort((x, y) => y.slide - x.slide)
    const botSlots = slots.filter((s) => !s.top).sort((x, y) => y.slide - x.slide)

    const plans: Plan[] = []
    const build = (list: Slot[], top: boolean) => {
      const startAng = top ? -Math.PI / 2 : Math.PI / 2
      list.forEach((s, k) => {
        const start = k * STAGGER
        const enterEnd = start + ENT_DUR
        const slideEnd = enterEnd + (s.slide / step) * SLIDE_STEP
        plans.push({
          slotAng: startAng + s.slide,
          startAng,
          entryX: top ? entryLeftX : entryRightX,
          targetX: cx,
          entryY: top ? cy - R : cy + R,
          entryDirX: top ? 1 : -1,
          start,
          enterEnd,
          slideEnd,
        })
      })
    }
    build(topSlots, true)
    build(botSlots, false)
    const globalStart = Math.max(...plans.map((p) => p.slideEnd)) + HOLD

    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = now - t0
      for (let i = 0; i < COUNT; i++) {
        const el = beeRefs.current[i]
        if (!el) continue
        const p = plans[i]
        let x: number
        let y: number
        let o: number
        let dirX: number
        let dirY: number
        if (t < p.start) {
          x = p.entryX
          y = p.entryY
          o = 0
          dirX = p.entryDirX
          dirY = 0
        } else if (t < p.enterEnd) {
          const q = (t - p.start) / ENT_DUR // lineal: llega con velocidad, no frena
          x = p.entryX + (p.targetX - p.entryX) * q
          y = p.entryY
          o = Math.min(1, (t - p.start) / (ENT_DUR * 0.35))
          dirX = p.entryDirX
          dirY = 0
        } else {
          let phi: number
          if (t < p.slideEnd && p.slideEnd > p.enterEnd) {
            phi = p.startAng + (p.slotAng - p.startAng) * ((t - p.enterEnd) / (p.slideEnd - p.enterEnd))
          } else {
            phi = p.slotAng + omega * Math.max(0, t - globalStart)
          }
          x = cx + R * Math.cos(phi)
          y = cy + R * Math.sin(phi)
          o = 1
          dirX = -Math.sin(phi)
          dirY = Math.cos(phi)
        }
        const deg = (Math.atan2(dirY, dirX) * 180) / Math.PI + 90
        el.style.opacity = String(o)
        el.style.transform = `translate3d(${x - BEE / 2}px, ${y - BEE / 2}px, 0) rotate(${deg}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [geom])

  return (
    <div
      className={className}
      style={{ width: geom?.side, height: geom?.side, position: 'relative' }}
      aria-hidden="true"
    >
      {/* Abejas */}
      {geom &&
        Array.from({ length: COUNT }).map((_, i) => (
          <img
            key={i}
            ref={(el) => {
              beeRefs.current[i] = el
            }}
            src={FLAP[i % FLAP.length]}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: BEE,
              height: BEE,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
        ))}

      {/* Nombre en el centro (dentro del círculo) */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          ref={kickerRef}
          className="font-inscription whitespace-nowrap text-sm font-semibold uppercase tracking-[0.3em] text-ink-soft sm:text-base"
        >
          {ORG.kicker}
        </span>
        <span
          ref={brandRef}
          style={{ transformOrigin: 'center' }}
          className="mt-1 block font-display text-6xl font-bold leading-none tracking-tight text-gradient-gold sm:text-7xl"
        >
          {ORG.brand}
        </span>
      </div>
    </div>
  )
}
