import type { Access } from 'payload'

/** Anyone can read published content; only signed-in editors can write. */
export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => Boolean(req.user)
