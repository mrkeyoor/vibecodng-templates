import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import AssetShelf from './components/AssetShelf.jsx'
import Features from './components/Features.jsx'
import Showcase from './components/Showcase.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonials from './components/Testimonials.jsx'
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
        <AssetShelf />
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
