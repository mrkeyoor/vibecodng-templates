import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LogoStrip from './components/LogoStrip.jsx'
import Features from './components/Features.jsx'
import Showcase from './components/Showcase.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonials from './components/Testimonials.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      <div className="aurora-field" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
        <div className="aurora-grain" />
      </div>
      <RevealController />
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <Showcase />
        <Pricing />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
