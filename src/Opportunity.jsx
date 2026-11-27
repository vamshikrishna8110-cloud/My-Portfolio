import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { person } from './content'

const defaultEndpoint = 'https://formspree.io/f/mbgoejnw'
const configuredEndpoint = import.meta.env.VITE_OPPORTUNITY_ENDPOINT || defaultEndpoint
const isHosted = location.protocol === 'https:' || location.protocol === 'http:'
const endpoint = isHosted && /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(configuredEndpoint) ? configuredEndpoint : ''
const fields = [
  { name: 'name', label: 'Name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'role', label: 'Position' },
  { name: 'phone', label: 'Contact number', type: 'tel', autoComplete: 'tel' },
  { name: 'description', label: 'Description', multiline: true },
]

function Field({ field }) {
  const { name, label, type = 'text', autoComplete, multiline } = field
  return (
    <label className={multiline ? 'field field-wide' : 'field'}>
      <span>{label}</span>
      {multiline ? (
        <textarea name={name} required rows={5} maxLength={6000} />
      ) : (
        <input name={name} type={type} required autoComplete={autoComplete} maxLength={254} />
      )}
    </label>
  )
}

export default function Opportunity() {
  const pending = useRef(false)
  const [status, setStatus] = useState('idle')

  async function submit(event) {
    event.preventDefault()
    if (!endpoint || pending.current) return
    const form = event.currentTarget
    pending.current = true
    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Form submission was rejected.')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      pending.current = false
    }
  }

  return (
    <section className="shell section section-columns" id="opportunity" aria-labelledby="opportunity-title">
      <div className="section-heading">
        <p className="eyebrow">Recruiters & vendors</p>
        <h2 id="opportunity-title">Have an opportunity for me?</h2>
        <p className="section-description">Share your role details and I will get back to you.</p>
        <p className="section-description">Formspree processes submissions so I can respond about your role. Please share business contact details only. For retention or deletion questions, <a className="text-link" href={'mailto:' + person.email}>contact me by email</a>.</p>
        {!endpoint && <p className="section-description">Online submissions are currently unavailable. <a className="text-link" href={'mailto:' + person.email}>Email me about the opportunity</a>.</p>}
      </div>
      <form className="opportunity-form" action={endpoint || undefined} method="post" onSubmit={submit} aria-label="Job opportunity" aria-busy={status === 'sending'}>
        <p className="form-note">All fields are required.</p>
        <fieldset className="form-grid" disabled={!endpoint || status === 'sending'}>
          <legend className="sr-only">Opportunity details</legend>
          {fields.map(field => <Field key={field.name} field={field} />)}
          <input className="hidden" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="button primary field-wide form-submit" type="submit">{status === 'sending' ? 'Submitting…' : 'Submit Job Opportunity'} <ArrowUpRight size={17} /></button>
        </fieldset>
        <p className="form-feedback" role="status">{status === 'success' && 'Thank you for sharing this opportunity. Your details have been submitted successfully.'}</p>
        {status === 'error' && <p className="form-error" role="alert">Submission could not be confirmed. Your entries are still here. Please try again or contact me by email.</p>}
      </form>
    </section>
  )
}
