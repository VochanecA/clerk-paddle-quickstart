import { NextResponse } from 'next/server'
import { createClerkClient } from '@clerk/nextjs/server'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

// Paddle webhook event types
type WebhookEvent =
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_cancelled'
  | 'subscription_payment_succeeded'
  | 'subscription_payment_failed'

interface WebhookPayload {
  alert_name: WebhookEvent
  subscription_id: string
  user_id: string
  status?: string
  subscription_plan_id?: string
  next_bill_date?: string
  [key: string]: any // For other event-specific fields
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
    switch (payload.alert_name) {
      case 'subscription_created':
        await handleSubscriptionCreated(clerk, payload)
        break
      case 'subscription_updated':
        await handleSubscriptionUpdated(clerk, payload)
        break
      case 'subscription_cancelled':
        await handleSubscriptionCancelled(clerk, payload)
        break
      case 'subscription_payment_succeeded':
        await handlePaymentSucceeded(clerk, payload)
        break
      case 'subscription_payment_failed':
        await handlePaymentFailed(clerk, payload)
        break
      default:
        console.log(`Unhandled webhook event: ${payload.alert_name}`)
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
async function handleSubscriptionCreated(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.user_id, {
      privateMetadata: {
        paddleCustomerId: payload.subscription_id,
        lastWebhookEvent: {
          type: 'subscription_created',
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: 'active',
        subscriptionPlan: payload.subscription_plan_id || 'premium',
        premium: true
      }
    })
    
    console.log('Subscription created:', payload.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

async function handleSubscriptionUpdated(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.user_id, {
      privateMetadata: {
        lastWebhookEvent: {
          type: 'subscription_updated',
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: payload.status || 'active',
        subscriptionPlan: payload.subscription_plan_id
      }
    })
    
    console.log('Subscription updated:', payload.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

async function handleSubscriptionCancelled(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.user_id, {
      privateMetadata: {
        lastWebhookEvent: {
          type: 'subscription_cancelled',
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: 'cancelled',
        subscriptionPlan: 'free',
        premium: false
      }
    })
    
    console.log('Subscription cancelled:', payload.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

async function handlePaymentSucceeded(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.user_id, {
      privateMetadata: {
        lastWebhookEvent: {
          type: 'payment_succeeded',
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: 'active'
      }
    })
    
    console.log('Payment succeeded:', payload.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

async function handlePaymentFailed(clerk: any, payload: WebhookPayload) {
  try {
    await clerk.users.updateUserMetadata(payload.user_id, {
      privateMetadata: {
        lastWebhookEvent: {
          type: 'payment_failed',
          timestamp: new Date().toISOString(),
        }
      },
      publicMetadata: {
        subscriptionStatus: 'past_due'
      }
    })
    
    console.log('Payment failed:', payload.subscription_id)
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
} 