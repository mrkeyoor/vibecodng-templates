import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LogoStrip from './components/LogoStrip.jsx'
import Features from './components/Features.jsx'
import Stats from './components/Stats.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonials from './components/Testimonials.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop-band" />
        <div className="backdrop-band-2" />
        <div className="backdrop-grid" />
      </div>
      <RevealController />
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <Stats />
        <Pricing />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
