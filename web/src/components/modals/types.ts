export interface ClassModalData {
  kind: 'class'
  day: string
  time: string
  type: string
  level: string
  coach: string
  academy: string
  color: string
  description: string
}

export interface LocationModalData {
  kind: 'location'
  city: string
  badge: string
  address: string
  phone: string
  email: string
  description: string
  amenities: string[]
}

export type ModalData =
  | ClassModalData
  | LocationModalData
  | { kind: 'trial' }
  | { kind: 'partner' }
