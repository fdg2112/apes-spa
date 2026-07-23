import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { ORG } from '../../data/content'
import { BeeSwarm } from '../ui/BeeSwarm'
import beeLogo from '../../assets/apes.png'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax: el contenido sube y se desvanece al hacer scroll.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const emblemY = useTransform(scrollYProgress, [0, 1], ['0%', '120%'])

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-honeycomb"
    >
      {/* Capas de fondo claras */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230,198,106,0.22),_transparent_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

      {/* Abeja gigante de fondo con parallax */}
      <motion.div
        style={{ y: emblemY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <img src={beeLogo} alt="" className="w-[620px] max-w-[92vw] opacity-[0.05]" />
      </motion.div>

      {/* Contenido */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        {/* Enjambre de abejas + nombre */}
        <BeeSwarm className="mb-6" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="eyebrow mb-4"
        >
          {ORG.city} · {ORG.province}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9 }}
          className="max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          {ORG.motto} <span className="text-ink">{ORG.beeLine}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mt-9 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#quienes"
            className="rounded-full bg-gold px-8 py-3 font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Conocé la Asociación
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-ink/20 px-8 py-3 font-medium text-ink transition-colors hover:border-gold hover:text-gold-deep"
          >
            Contactanos
          </a>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#quienes"
        aria-label="Desplazarse hacia abajo"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ink/40 hover:text-gold"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  )
}
