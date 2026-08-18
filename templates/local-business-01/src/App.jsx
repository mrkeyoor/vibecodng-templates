import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Gallery from './components/Gallery.jsx'
import Testimonials from './components/Testimonials.jsx'
import Visit from './components/Visit.jsx'
import BookingCta from './components/BookingCta.jsx'
import Footer from './components/Footer.jsx'
import RevealController from './components/RevealController.jsx'

export default function App() {
  return <div className="min-h-screen overflow-x-hidden bg-surface text-ink"><RevealController /><Header /><main><Hero /><Services /><Gallery /><Testimonials /><Visit /><BookingCta /></main><Footer /></div>
}
