export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'paused' | 'cancelled'

export interface Subscription {
  status: SubscriptionStatus
  currentPeriodEnd: string
  planId: string
  updateUrl: string
  cancelUrl: string
}

/**
 * Check subscription status for a customer
 * @param customerEmail - Customer's email address used in Paddle
 * @param customerId - Optional customer ID (can be Clerk user ID or your own customer ID)
 */
export async function getPaddleSubscriptionStatus(customerEmail: string, customerId?: string): Promise<boolean> {
  try {
    // Include customer identifiers in the request
    const response = await fetch(`/api/paddle/status?email=${encodeURIComponent(customerEmail)}${customerId ? `&customerId=${customerId}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch subscription status')
    }

    const data = await response.json()
    return data.subscription?.status === 'active' || data.subscription?.status === 'trialing'
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return false
  }
} 