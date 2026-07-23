import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Mensaje } from './components/sections/Mensaje'
import { Objetivos } from './components/sections/Objetivos'
import { Obras } from './components/sections/Obras'
import { Lugar } from './components/sections/Lugar'
import { Contacto } from './components/sections/Contacto'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Mensaje />
        <Objetivos />
        <Obras />
        <Lugar />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}

export default App
