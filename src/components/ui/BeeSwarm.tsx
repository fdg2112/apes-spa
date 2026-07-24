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
const ENTRY_WINDOW = 1500 // ms en los que se dispersan los arranques (desorden)
const ENT_MIN = 650 // ms mínimos de vuelo de entrada
const ENT_SPAN = 550 // ms extra aleatorios de vuelo de entrada

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
    }, 7)
    return () => window.clearInterval(id)
  }, [])

  // 3) Movimiento: entrada aleatoria + órbita, vía requestAnimationFrame.
  useEffect(() => {
    if (!geom) return
    const { R, side } = geom
    const cx = side / 2
    const cy = side / 2
    const omega = (2 * Math.PI) / PERIOD // rad/ms
    const step = (2 * Math.PI) / COUNT
    const TWO_PI = Math.PI * 2

    // Cada abeja aparece desde un punto al azar fuera de pantalla y vuela recto
    // hacia su slot (que ya está rotando). Al llegar se funde con la órbita, de
    // modo que todas terminan equiespaciadas girando en fila india. Arranques y
    // duraciones aleatorias => la entrada se ve desordenada, no en formación.
    type Plan = {
      slotAng: number // φ final en la órbita (equiespaciado)
      entryX: number
      entryY: number
      start: number // ms hasta que arranca el vuelo
      dur: number // ms de vuelo de entrada
    }
    const plans: Plan[] = []
    for (let i = 0; i < COUNT; i++) {
      const ea = Math.random() * TWO_PI // dirección de aparición
      const er = side * (0.75 + Math.random() * 0.5) // distancia fuera del marco
      plans.push({
        slotAng: -Math.PI / 2 + i * step,
        entryX: cx + er * Math.cos(ea),
        entryY: cy + er * Math.sin(ea),
        start: Math.random() * ENTRY_WINDOW,
        dur: ENT_MIN + Math.random() * ENT_SPAN,
      })
    }

    const easeOut = (u: number) => 1 - (1 - u) * (1 - u)

    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = now - t0
      for (let i = 0; i < COUNT; i++) {
        const el = beeRefs.current[i]
        if (!el) continue
        const p = plans[i]
        // Posición del slot en el anillo, que ya rota, en este instante.
        const theta = p.slotAng + omega * t
        const tx = cx + R * Math.cos(theta)
        const ty = cy + R * Math.sin(theta)
        let x: number
        let y: number
        let o: number
        let dirX: number
        let dirY: number
        if (t < p.start) {
          x = p.entryX
          y = p.entryY
          o = 0
          dirX = tx - p.entryX
          dirY = ty - p.entryY
        } else if (t < p.start + p.dur) {
          const u = easeOut((t - p.start) / p.dur)
          x = p.entryX + (tx - p.entryX) * u
          y = p.entryY + (ty - p.entryY) * u
          o = Math.min(1, (t - p.start) / (p.dur * 0.3))
          dirX = tx - p.entryX
          dirY = ty - p.entryY
        } else {
          // En órbita: tangente al anillo (fila india).
          x = tx
          y = ty
          o = 1
          dirX = -Math.sin(theta)
          dirY = Math.cos(theta)
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
