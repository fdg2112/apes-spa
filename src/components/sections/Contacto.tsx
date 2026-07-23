import { useState, type ChangeEvent, type FormEvent } from 'react'
import { MapPin, Mail, Send, CheckCircle2 } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { CONTACTO, ORG } from '../../data/content'

const CONTACT_EMAIL = CONTACTO.email

type FormState = {
  nombre: string
  email: string
  mensaje: string
  // Campo trampa oculto: si un bot lo completa, descartamos el envío.
  website: string
}

type Errors = Partial<Record<'nombre' | 'email' | 'mensaje', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY: FormState = { nombre: '', email: '', mensaje: '', website: '' }

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (form.nombre.trim().length < 2) errors.nombre = 'Ingresá tu nombre.'
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Ingresá un correo válido.'
  if (form.mensaje.trim().length < 10) errors.mensaje = 'Contanos un poco más (mínimo 10 caracteres).'
  return errors
}

export function Contacto() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const update = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: si está completo, es un bot. Simulamos éxito sin enviar.
    if (form.website) {
      setSent(true)
      return
    }

    const found = validate(form)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }

    const subject = encodeURIComponent(`Consulta web — ${form.nombre.trim()}`)
    const body = encodeURIComponent(`${form.mensaje.trim()}\n\n— ${form.nombre.trim()} (${form.email.trim()})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    setSent(true)
    setForm(EMPTY)
  }

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-ink placeholder-ink/35 outline-none transition-colors focus:border-gold ${
      hasError ? 'border-red-400' : 'border-line'
    }`

  return (
    <Section id="contacto" eyebrow={CONTACTO.eyebrow} title={CONTACTO.title} lead={CONTACTO.lead} tone="soft">
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Datos */}
        <div className="lg:col-span-2">
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold-deep">
                  <MapPin size={20} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">Dónde estamos</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {ORG.city}, {ORG.province} (CP {ORG.cp})
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold-deep">
                  <Mail size={20} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">Correo</h3>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 block text-sm text-ink-soft underline-offset-4 hover:text-gold-deep hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
                <p className="font-display text-lg font-medium italic leading-relaxed text-ink/80">
                  “{CONTACTO.quote}”
                </p>
                <p className="mt-3 font-inscription text-xs uppercase tracking-[0.2em] text-gold-deep">
                  {ORG.tagline}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-3">
          <Reveal direction="left">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gold/40 bg-white p-10 text-center shadow-[var(--shadow-card)]">
                <CheckCircle2 size={48} className="text-gold" />
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">¡Gracias por escribirnos!</h3>
                <p className="mt-2 max-w-sm text-ink-soft">
                  Se abrió tu cliente de correo con el mensaje listo para enviar. Si no ocurrió,
                  escribinos directamente a{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-deep underline-offset-4 hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full border border-gold/50 px-6 py-2 text-sm text-gold-deep transition-colors hover:bg-gold hover:text-white"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className="mb-2 block text-sm text-ink-soft">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      value={form.nombre}
                      onChange={update('nombre')}
                      className={fieldClass(!!errors.nombre)}
                      placeholder="Tu nombre"
                      aria-invalid={!!errors.nombre}
                    />
                    {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-ink-soft">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                      className={fieldClass(!!errors.email)}
                      placeholder="tu@correo.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="mb-2 block text-sm text-ink-soft">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    value={form.mensaje}
                    onChange={update('mensaje')}
                    className={`${fieldClass(!!errors.mensaje)} resize-none`}
                    placeholder="Escribí tu consulta..."
                    aria-invalid={!!errors.mensaje}
                  />
                  {errors.mensaje && <p className="mt-1 text-xs text-red-500">{errors.mensaje}</p>}
                </div>

                {/* Honeypot anti-bot: oculto para usuarios reales */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="website">No completar</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={update('website')}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  <Send size={18} />
                  Enviar mensaje
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
