import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Showcase from './components/Showcase.jsx'
import Stats from './components/Stats.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonials from './components/Testimonials.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden text-ink">
      <div className="sky" aria-hidden="true" />
      <RevealController />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Stats />
        <Pricing />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
