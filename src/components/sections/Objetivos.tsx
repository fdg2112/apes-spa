import {
  Sparkles,
  HeartHandshake,
  GraduationCap,
  HeartPulse,
  Users,
  Landmark,
  Sprout,
  Globe,
  Target,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { OBJETIVOS } from '../../data/content'

const ICON_MAP: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  'graduation-cap': GraduationCap,
  'heart-pulse': HeartPulse,
  users: Users,
  landmark: Landmark,
  sprout: Sprout,
  globe: Globe,
}

export function Objetivos() {
  return (
    <Section
      id="objetivos"
      eyebrow={OBJETIVOS.eyebrow}
      title={OBJETIVOS.title}
      lead={OBJETIVOS.lead}
      tone="soft"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {OBJETIVOS.items.map((obj, i) => {
          const Icon = ICON_MAP[obj.icon] ?? Target
          return (
            <Reveal key={obj.title} delay={(i % 4) * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-lg font-bold leading-snug text-ink">{obj.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{obj.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
