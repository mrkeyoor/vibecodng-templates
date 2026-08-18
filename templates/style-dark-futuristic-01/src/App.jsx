import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Detections from './components/Detections.jsx'
import Stats from './components/Stats.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-white">
      <RevealController />
      <div className="scanlines" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Detections />
        <Stats />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
