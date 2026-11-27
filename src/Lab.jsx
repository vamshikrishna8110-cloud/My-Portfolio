import { useState } from 'react'
import { ArrowRight, ClipboardCheck, FileText, Search, Workflow } from 'lucide-react'
import { evaluateAnswer, extractAnswer, retrieve } from './lab-retrieval'

const documents = [
  { title: 'Access policy', body: 'Contractors request a sponsor and approval from the system owner before receiving access. Review contractor access every 90 days.' },
  { title: 'Incident response', body: 'For a suspected outage, record the affected service and time, then notify the on-call engineer. The incident lead owns escalation.' },
  { title: 'Release checklist', body: 'Before deployment, verify health checks, confirm the release owner and document the rollback plan. Review error rates after rollout.' },
  { title: 'Data retention', body: 'Keep synthetic lab logs for 30 days. Delete expired logs during the next scheduled cleanup.' },
]
const scenarios = {
  lookup: ['Classify as a guidance request', 'Search the sample knowledge base', 'Return a cited answer for review'],
  restricted: ['Classify as a restricted data request', 'Check the simulated authorization policy', 'Block the tool call and explain the decision'],
  change: ['Classify as a change request', 'Prepare a proposed action', 'Pause for human approval'],
}

function DocumentDemo() {
  const [document, setDocument] = useState(documents[0].body + '\n' + documents[2].body)
  const [question, setQuestion] = useState('When do we review vendor permissions?')
  const [answer, setAnswer] = useState(null)

  return (
    <article className="project lab-card">
      <span className="icon-box"><FileText size={23} /></span>
      <h3>RAG document Q&amp;A</h3>
      <p className="card-description">Local extractive demo. It retrieves and quotes a passage from your text. It makes no model calls.</p>
      <form className="lab-controls" onSubmit={event => {
        event.preventDefault()
        setAnswer(extractAnswer(question, document) ?? false)
      }}>
        <label className="field">Sample document<textarea rows={4} value={document} onChange={event => { setDocument(event.target.value); setAnswer(null) }} maxLength={6000} required /></label>
        <label className="field">Question<input value={question} onChange={event => { setQuestion(event.target.value); setAnswer(null) }} maxLength={250} required /></label>
        <button className="button secondary" type="submit">Find cited answer <ArrowRight size={16} /></button>
      </form>
      <div className="lab-result" aria-live="polite">
        {answer && <blockquote><cite>{answer.title}</cite><p>{answer.body}</p></blockquote>}
        {answer === false && <p>No supporting passage found in this document.</p>}
      </div>
    </article>
  )
}

const reference = 'Review contractor access every 90 days.'

function EvaluationDemo() {
  const [candidate, setCandidate] = useState(reference)
  const [metrics, setMetrics] = useState(null)
  const percent = value => Math.round(value * 100) + '%'

  return (
    <article className="project lab-card">
      <span className="icon-box"><ClipboardCheck size={23} /></span>
      <h3>LLM evaluation workbench</h3>
      <p className="card-description">Score an example output in your browser. These token-overlap metrics are proxies for quality and use no LLM judge.</p>
      <blockquote className="lab-result"><p>Test question: How often is contractor access reviewed?</p><p>Reference: {reference}</p></blockquote>
      <form className="lab-controls" onSubmit={event => {
        event.preventDefault()
        setMetrics(evaluateAnswer(candidate, reference, documents[0].body))
      }}>
        <label className="field">Candidate answer<textarea rows={3} value={candidate} onChange={event => { setCandidate(event.target.value); setMetrics(null) }} maxLength={1000} required /></label>
        <button className="button secondary" type="submit">Evaluate answer <ArrowRight size={16} /></button>
      </form>
      <div className="lab-result" aria-live="polite">
        {metrics && <dl className="recruiter-facts">
          <div><dt>Reference token F1</dt><dd>{percent(metrics.referenceF1)}</dd></div>
          <div><dt>Evidence token coverage</dt><dd>{percent(metrics.evidenceCoverage)}</dd></div>
          <div><dt>Local scoring time</dt><dd>{metrics.milliseconds.toFixed(2)} ms</dd></div>
        </dl>}
      </div>
    </article>
  )
}

export default function Lab() {
  const [query, setQuery] = useState('How do contractors request access?')
  const [semantic, setSemantic] = useState(true)
  const [results, setResults] = useState(null)
  const [scenario, setScenario] = useState('lookup')
  const [step, setStep] = useState(0)
  const steps = scenarios[scenario]

  function search(event) {
    event.preventDefault()
    setResults(retrieve(query, documents, { semantic }))
  }

  return (
    <section className="shell section" id="lab" aria-labelledby="lab-title">
      <div className="section-heading">
        <p className="eyebrow">Interactive demos</p>
        <h2 id="lab-title">AI Lab</h2>
        <p className="section-description">Explore retrieval, document Q&A, agent workflows, and answer evaluation with synthetic data. All examples run locally and require no credentials.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="project lab-card">
          <span className="icon-box"><Search size={23} /></span>
          <h3>Semantic search with citations</h3>
          <p className="card-description">Compare exact keywords with synonym-aware concept matching on a small sample corpus. The semantic mode uses a curated vocabulary.</p>
          <form className="lab-controls" onSubmit={search}>
            <label className="field">Search the sample policies<input value={query} onChange={event => { setQuery(event.target.value); setResults(null) }} maxLength={160} required /></label>
            <label className="lab-option"><input type="checkbox" checked={semantic} onChange={event => { setSemantic(event.target.checked); setResults(null) }} /> Match related concepts</label>
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
          <p className="card-description">Run scripted scenarios for retrieval, authorization, and human review. The simulator executes no real tools.</p>
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
        <DocumentDemo />
        <EvaluationDemo />
      </div>
    </section>
  )
}
