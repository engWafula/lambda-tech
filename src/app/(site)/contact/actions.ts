'use server'

import { writeClient } from '@/sanity/client'

export type ContactState = { status: 'idle' | 'ok' | 'error'; message?: string; fields?: Record<string, string> }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const get = (k: string) => String(form.get(k) ?? '').trim()
  const fields = { name: get('name'), email: get('email'), company: get('company'), service: get('service'), message: get('message') }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (get('website')) return { status: 'ok' }

  if (!fields.name || !EMAIL.test(fields.email) || fields.message.length < 10) {
    return { status: 'error', message: 'Please add your name, a valid email and a message of at least 10 characters.', fields }
  }
  if (Object.values(fields).some((v) => v.length > 5000)) {
    return { status: 'error', message: 'That message is too long.', fields }
  }

  if (!writeClient) {
    console.warn('[contact] SANITY_API_WRITE_TOKEN not set; submission logged only:', fields.email)
    return { status: 'ok' }
  }

  try {
    await writeClient.create({ _type: 'contactSubmission', ...fields, submittedAt: new Date().toISOString() })
    return { status: 'ok' }
  } catch (err) {
    console.error('[contact] failed to store submission:', (err as Error).message)
    return { status: 'error', message: 'Something went wrong on our side. Please email us instead.', fields }
  }
}
