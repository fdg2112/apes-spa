import { useEffect, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Library,
  GraduationCap,
  Sprout,
  Landmark,
  Sparkles,
  MapPin,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '../ui/Section'
import { OBRAS, type Obra } from '../../data/content'

const ICON_MAP: Record<string, LucideIcon> = {
  library: Library,
  'graduation-cap': GraduationCap,
  sprout: Sprout,
  landmark: Landmark,
}

function CardInner({ obra }: { obra: Obra }) {
  const Icon = obra.icon ? ICON_MAP[obra.icon] ?? Sparkles : Sparkles
  return (
    <>
      {/* Encabezado: foto o placeholder de marca */}
      <div className="relative h-36 overflow-hidden">
        {obra.image ? (
          <img
            src={obra.image}
            alt={obra.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold/15 via-mist to-haze">
            <Icon size={46} className="text-gold-deep/70" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-inscription text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-gold-deep shadow-sm backdrop-blur">
          {obra.tag}
        </span>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-gold-deep">
          {obra.title}
        </h3>
        {obra.meta && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
            <MapPin size={13} className="shrink-0 text-gold-deep" />
            {obra.meta}
          </p>
        )}
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{obra.excerpt}</p>
        <span className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-xs font-medium text-gold-deep">
          {obra.url ? (
            <>
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              Ir al artículo{obra.source ? ` · ${obra.source}` : ''}
            </>
          ) : (
            <span className="text-ink-soft">Actividad en curso</span>
          )}
        </span>
      </div>
    </>
  )
}

function Card({ obra }: { obra: Obra }) {
  const cls =
    'group flex w-[86%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 sm:w-[64%] md:w-[46%] lg:w-[31%]'
  return obra.url ? (
    <a data-card href={obra.url} target="_blank" rel="noopener noreferrer" className={cls}>
      <CardInner obra={obra} />
    </a>
  ) : (
    <article data-card className={cls}>
      <CardInner obra={obra} />
    </article>
  )
}

/** Máscara de degradado en ambos bordes: recorta las tarjetas vecinas. */
const edgeFade = 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'

export function Obras() {
  const scroller = useRef<HTMLDivElement>(null)
  const animating = useRef(false)

  // Triplicamos la lista para simular un carrusel infinito.
  const items = [...OBRAS.items, ...OBRAS.items, ...OBRAS.items]

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const third = () => el.scrollWidth / 3
    el.scrollLeft = third()
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (animating.current) return
        const t = third()
        if (el.scrollLeft < t * 0.5) el.scrollLeft += t
        else if (el.scrollLeft > t * 1.5) el.scrollLeft -= t
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const move = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.5
    const t = el.scrollWidth / 3
    if (el.scrollLeft < t * 0.5) el.scrollLeft += t
    else if (el.scrollLeft > t * 1.5) el.scrollLeft -= t
    animating.current = true
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
    window.setTimeout(() => (animating.current = false), 450)
  }

  return (
    <Section id="obras" eyebrow={OBRAS.eyebrow} title={OBRAS.title} lead={OBRAS.lead}>
      <div className="relative">
        <div
          ref={scroller}
          style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
          className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((obra, i) => (
            <Card key={`${obra.title}-${i}`} obra={obra} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Obra anterior"
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-line bg-white/90 p-2 text-ink-soft shadow-sm backdrop-blur transition-colors hover:border-gold hover:text-gold-deep sm:left-2"
        >
          <ChevronLeft size={26} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Obra siguiente"
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-line bg-white/90 p-2 text-ink-soft shadow-sm backdrop-blur transition-colors hover:border-gold hover:text-gold-deep sm:right-2"
        >
          <ChevronRight size={26} />
        </button>
      </div>
    </Section>
  )
}
