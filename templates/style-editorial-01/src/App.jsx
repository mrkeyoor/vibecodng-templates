import { RevealController } from './components/Effects.jsx'
import Masthead from './components/Masthead.jsx'
import Hero from './components/Hero.jsx'
import Instrument from './components/Instrument.jsx'
import Essays from './components/Essays.jsx'
import PullQuote from './components/PullQuote.jsx'
import Circulation from './components/Circulation.jsx'
import Subscriptions from './components/Subscriptions.jsx'
import Queries from './components/Queries.jsx'
import Cta from './components/Cta.jsx'
import Colophon from './components/Colophon.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <RevealController />
      <Masthead />
      <main>
        <Hero />
        <Instrument />
        <Essays />
        <PullQuote />
        <Circulation />
        <Subscriptions />
        <Queries />
        <Cta />
      </main>
      <Colophon />
    </div>
  )
}
