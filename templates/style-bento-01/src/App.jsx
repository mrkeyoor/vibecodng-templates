import { RevealController } from './components/Effects.jsx'
import Header from './components/Header.jsx'
import { HeroCard, ActivityCard } from './components/Hero.jsx'
import ProgressCard from './components/ProgressCard.jsx'
import PresenceCard from './components/PresenceCard.jsx'
import DocsCard from './components/DocsCard.jsx'
import Features from './components/Features.jsx'
import { StatsCard, TestimonialCard } from './components/Social.jsx'
import { IntegrationsCard, PricingCards } from './components/Plans.jsx'
import { CtaCard, SetupCard, FooterCard } from './components/CtaFooter.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <RevealController />
      <div className="bento-shell">
        <main className="bento">
          <Header />
          <HeroCard />
          <ActivityCard />
          <ProgressCard />
          <PresenceCard />
          <DocsCard />
          <Features />
          <StatsCard />
          <TestimonialCard />
          <IntegrationsCard />
          <PricingCards />
          <CtaCard />
          <SetupCard />
          <FooterCard />
        </main>
      </div>
    </div>
  )
}
