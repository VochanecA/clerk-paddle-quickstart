export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'paused' | 'cancelled'

export interface Subscription {
  status: SubscriptionStatus
  currentPeriodEnd: string
  planId: string
  updateUrl: string
  cancelUrl: string
} 