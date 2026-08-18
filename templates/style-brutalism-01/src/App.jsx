import Navbar from './components/Navbar.jsx'
import Ticker from './components/Ticker.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Benchmarks from './components/Benchmarks.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface text-ink">
      <RevealController />
      <Navbar />
      <main>
        <Ticker />
        <Hero />
        <Features />
        <Benchmarks />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
