export type SubscriptionStatus = 'not_started' | 'trial' | 'active' | 'past_due' | 'cancelled'

export interface Subscription {
  status: SubscriptionStatus
  currentPeriodEnd: string
  planId: string
  updateUrl: string
  cancelUrl: string
} 