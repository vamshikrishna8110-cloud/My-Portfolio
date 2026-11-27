import { useState } from 'react'
import { ArrowRight, Search, Workflow } from 'lucide-react'

const documents = [
  { title: 'Access policy', body: 'Contractors request a sponsor and approval from the system owner before receiving access. Review contractor access every 90 days.' },
  { title: 'Incident response', body: 'For a suspected outage, record the affected service and time, then notify the on-call engineer. The incident lead owns escalation.' },
  { title: 'Release checklist', body: 'Before deployment, verify health checks, confirm the release owner and document the rollback plan. Review error rates after rollout.' },
  { title: 'Data retention', body: 'Keep synthetic lab logs for 30 days. Delete expired logs during the next scheduled cleanup.' },
]
const stopWords = new Set(['a', 'an', 'are', 'do', 'for', 'how', 'i', 'in', 'is', 'the', 'to', 'what', 'who'])
const words = text => [...new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? [])]

const scenarios = {
  lookup: ['Classify as a guidance request', 'Search the sample knowledge base', 'Return a cited answer for review'],
  restricted: ['Classify as a restricted data request', 'Check the simulated authorization policy', 'Block the tool call and explain the decision'],
  change: ['Classify as a change request', 'Prepare a proposed action', 'Pause for human approval'],
}

export default function Lab() {
  const [query, setQuery] = useState('How do contractors request access?')
  const [results, setResults] = useState(null)
  const [scenario, setScenario] = useState('lookup')
  const [step, setStep] = useState(0)
  const steps = scenarios[scenario]

  function search(event) {
    event.preventDefault()
    const terms = words(query).filter(word => !stopWords.has(word))
    setResults(documents.map(doc => {
      const tokens = words(doc.title + ' ' + doc.body)
      return { ...doc, score: terms.filter(term => tokens.includes(term)).length }
    }).filter(doc => doc.score > 0).sort((a, b) => b.score - a.score))
  }

  return (
    <section className="shell section" id="lab" aria-labelledby="lab-title">
      <div className="section-heading">
        <p className="eyebrow">Interactive demos</p>
        <h2 id="lab-title">AI Lab</h2>
        <p className="section-description">Explore retrieval and agent routing with synthetic data. Both demos run locally in your browser.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="project lab-card">
          <span className="icon-box"><Search size={23} /></span>
          <h3>Search with citations</h3>
          <p className="card-description">Rank sample policies by matching keywords and inspect the original source.</p>
          <form className="lab-controls" onSubmit={search}>
            <label className="field">Search the sample policies<input value={query} onChange={event => setQuery(event.target.value)} maxLength={160} required /></label>
            <button className="button secondary" type="submit">Search documents <ArrowRight size={16} /></button>
          </form>
          <div aria-live="polite" className="lab-result">
            {results?.length === 0 && <p>No matching sources. Try “rollback” or “contractor access”.</p>}
            {results?.map(doc => <blockquote key={doc.title}><cite>{doc.title}</cite><p>{doc.body}</p></blockquote>)}
          </div>
        </article>
        <article className="project lab-card">
          <span className="icon-box"><Workflow size={23} /></span>
          <h3>Agent routing simulator</h3>
          <p className="card-description">Step through how a simulated agent handles retrieval, authorization, and human review.</p>
          <div className="lab-controls">
            <label className="field">Scenario
              <select value={scenario} onChange={event => { setScenario(event.target.value); setStep(0) }}>
                <option value="lookup">Find published guidance</option>
                <option value="restricted">Request restricted data</option>
                <option value="change">Propose a system change</option>
              </select>
            </label>
            <button type="button" className="button secondary" onClick={() => setStep(step === steps.length ? 0 : step + 1)}>{step === steps.length ? 'Reset simulation' : 'Run next step'} <ArrowRight size={16} /></button>
          </div>
          <ol aria-live="polite" className="lab-result route-steps">{steps.slice(0, step).map(item => <li key={item}>{item}</li>)}</ol>
        </article>
      </div>
    </section>
  )
}
