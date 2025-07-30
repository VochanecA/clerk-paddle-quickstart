import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClerkClient } from '@clerk/nextjs/server'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

// Calculate trial end date (7 days from now)
function getTrialEndDate(startDate: Date): string {
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 7)
  return endDate.toISOString()
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { customerId } = await request.json()
    if (!customerId) {
      return NextResponse.json(
        { error: 'Missing customer ID' },
        { status: 400 }
      )
    }

    // Calculate trial dates
    const trialStartedAt = new Date()
    const trialEndsAt = getTrialEndDate(trialStartedAt)

    // Update user metadata with trial status and Paddle customer ID
    await clerk.users.updateUserMetadata(userId, {
      privateMetadata: {
        paddleCustomerId: customerId,
        lastWebhookEvent: {
          type: 'checkout_completed',
          timestamp: trialStartedAt.toISOString()
        }
      },
      publicMetadata: {
        subscriptionStatus: 'trial',
        trialStartedAt: trialStartedAt.toISOString(),
        trialEndsAt
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating user metadata:', error)
    return NextResponse.json(
      { error: 'Failed to update user metadata' },
      { status: 500 }
    )
  }
} 