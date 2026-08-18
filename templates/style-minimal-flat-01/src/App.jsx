import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LogoRow from './components/LogoRow.jsx'
import Features from './components/Features.jsx'
import Stats from './components/Stats.jsx'
import Pricing from './components/Pricing.jsx'
import Testimonial from './components/Testimonial.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <LogoRow />
        <Features />
        <Stats />
        <Pricing />
        <Testimonial />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
