import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección actualmente visible en el viewport, para
 * resaltar el enlace correspondiente en la navegación.
 *
 * La línea de detección se ubica algo por debajo de la barra de navegación
 * (`offset`), de modo que una sección queda activa apenas su encabezado pasa
 * bajo el navbar. Además se contempla el final de la página para que la última
 * sección se marque al llegar al fondo.
 */
export function useScrollSpy(sectionIds: string[], offset = 96): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    let ticking = false

    const compute = () => {
      ticking = false
      const scrollPosition = window.scrollY + offset

      // Al llegar al final de la página, activar la última sección.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActiveId(sectionIds[sectionIds.length - 1] ?? '')
        return
      }

      let current = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element && element.offsetTop <= scrollPosition) {
          current = id
        }
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(compute)
      }
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
