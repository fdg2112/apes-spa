import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

type RevealProps = {
  children: ReactNode
  /** Dirección desde la que aparece el contenido. */
  direction?: Direction
  /** Retardo en segundos antes de iniciar la animación. */
  delay?: number
  /** Clases adicionales para el contenedor. */
  className?: string
  /** Elemento HTML a renderizar. */
  as?: 'div' | 'section' | 'li' | 'article' | 'span'
}

const OFFSET = 32

function buildVariants(direction: Direction, delay: number): Variants {
  const from =
    direction === 'up'
      ? { y: OFFSET }
      : direction === 'down'
        ? { y: -OFFSET }
        : direction === 'left'
          ? { x: OFFSET }
          : direction === 'right'
            ? { x: -OFFSET }
            : {}

  return {
    hidden: { opacity: 0, ...from },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  }
}

/**
 * Envoltorio que revela su contenido con una animación suave cuando entra en
 * el viewport. Respeta `prefers-reduced-motion` a través de Motion.
 */
export function Reveal({ children, direction = 'up', delay = 0, className, as = 'div' }: RevealProps) {
  // El cast evita el "union type too complex" al indexar motion con una unión de tags.
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      variants={buildVariants(direction, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </MotionTag>
  )
}
