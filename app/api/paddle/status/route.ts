import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { SubscriptionStatus, Subscription } from '@/lib/paddle/utils'

export async function GET(request: Request) {
  try {
    // Get the authenticated user
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get email from query params
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const customerId = searchParams.get('customerId')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // TODO: Replace with your actual Paddle API implementation
    const PADDLE_API_KEY = process.env.PADDLE_SECRET_KEY

    if (!PADDLE_API_KEY) {
      throw new Error('Missing Paddle configuration')
    }

    // TODO: Call Paddle API to get subscription status
    // This is a placeholder implementation
    // Replace with actual Paddle API call using email as customer identifier
    const subscription: Subscription = {
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      planId: 'pro_monthly',
      updateUrl: 'https://checkout.paddle.com/subscription/update',
      cancelUrl: 'https://checkout.paddle.com/subscription/cancel'
    }

    /* 
    // Actual Paddle API call would look something like this:
    const response = await fetch('https://api.paddle.com/customers/search', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PADDLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        customer_id: customerId // Optional: Your system's customer ID
      })
    })
    const customer = await response.json()
    
    // Then get their active subscription
    const subscriptionResponse = await fetch(`https://api.paddle.com/subscriptions/${customer.subscription_id}`, {
      headers: {
        Authorization: `Bearer ${PADDLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    const subscription = await subscriptionResponse.json()
    */

    return NextResponse.json({ subscription })

  } catch (error) {
    console.error('Error checking subscription status:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
}
