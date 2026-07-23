import { MapPin, Building2, Users } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { UBICACION } from '../../data/content'
import beeLogo from '../../assets/apes.png'

export function Lugar() {
  return (
    <Section id="ubicacion" eyebrow={UBICACION.eyebrow} title={UBICACION.title} tone="soft">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Columna de texto */}
        <div className="flex flex-col gap-6">
          {/* Sede en formación */}
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)]">
              <img
                src={beeLogo}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 opacity-[0.06]"
              />
              <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold-deep">
                <Building2 size={22} />
              </span>
              <h3 className="font-display text-2xl font-bold text-ink">{UBICACION.sede.title}</h3>
              <p className="mt-1 font-inscription text-xs uppercase tracking-[0.15em] text-gold-deep">
                {UBICACION.sede.subtitle}
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">{UBICACION.sede.text}</p>
              <p className="mt-5 flex items-center gap-2 text-sm text-ink-soft">
                <MapPin size={16} className="shrink-0 text-gold-deep" />
                {UBICACION.sede.detail}
              </p>
            </div>
          </Reveal>

          {/* Filial */}
          <Reveal direction="right" delay={0.1}>
            <div className="rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)]">
              <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 text-gold-deep">
                <Users size={22} />
              </span>
              <h3 className="font-display text-2xl font-bold text-ink">{UBICACION.filial.title}</h3>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-soft">{UBICACION.filial.text}</p>
            </div>
          </Reveal>
        </div>

        {/* Mapa */}
        <Reveal direction="left" delay={0.1}>
          <div className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 border-b border-line p-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold-deep">
                <MapPin size={22} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">Cómo ubicarnos</h3>
                <p className="text-sm text-ink-soft">{UBICACION.sede.subtitle}</p>
              </div>
            </div>
            <iframe
              title="Ubicación de la Asociación Civil APES"
              src={UBICACION.mapSrc}
              className="w-full flex-1 grayscale-[.25] transition-all duration-500 group-hover:grayscale-0"
              style={{ border: 0, minHeight: 320 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
