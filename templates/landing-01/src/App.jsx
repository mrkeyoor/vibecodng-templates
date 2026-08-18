import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LogoWall from './components/LogoWall.jsx'
import FeatureGrid from './components/FeatureGrid.jsx'
import Stats from './components/Stats.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonials from './components/Testimonials.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-white">
      <RevealController />
      <Navbar />
      <main>
        <Hero />
        <LogoWall />
        <FeatureGrid />
        <Stats />
        <Pricing />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
