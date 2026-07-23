import { MapPin, Mail, Users, Instagram, Facebook } from 'lucide-react'
import { ORG, NAV, CONTACTO } from '../../data/content'
import beeLogo from '../../assets/apes.png'

const SOCIAL = [
  { label: 'Instagram', Icon: Instagram, url: ORG.social.instagram },
  { label: 'Facebook', Icon: Facebook, url: ORG.social.facebook },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line bg-mist px-6 pb-10 pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        {/* Marca */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white ring-1 ring-line">
              <img src={beeLogo} alt="" className="h-8 w-8 object-contain" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[0.58rem] uppercase tracking-[0.28em] text-ink-soft">{ORG.kicker}</span>
              <span className="mt-0.5 font-display text-lg font-bold tracking-tight text-ink">{ORG.brand}</span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">{ORG.motto}</p>
          <p className="mt-4 font-inscription text-xs uppercase tracking-[0.25em] text-gold-deep">
            {ORG.tagline}
          </p>
          {/* Redes (listas para insertar los enlaces) */}
          <div className="mt-5 flex gap-3">
            {SOCIAL.map(({ label, Icon, url }) => (
              <a
                key={label}
                href={url || '#'}
                target={url ? '_blank' : undefined}
                rel={url ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink-soft transition-colors hover:border-gold hover:text-gold-deep"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="mb-4 font-inscription text-xs uppercase tracking-[0.25em] text-gold-deep">
            Secciones
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-ink-soft">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="transition-colors hover:text-gold-deep">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="mb-4 font-inscription text-xs uppercase tracking-[0.25em] text-gold-deep">
            Dónde estamos
          </h3>
          <ul className="space-y-3 text-sm text-ink-soft">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-deep" />
              <span>{ORG.city}, {ORG.province} (CP {ORG.cp})</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-gold-deep" />
              <a href={`mailto:${CONTACTO.email}`} className="transition-colors hover:text-gold-deep">
                {CONTACTO.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Users size={18} className="mt-0.5 shrink-0 text-gold-deep" />
              <span>Actividades abiertas a la comunidad</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="rule-gold mx-auto mt-14 max-w-6xl opacity-50" />

      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-ink-soft sm:flex-row">
        <p>© {year} {ORG.name} · desde {ORG.founded}. Todos los derechos reservados.</p>
        <p>{ORG.city}, {ORG.province}, {ORG.country}</p>
      </div>
    </footer>
  )
}
