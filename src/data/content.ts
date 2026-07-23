// -----------------------------------------------------------------------------
// Contenido de la Asociación Civil APES (Concepción del Uruguay, Entre Ríos).
// Los textos se basan en el Estatuto de la Asociación y en actividades reales
// del ciclo "Personas que Inspiran". Fuente única de verdad, tipada.
// -----------------------------------------------------------------------------

import personasImg from '../assets/obras/personas-que-inspiran.jpg'

export const ORG = {
  name: 'Asociación Civil APES',
  shortName: 'APES',
  kicker: 'Asociación Civil',
  brand: 'APES',
  city: 'Concepción del Uruguay',
  province: 'Entre Ríos',
  country: 'Argentina',
  cp: '3260',
  founded: 2025,
  tagline: 'Filantropía · Igualdad · Progreso',
  motto: 'Un espacio transformador, igualitario y diverso, al servicio del progreso de la comunidad.',
  // Como la colmena: el esfuerzo de cada persona cobra sentido en el trabajo colectivo.
  beeLine: 'Como la colmena, construimos en comunidad.',
  // Redes sociales (dejar la URL vacía deshabilita el ícono).
  social: {
    instagram: '',
    facebook: '',
  },
}

export type NavItem = { id: string; label: string; align?: 'left' | 'right' }

export const NAV: NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'quienes', label: 'Quiénes somos' },
  { id: 'objetivos', label: 'Objetivos' },
  { id: 'obras', label: 'Nuestras obras' },
  { id: 'ubicacion', label: 'Ubicación', align: 'right' },
  { id: 'contacto', label: 'Contacto', align: 'right' },
]

// --- Quiénes somos (Estatuto, Art. 1) ---------------------------------------
export const QUIENES = {
  eyebrow: 'Quiénes somos',
  title: 'Personas libres, unidas por la filantropía',
  lead: 'Somos personas libres y de buenas costumbres, reunidas bajo la premisa de la filantropía y comprometidas con la generación de un espacio transformador.',
  paragraphs: [
    'La Asociación Civil APES reúne a personas comprometidas en la construcción de un espacio transformador, igualitario, amplio y diverso, libre de dogmas y fanatismos. Trabajamos sin fines de lucro para aportar, desde nuestro lugar, al bien común.',
    'Somos un espacio inclusivo, sin distinción de géneros, ideologías políticas ni orientaciones religiosas: profundamente fraterno y consustanciado con el progreso de la humanidad en sus dimensiones económica, social y ambiental.',
    'Con domicilio en Concepción del Uruguay, Entre Ríos, llevamos nuestras actividades a distintas localidades de la región, en espacios comunitarios y bibliotecas abiertas a todos.',
  ],
  porque: {
    title: '¿Por qué APES?',
    text: 'APES es el plural de «apis», la palabra latina para «abeja». Nos reconocemos en la colmena: un colectivo donde el trabajo de cada quien —discreto, constante, coordinado— sostiene algo más grande que la suma de sus partes. Como las abejas construyen su hogar celda a celda y hacen florecer todo lo que las rodea, buscamos que cada aporte individual dé fruto en la comunidad.',
  },
  values: [
    { title: 'Filantropía', text: 'La ayuda social y el compromiso con la comunidad como práctica cotidiana.' },
    { title: 'Diversidad', text: 'Un espacio inclusivo, sin distinción de géneros, ideologías ni credos.' },
    { title: 'Progreso', text: 'El desarrollo económico, social y ambiental de las personas y su entorno.' },
  ],
}

// --- Objetivos (Estatuto, Art. 3: objeto y fines) ---------------------------
export type Objetivo = { icon: string; title: string; text: string }

export const OBJETIVOS: { eyebrow: string; title: string; lead: string; items: Objetivo[] } = {
  eyebrow: 'Nuestro objeto y fines',
  title: 'Para qué existimos',
  lead: 'El Estatuto de APES define un objeto amplio, orientado al progreso social dentro de un concepto más pleno de libertad.',
  items: [
    { icon: 'sparkles', title: 'Prosperidad y progreso social', text: 'Lograr la prosperidad y el progreso social dentro de un concepto más amplio de libertad.' },
    { icon: 'heart-handshake', title: 'Ayuda social', text: 'Desarrollar actividades filantrópicas y de ayuda frente a la pobreza y el hambre.' },
    { icon: 'graduation-cap', title: 'Educación y ciencia', text: 'Promover actividades científicas, educativas y de extensión universitaria para todos.' },
    { icon: 'heart-pulse', title: 'Bienestar y vida sana', text: 'Garantizar una vida sana y promover el bienestar de las personas a todas las edades.' },
    { icon: 'users', title: 'Desarrollo integral', text: 'Impulsar el mejoramiento moral, intelectual, físico y social de la comunidad.' },
    { icon: 'landmark', title: 'Patrimonio regional', text: 'Promover y preservar el patrimonio histórico y cultural de la ciudad y la región.' },
    { icon: 'sprout', title: 'Ambiente sano', text: 'Actuar en defensa de un ambiente sano y en la protección frente al cambio climático.' },
    { icon: 'globe', title: 'Cooperación y difusión', text: 'Difundir el conocimiento y tejer redes con entidades afines para sociedades pacíficas e inclusivas.' },
  ],
}

