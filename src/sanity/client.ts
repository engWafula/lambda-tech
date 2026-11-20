import { createClient } from 'next-sanity'
import { apiVersion, dataset, isSanityConfigured, projectId } from './env'

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null

export const writeClient =
  isSanityConfigured && process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_WRITE_TOKEN,
      })
    : null
