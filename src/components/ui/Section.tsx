import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  eyebrow?: string
  title?: string
  /** Texto introductorio bajo el título. */
  lead?: string
  children: ReactNode
  className?: string
  /** Alinea el encabezado al centro (por defecto) o a la izquierda. */
  align?: 'center' | 'left'
  /** Fondo alternativo más claro para dar ritmo visual. */
  tone?: 'dark' | 'soft'
}

/**
 * Contenedor estándar de sección con encabezado animado.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
  align = 'center',
  tone = 'dark',
}: SectionProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <section
      id={id}
      className={`relative px-6 pt-6 pb-10 sm:pt-8 sm:pb-12 ${tone === 'soft' ? 'bg-mist' : 'bg-white'} ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || lead) && (
          <Reveal className={`mb-6 sm:mb-7 flex max-w-3xl flex-col gap-2 ${alignment}`}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && (
              <h2 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                {title}
              </h2>
            )}
            {align === 'center' && (
              <div className="rule-gold w-24" />
            )}
            {lead && <p className="text-lg leading-relaxed text-ink-soft">{lead}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