// --- Nuestras obras (carrusel de tarjetas) ----------------------------------
// `url` presente => tarjeta clicable con "Ir al artículo". `image` opcional:
// si falta, se muestra un encabezado de marca con el ícono indicado.
export type Obra = {
  tag: string
  title: string
  excerpt: string
  meta?: string
  source?: string
  url?: string
  image?: string
  icon?: string
}

export const OBRAS: { eyebrow: string; title: string; lead: string; items: Obra[] } = {
  eyebrow: 'Lo que hacemos',
  title: 'Nuestras obras',
  lead: 'Actividades concretas que llevan nuestros objetivos a la comunidad de Concepción del Uruguay y la región.',
  items: [
    {
      tag: 'Personas que Inspiran',
      title: 'Un ciclo de historias que inspiran',
      excerpt:
        'Encuentros abiertos donde vecinas y vecinos comparten sus recorridos de esfuerzo y formación. En Basavilbaso disertaron Rocío Cocaro (modelo de simulación de la ONU, Mercosur–UE) y el Lic. Ezequiel Baus (presidente de la Fundación Benet).',
      meta: 'Biblioteca Lucienville, Basavilbaso · 24 abr 2026',
      source: 'Periodismo Basavilbaso',
      url: 'https://periodismobasavilbaso.com/personas-que-inspiran/',
      image: personasImg,
    },
    {
      tag: 'Cultura',
      title: 'Biblioteca a cielo abierto',
      excerpt:
        'Llevamos los libros al espacio público: una biblioteca abierta donde cualquier persona puede tomar y dejar un libro, para que la lectura circule libremente por la ciudad.',
      meta: 'Concepción del Uruguay',
      icon: 'library',
    },
    {
      tag: 'Educación',
      title: 'Educación y conocimiento',
      excerpt:
        'Charlas, cursos y actividades de extensión que abren oportunidades de aprendizaje para todas las edades.',
      icon: 'graduation-cap',
    },
    {
      tag: 'Ambiente',
      title: 'Ambiente y comunidad',
      excerpt:
        'Acciones de concientización en defensa de un ambiente sano y de protección frente al cambio climático.',
      icon: 'sprout',
    },
    {
      tag: 'Patrimonio',
      title: 'Patrimonio regional',
      excerpt:
        'Promoción y preservación del patrimonio histórico y cultural de nuestra ciudad y su entorno.',
      icon: 'landmark',
    },
  ],
}

// --- Ubicación --------------------------------------------------------------
// Mapa centrado en la ciudad SIN marcador (usa ll= en vez de q=).
const MAP_CENTER = '-32.4846,-58.2306'

export const UBICACION = {
  eyebrow: 'Dónde estamos',
  title: 'Ubicación',
  mapSrc: `https://maps.google.com/maps?ll=${MAP_CENTER}&z=13&output=embed`,
  sede: {
    title: 'Sede en formación',
    subtitle: 'Concepción del Uruguay · Entre Ríos',
    text: 'La Asociación Civil APES tiene su domicilio en la ciudad de Concepción del Uruguay (CP 3260). Aún no contamos con una sede física propia: nos reunimos en centros sociales y culturales públicos, bibliotecas e instituciones aliadas de la ciudad y la región.',
    detail: 'Concepción del Uruguay, Entre Ríos (CP 3260)',
  },
  filial: {
    title: 'Filial Basavilbaso',
    text: 'A poco más de 60 kilómetros de la casa madre, un grupo de personas impulsa y sostiene el trabajo de APES en Basavilbaso. Desde allí se promueven iniciativas culturales, educativas y comunitarias, abiertas a la participación y orientadas al crecimiento colectivo.\n\nBasavilbaso es la primera colmena que zumba fuera del panal original, una muestra de que las buenas ideas, como las abejas, no entienden de fronteras.',
  },
}

// --- Contacto ---------------------------------------------------------------
export const CONTACTO = {
  eyebrow: 'Comunicate',
  title: 'Contacto',
  lead: 'Si querés conocer más sobre la Asociación o proponer una actividad, escribinos. Responderemos tus inquietudes a la brevedad.',
  email: 'contacto@apes.org.ar',
  quote: 'Personas libres y de buenas costumbres, comprometidas con el progreso de la comunidad.',
}
