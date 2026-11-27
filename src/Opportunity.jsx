import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { person } from './content'

const defaultEndpoint = 'https://formspree.io/f/mbgoejnw'
const configuredEndpoint = import.meta.env.VITE_OPPORTUNITY_ENDPOINT || defaultEndpoint
const isHosted = location.protocol === 'https:' || location.protocol === 'http:'
const endpoint = isHosted && /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(configuredEndpoint) ? configuredEndpoint : ''
const fields = [
  { name: 'name', label: 'Recruiter / vendor name', required: true, autoComplete: 'name' },
  { name: 'company', label: 'Company / staffing agency', required: true, autoComplete: 'organization' },
  { name: 'email', label: 'Business email', required: true, type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Contact phone', required: true, type: 'tel', autoComplete: 'tel' },
  { name: 'role', label: 'Job title / role', required: true },
  { name: 'client', label: 'Client name' },
  { name: 'location', label: 'Location' },
  { name: 'arrangement', label: 'Work arrangement', options: ['Not specified', 'Remote', 'Hybrid', 'Onsite'] },
  { name: 'engagement', label: 'Engagement type', options: ['Not specified', 'C2C', '1099', 'W2', 'C2H', 'Full-time', 'Other'] },
  { name: 'compensation', label: 'Rate / salary and duration' },
  { name: 'posting', label: 'Job posting link', type: 'url', wide: true },
  { name: 'description', label: 'Job description', required: true, multiline: true, wide: true },
]

function Field({ field }) {
  const { name, label, required, type = 'text', autoComplete, options, multiline, wide } = field
  return (
    <label className={wide ? 'field field-wide' : 'field'}>
      <span>{label}{required && <span aria-hidden="true"> *</span>}</span>
      {options ? (
        <select name={name}>{options.map(option => <option key={option}>{option}</option>)}</select>
      ) : multiline ? (
        <textarea name={name} required={required} rows={5} maxLength={6000} />
      ) : (
        <input name={name} type={type} required={required} autoComplete={autoComplete} maxLength={type === 'url' ? 2048 : 254} />
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
        <p className="form-note">Fields marked * are required.</p>
        <fieldset className="form-grid" disabled={!endpoint || status === 'sending'}>
          <legend className="sr-only">Opportunity details</legend>
          {fields.map(field => <Field key={field.name} field={field} />)}
          <input className="hidden" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label className="consent field-wide"><input type="checkbox" name="consent" value="yes" required /> <span>I agree to be contacted about this opportunity. <span aria-hidden="true">*</span></span></label>
          <button className="button primary field-wide form-submit" type="submit">{status === 'sending' ? 'Submitting…' : 'Submit Job Opportunity'} <ArrowUpRight size={17} /></button>
        </fieldset>
        <p className="form-feedback" role="status">{status === 'success' && 'Thank you for sharing this opportunity. Your details have been submitted successfully.'}</p>
        {status === 'error' && <p className="form-error" role="alert">Submission could not be confirmed. Your entries are still here. Please try again or contact me by email.</p>}
      </form>
    </section>
  )
}
