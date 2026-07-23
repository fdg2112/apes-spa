import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { NAV, ORG } from '../../data/content'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import beeLogo from '../../assets/apes.png'

const SECTION_IDS = NAV.map((item) => item.id)
const LINKS = NAV.filter((item) => item.id !== 'inicio')

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navegación robusta (móvil incluido): cerramos el menú y desplazamos
  // programáticamente, en vez de depender del salto por hash del navegador.
  const goTo = (e: MouseEvent, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    })
  }

  // Enlace con "sombreado gris" al pasar por encima; al quedar activo, el
  // sombreado se fija y el texto pasa a dorado.
  const linkClass = (isActive: boolean) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-haze text-gold-deep' : 'text-ink-soft hover:bg-mist hover:text-ink'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-white/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        {/* Marca */}
        <a href="#inicio" onClick={(e) => goTo(e, 'inicio')} className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist ring-1 ring-line transition-colors group-hover:ring-gold/50">
            <img src={beeLogo} alt="" className="h-7 w-7 object-contain" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.58rem] uppercase tracking-[0.28em] text-ink-soft">{ORG.kicker}</span>
            <span className="mt-0.5 font-display text-lg font-bold tracking-tight text-ink">
              {ORG.brand}
            </span>
          </span>
        </a>

        {/* Enlaces alineados a la derecha */}
        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={(e) => goTo(e, item.id)} className={linkClass(activeId === item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="ml-auto text-ink lg:hidden"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-line bg-white/95 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {NAV.filter((item) => item.id !== 'inicio').map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => goTo(e, item.id)}
                    className={`block border-b border-line py-3 text-base ${
                      activeId === item.id ? 'text-gold-deep' : 'text-ink-soft'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
