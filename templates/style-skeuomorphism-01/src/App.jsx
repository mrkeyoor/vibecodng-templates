import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Pedals from './components/Pedals.jsx'
import Room from './components/Room.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import { RevealController } from './components/Effects.jsx'
import { NoiseTexture } from './components/Skeuo.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-ink">
      {/* Source slug: magicui-noise-texture, used as the global tolex grain
          (https://github.com/magicuidesign/magicui) */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <NoiseTexture className="opacity-25" frequency={0.55} noiseOpacity={0.4} />
      </div>
      <div className="relative z-10">
        <RevealController />
        <Navbar />
        <main>
          <Hero />
          <Pedals />
          <Room />
          <Pricing />
          <Faq />
          <Cta />
        </main>
        <Footer />
      </div>
    </div>
  )
}
