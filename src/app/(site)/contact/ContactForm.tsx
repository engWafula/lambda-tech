'use client'

import { useActionState } from 'react'
import { submitContact, type ContactState } from './actions'

export function ContactForm({ services }: { services: string[] }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { status: 'idle' })
  const f = state.fields ?? {}

  if (state.status === 'ok') {
    return (
      <div className="notice" role="status">
        <h2>Thanks, message received.</h2>
        <p>A senior consultant will reply within one working day.</p>
      </div>
    )
  }

  return (
    <form action={action} className="form" noValidate={false}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required autoComplete="name" defaultValue={f.name} />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" defaultValue={f.email} />
      </div>
      <div className="field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" autoComplete="organization" defaultValue={f.company} />
      </div>
      <div className="field">
        <label htmlFor="service">Interested in</label>
        <select id="service" name="service" defaultValue={f.service ?? ''}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="message">What are you working on?</label>
        <textarea id="message" name="message" required minLength={10} defaultValue={f.message} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="full" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <button type="submit" className="btn btn-accent" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'} <span aria-hidden="true">→</span>
        </button>
        {state.status === 'error' && (
          <p className="form-status err" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}
