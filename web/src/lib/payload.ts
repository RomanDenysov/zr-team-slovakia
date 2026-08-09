import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Payload's local API — a direct function call into the CMS, no HTTP hop.
 * Safe to call from server components; `getPayload` caches the instance.
 */
export function getPayloadClient() {
  return getPayload({ config: configPromise })
}
