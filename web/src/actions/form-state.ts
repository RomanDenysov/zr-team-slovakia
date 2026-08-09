/**
 * Kept out of `forms.ts` because a `'use server'` module may only export
 * async functions.
 */
export interface FormState {
  status: 'idle' | 'success' | 'error'
  error?: string
}

export const initialFormState: FormState = { status: 'idle' }
