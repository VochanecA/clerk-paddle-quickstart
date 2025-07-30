import { NextResponse } from 'next/server'
import { createClerkClient } from '@clerk/nextjs/server'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

// Paddle webhook event types
type WebhookEvent =
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.activated'
  | 'subscription.canceled'
  | 'subscription.payment_succeeded'
  | 'subscription.payment_failed'

interface WebhookPayload {
  event_type: WebhookEvent
  data: {
    customer_id: string
    subscription_id: string
    status: string
    next_bill_date?: string
    trial_ends_at?: string
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as WebhookPayload
    
    // TODO: Verify Paddle webhook signature
    const signature = request.headers.get('Paddle-Signature')
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing webhook signature' },
        { status: 401 }
      )
    }

    // TODO: Implement signature verification
    // const isValid = verifyPaddleWebhook(signature, payload)
    // if (!isValid) {
    //   return NextResponse.json(
    //     { error: 'Invalid webhook signature' },
    //     { status: 401 }
    //   )
    // }

    // Handle different webhook events
    switch (payload.event_type) {
      case 'subscription.created':
      case 'subscription.activated':
        await handleSubscriptionActive(clerk, payload)
        break
      case 'subscription.updated':
        await handleSubscriptionUpdated(clerk, payload)
        break
      case 'subscription.canceled':
        await handleSubscriptionCancelled(clerk, payload)
        break
      case 'subscription.payment_succeeded':
        await handlePaymentSucceeded(clerk, payload)
        break
      case 'subscription.payment_failed':
        await handlePaymentFailed(clerk, payload)
        break
      default:
        console.log(`Unhandled webhook event: ${payload.event_type}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

// Webhook event handlers
async function handleSubscriptionActive(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.data.customer_id, {
      privateMetadata: {
        paddleCustomerId: payload.data.customer_id,
        lastWebhookEvent: {
          type: payload.event_type,
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: 'active',
        trialStartedAt: new Date().toISOString(),
        trialEndsAt: payload.data.trial_ends_at || null
      }
    })
    
    console.log('Subscription activated:', payload.data.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

async function handleSubscriptionUpdated(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.data.customer_id, {
      privateMetadata: {
        lastWebhookEvent: {
          type: payload.event_type,
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: payload.data.status,
        trialEndsAt: payload.data.trial_ends_at || null
      }
    })
    
    console.log('Subscription updated:', payload.data.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

async function handleSubscriptionCancelled(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.data.customer_id, {
      privateMetadata: {
        lastWebhookEvent: {
          type: payload.event_type,
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: 'cancelled',
        trialEndsAt: null
      }
    })
    
    console.log('Subscription cancelled:', payload.data.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

async function handlePaymentSucceeded(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.data.customer_id, {
      privateMetadata: {
        lastWebhookEvent: {
          type: payload.event_type,
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: 'active',
        trialEndsAt: payload.data.next_bill_date || null
      }
    })
    
    console.log('Payment succeeded:', payload.data.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

async function handlePaymentFailed(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.data.customer_id, {
      privateMetadata: {
        lastWebhookEvent: {
          type: payload.event_type,
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: 'past_due'
      }
    })
    
    console.log('Payment failed:', payload.data.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
} 