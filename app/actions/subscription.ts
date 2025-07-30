'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { SubscriptionStatus } from '@/lib/paddle/utils'

interface Subscription {
  status: SubscriptionStatus
  trialEndsAt: string | null
  paddleCustomerId?: string | null
}

export async function getSubscriptionStatus(): Promise<Subscription | null> {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      return null
    }

    // Get subscription status from Clerk metadata
    const metadata = user.publicMetadata || {}
    const privateMetadata = user.privateMetadata || {}

    // Ensure we have valid subscription status or default to 'not_started'
    const status = (metadata.subscriptionStatus as SubscriptionStatus) || 'not_started'
    const trialEndsAt = metadata.trialEndsAt as string | null || null
    const paddleCustomerId = privateMetadata.paddleCustomerId as string | null || null

    return {
      status,
      trialEndsAt,
      paddleCustomerId
    }
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return null
  }
}

export async function isSubscriptionActive(): Promise<boolean> {
  try {
    const subscription = await getSubscriptionStatus()
    
    // If no subscription data, user doesn't have access
    if (!subscription) return false

    // Active subscriptions always have access
    if (subscription.status === 'active') return true

    // Trial access depends on trial end date
    if (subscription.status === 'trial' && subscription.trialEndsAt) {
      return new Date(subscription.trialEndsAt) > new Date()
    }

    return false
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return false
  }
}

export async function createCheckoutSession() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      throw new Error('User not authenticated')
    }

    // Placeholder response
    return {
      checkoutUrl: '/checkout',
      sessionId: 'placeholder_session_id'
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export async function cancelSubscription() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      throw new Error('User not authenticated')
    }

    // TODO: Implement Paddle subscription cancellation
    // 1. Cancel subscription with Paddle API
    // 2. Update database records
    // 3. Update user metadata

    // Placeholder implementation
    console.log('Subscription cancellation requested')
    return { success: true }
  } catch (error) {
    console.error('Error cancelling subscription:', error)
    throw error
  }
} 