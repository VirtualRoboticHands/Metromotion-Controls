'use client'

import { FormEvent, useMemo, useState } from 'react'

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          service: form.service,
          message: form.message.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong while sending your enquiry.')
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

  const inputClass = "w-full px-4 py-[14px] border border-border2 bg-white font-sans text-[14px] text-ink outline-none contact-input"
  const labelClass = "block mb-2 text-[11px] tracking-[0.08em] uppercase text-muted font-medium"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]" noValidate>
      <div>
        <label htmlFor="full-name" className={labelClass}>
          Full Name *
        </label>
        <input
          id="full-name"
          type="text"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="company-name" className={labelClass}>
          Company Name *
        </label>
        <input
          id="company-name"
          type="text"
          required
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
          className={inputClass}
        />
      </div>

      <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          How Can We Help? *
        </label>
        <select
          id="service"
          required
          value={form.service}
          onChange={(event) => setForm({ ...form, service: event.target.value })}
          className={`${inputClass} appearance-none cursor-pointer`}
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
        <label htmlFor="message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="contact-submit-btn self-start border-none bg-red text-white px-[26px] py-[14px] text-[14px] font-medium tracking-[0.02em] inline-flex items-center gap-[10px]"
        style={{ cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.85 : 1 }}
        disabled={submitting}
      >
        {submitting && <span className="contact-spinner" aria-hidden="true" />}
        {submitting ? 'Sending...' : 'Send Enquiry'}
      </button>

      {successMessage ? <p className="text-[#2d6a4f] text-[14px]">{successMessage}</p> : null}
      {errorMessage ? <p className="text-red text-[14px]">{errorMessage}</p> : null}
    </form>
  )
}
