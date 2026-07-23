# Asociación Civil APES — Sitio web

SPA moderna de la **Asociación Civil APES** (Concepción del Uruguay, Entre Ríos,
Argentina). Personas libres unidas por la filantropía, comprometidas con el
progreso social, educativo y ambiental de la comunidad. Diseño responsive,
accesible y animado, en paleta clara (blanco · gris · dorado) con la abeja del
logo como motivo de marca.

## Stack

| Tecnología | Uso |
|---|---|
| **Vite 6 + React 18 + TypeScript** | Base del proyecto (modo `strict`) |
| **Tailwind CSS v4** | Sistema de diseño (config vía `@theme` en `src/index.css`) |
| **Motion** (Framer Motion) | Enjambre de abejas, scroll/parallax y micro-interacciones |
| **@fontsource** | Tipografías self-hosted: Poppins (títulos), Manrope (texto) |
| **lucide-react** | Iconografía |

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run build    # typecheck + build de producción (carpeta docs/)
npm run preview  # previsualizar el build de producción
```

> El binario de Node está en `C:\Program Files\nodejs`. Si `node`/`npm` no se
> reconocen en una terminal ya abierta, cerrá y reabrí la terminal.

## Secciones

- **Inicio** — Hero con enjambre de abejas (logo) que giran encadenadas y forman
  "Asociación Civil APES" en el centro.
- **Quiénes somos** — Origen y valores (Art. 1 del Estatuto).
- **Objetivos** — Objeto y fines (Art. 3), en grilla de tarjetas.
- **Nuestras obras** — Ciclo "Personas que Inspiran" (Biblioteca Lucienville,
  Basavilbaso) + áreas de acción (bibliotecas, educación, ambiente, patrimonio).
- **Ubicación** — Sede en formación + la ciudad + mapa.
- **Contacto** — Formulario validado (envío vía `mailto:`).

## Personalización

- **Contenido**: `src/data/content.ts` (fuente única de verdad).
- **Colores y tipografías**: bloque `@theme` en `src/index.css`.
- **Email de contacto**: campo `email` en `CONTACTO` (`src/data/content.ts`) —
  actualmente un placeholder (`contacto@apes.org.ar`).

---

© Asociación Civil APES · Concepción del Uruguay, Entre Ríos.
