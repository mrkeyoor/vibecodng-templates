import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Ratings from './components/Ratings.jsx'
import Features from './components/Features.jsx'
import Flow from './components/Flow.jsx'
import Stats from './components/Stats.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden text-ink">
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop-caustic" />
      </div>
      <RevealController />
      <Navbar />
      <main>
        <Hero />
        <Ratings />
        <Features />
        <Flow />
        <Stats />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
