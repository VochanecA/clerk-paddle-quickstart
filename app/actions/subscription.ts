'use server'

import { auth, currentUser } from '@clerk/nextjs/server'

// TODO: Replace with actual Paddle types
type SubscriptionStatus = 'active' | 'inactive' | 'past_due' | 'cancelled'

interface Subscription {
  status: SubscriptionStatus
  plan: string
  currentPeriodEnd: Date
}

export async function getSubscriptionStatus(): Promise<Subscription | null> {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      return null
    }

    // TODO: Implement actual Paddle subscription check
    // 1. Query your database for user's subscription
    // 2. Verify with Paddle API
    // 3. Return subscription details

    // This is a placeholder that checks if the user has a 'premium' metadata field
    const hasSubscription = user.publicMetadata?.premium === true

    console.log(user.publicMetadata)
    console.log(user)
    console.log(hasSubscription)
    console.log(user.publicMetadata?.premium)

    return {
      status: hasSubscription ? 'active' : 'inactive',
      plan: hasSubscription ? 'premium' : 'free',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    }
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return null
  }
}

export async function createCheckoutSession() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      throw new Error('User not authenticated')
    }

    // TODO: Implement Paddle checkout session creation
    // 1. Create a checkout session with Paddle
    // 2. Store the session details in your database
    // 3. Return the checkout URL or session ID

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