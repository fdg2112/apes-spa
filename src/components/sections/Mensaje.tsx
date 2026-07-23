import { HeartHandshake, Users, Sparkles } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { QUIENES } from '../../data/content'
import beeLogo from '../../assets/apes.png'

const ICONS = [HeartHandshake, Users, Sparkles]

export function Mensaje() {
  return (
    <Section id="quienes" eyebrow={QUIENES.eyebrow} title={QUIENES.title} lead={QUIENES.lead}>
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Texto narrativo */}
        <div className="lg:col-span-3">
          <div className="space-y-5 text-ink-soft">
            {QUIENES.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed first-letter:font-display first-letter:font-bold first-letter:text-gold-deep">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Valores */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          {QUIENES.values.map((value, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal key={value.title} direction="left" delay={i * 0.1}>
                <div className="group flex gap-4 rounded-xl border border-line bg-white p-5 shadow-[var(--shadow-card)] transition-colors hover:border-gold/50">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold-deep transition-transform group-hover:scale-110">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{value.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{value.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* ¿Por qué APES? */}
      <Reveal>
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-line bg-mist p-8 sm:p-10">
          <img
            src={beeLogo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rotate-12 opacity-[0.07]"
          />
          <div className="relative max-w-3xl">
            <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">{QUIENES.porque.title}</h3>
            <div className="rule-gold mt-3 w-20" />
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{QUIENES.porque.text}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
