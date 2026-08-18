import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Garden from './components/Garden.jsx'
import Pricing from './components/Pricing.jsx'
import Parents from './components/Parents.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden text-ink">
      <RevealController />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Garden />
        <Pricing />
        <Parents />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
