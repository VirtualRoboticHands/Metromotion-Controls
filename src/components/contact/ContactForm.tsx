'use client'

import { FormEvent, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  service: string
  message: string
}

const initialForm: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

const serviceOptions = [
  'PLC Programming',
  'SCADA & HMI Development',
  'Control Panel Engineering',
  'IIoT & Industrial Data',
  'OT Networking',
  'Functional Safety',
  'Commissioning & Support',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hasRequiredFields = useMemo(
    () =>
      Boolean(
        form.name.trim() &&
          form.company.trim() &&
          form.email.trim() &&
          form.service.trim() &&
          form.message.trim()
      ),
    [form]
  )

  const validate = () => {
    if (!hasRequiredFields) {
      return 'Please complete all required fields.'
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(form.email.trim())) {
      return 'Please enter a valid email address.'
    }

    return ''
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    const validationError = validate()
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setSubmitting(true)

    try {
      const { error } = await supabase.from('enquiries').insert({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        service: form.service,
        message: form.message.trim(),
        status: 'new',
      })

      if (error) {
        throw new Error('Something went wrong while sending your enquiry.')
      }

      setForm(initialForm)
      setSuccessMessage("Thanks for reaching out. We'll get back to you within one business day.")
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to send your enquiry right now. Please try again shortly.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid var(--border2)',
    background: 'var(--white)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--ink)',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'var(--muted)',
    fontWeight: 500,
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }} noValidate>
      <div>
        <label htmlFor="full-name" style={labelStyle}>
          Full Name *
        </label>
        <input
          id="full-name"
          type="text"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          style={inputStyle}
          className="contact-input"
        />
      </div>

      <div>
        <label htmlFor="company-name" style={labelStyle}>
          Company Name *
        </label>
        <input
          id="company-name"
          type="text"
          required
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
          style={inputStyle}
          className="contact-input"
        />
      </div>

      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            style={inputStyle}
            className="contact-input"
          />
        </div>

        <div>
          <label htmlFor="phone" style={labelStyle}>
            Phone (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            style={inputStyle}
            className="contact-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" style={labelStyle}>
          How Can We Help? *
        </label>
        <select
          id="service"
          required
          value={form.service}
          onChange={(event) => setForm({ ...form, service: event.target.value })}
          style={{ ...inputStyle, appearance: 'none' as const, cursor: 'pointer' }}
          className="contact-input"
        >
          <option value="">Select a service...</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          style={{ ...inputStyle, resize: 'vertical' as const }}
          className="contact-input"
        />
      </div>

      <button
        type="submit"
        className="contact-submit-btn"
        disabled={submitting}
        style={{
          alignSelf: 'flex-start',
          border: 'none',
          background: 'var(--red)',
          color: 'var(--white)',
          padding: '14px 26px',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          cursor: submitting ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          opacity: submitting ? 0.85 : 1,
        }}
      >
        {submitting && <span className="contact-spinner" aria-hidden="true" />}
        {submitting ? 'Sending...' : 'Send Enquiry'}
      </button>

      {successMessage ? <p style={{ color: '#2d6a4f', fontSize: '14px' }}>{successMessage}</p> : null}
      {errorMessage ? <p style={{ color: 'var(--red)', fontSize: '14px' }}>{errorMessage}</p> : null}
    </form>
  )
}
