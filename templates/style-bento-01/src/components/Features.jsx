// First-party feature cards.

import { Card } from './Effects.jsx'

function Glyph({ children }) {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        {children}
      </svg>
    </span>
  )
}

const features = [
  {
    title: 'Threads that end',
    body: 'Every thread has an owner and an outcome. When it resolves, Hub writes the decision at the top and files it where the next person will look.',
    glyph: <><path d="M3.5 5.5h15M3.5 11h9" /><path d="M13.5 15.5l2.5 2.5 4-5" /></>,
  },
  {
    title: 'Docs where you talk',
    body: 'Documents live inside the conversation that produced them. Edit together, quote a paragraph into the thread, done. No app switch, no export.',
    glyph: <><rect x="4" y="2.5" width="14" height="17" rx="2" /><path d="M7.5 7h7M7.5 10.5h7M7.5 14h4" /></>,
  },
  {
    title: 'Meetings become notes',
    body: 'Paste a meeting in, get owners and next steps out. The follow-ups become threads automatically, each with a name attached and a date it will nag.',
    glyph: <><circle cx="11" cy="11" r="8.5" /><path d="M11 6.5V11l3 2.5" /></>,
  },
]

export default function Features() {
  return (
    <>
      {features.map((feature, index) => (
        <Card key={feature.title} span="b4" order={index} id={index === 0 ? 'workspace' : undefined} className="flex flex-col gap-4">
          <Glyph>{feature.glyph}</Glyph>
          <h2 className="card-title m-0">{feature.title}</h2>
          <p className="m-0 text-sm leading-6 text-mist">{feature.body}</p>
        </Card>
      ))}
    </>
  )
}
