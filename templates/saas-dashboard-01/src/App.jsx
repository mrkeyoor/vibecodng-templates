import { useState } from 'react'

const tasks = [
  ['Review enterprise renewal', 'Revenue', 'Today', 'Maya Chen'],
  ['Approve Q3 hiring plan', 'People', 'Tomorrow', 'Jon Bell'],
  ['Ship usage-based billing', 'Product', 'Fri', 'Ari Singh'],
  ['Resolve onboarding drop-off', 'Growth', 'Mon', 'Nina Park'],
]
const activity = [
  ['MC', 'Maya closed the Acme renewal', '+$48k ARR', '12m'],
  ['AS', 'Ari shipped metered billing', 'Production', '42m'],
  ['NP', 'Nina shared activation research', '14 insights', '2h'],
]

export default function App() {
  const [range, setRange] = useState('30 days')
  const [done, setDone] = useState(new Set([3]))
  const toggle = (index) => setDone((current) => { const next = new Set(current); next.has(index) ? next.delete(index) : next.add(index); return next })
  return <div className="app dashboard-app">
    <aside className="rail" aria-label="Workspace navigation">
      <a className="brand" href="#overview" aria-label="Northstar dashboard home"><span>N</span><b>northstar</b></a>
      <nav>{['Overview','Revenue','Customers','Projects','Team'].map((item, index) => <a className={index === 0 ? 'active' : ''} href={'#' + item.toLowerCase()} key={item}><i>{['⌂','↗','◎','◇','♙'][index]}</i>{item}</a>)}</nav>
      <div className="rail-foot"><button type="button"><span className="avatar">KM</span><span><b>Keyoor Mehta</b><small>Owner</small></span></button></div>
    </aside>
    <main id="overview" className="workspace">
      <header className="workspace-head"><div><p className="eyebrow">Monday · Operations pulse</p><h1>Good morning, Keyoor.</h1><p>Here is what changed across your company since Friday.</p></div><div className="head-actions"><button className="ghost" type="button" aria-label="Open notifications">⌁ <span className="sr-only">Notifications</span></button><button className="button" type="button">Create report</button></div></header>
      <section aria-labelledby="metrics-title"><div className="section-head"><div><p className="label">Company health</p><h2 id="metrics-title">The numbers that move the week</h2></div><div className="segmented" aria-label="Metric date range">{['7 days','30 days','Quarter'].map(item => <button type="button" aria-pressed={range === item} onClick={() => setRange(item)} key={item}>{item}</button>)}</div></div>
        <div className="metric-grid">{[['Annual recurring revenue','$2.84M','+12.4%'],['Net revenue retention','118%','+2.1%'],['Active accounts','1,284','+68'],['Runway','26 mo','Stable']].map(([label,value,delta], index) => <article className={index === 0 ? 'metric featured' : 'metric'} key={label}><span>{label}</span><strong>{value}</strong><small>{delta} · {range}</small></article>)}</div>
      </section>
      <div className="dashboard-grid">
        <section className="panel chart-panel" aria-labelledby="revenue-title"><div className="panel-head"><div><p className="label">Revenue velocity</p><h2 id="revenue-title">$428,900 this month</h2></div><span className="positive">+18.2%</span></div><div className="chart" role="img" aria-label="Revenue rises from 42 to 91 thousand dollars over twelve weeks">{[42,46,44,52,57,61,58,69,72,78,84,91].map((height,index)=><i style={{height: height + '%'}} key={index}><span>W{index+1}</span></i>)}</div></section>
        <aside className="panel health" aria-labelledby="health-title"><p className="label">Project health</p><h2 id="health-title">3 need attention</h2>{[['Billing migration',82],['Mobile onboarding',64],['Data residency',47]].map(([name,value])=><div className="progress" key={name}><span><b>{name}</b><small>{value}%</small></span><i><b style={{width:value+'%'}} /></i></div>)}<a href="#projects">Open project board →</a></aside>
      </div>
      <div className="dashboard-grid lower">
        <section className="panel tasks" aria-labelledby="tasks-title"><div className="panel-head"><div><p className="label">Focus queue</p><h2 id="tasks-title">Decisions waiting on you</h2></div><span>{tasks.length - done.size} open</span></div><div className="task-list">{tasks.map((task,index)=><label className={done.has(index)?'complete':''} key={task[0]}><input type="checkbox" checked={done.has(index)} onChange={()=>toggle(index)} /><span><b>{task[0]}</b><small>{task[1]} · {task[2]}</small></span><i>{task[3]}</i></label>)}</div></section>
        <aside className="panel activity" aria-labelledby="activity-title"><p className="label">Live activity</p><h2 id="activity-title">Team momentum</h2>{activity.map(([initials,event,result,time])=><article key={event}><span className="avatar">{initials}</span><p><b>{event}</b><small>{result} · {time}</small></p></article>)}</aside>
      </div>
    </main>
  </div>
}
