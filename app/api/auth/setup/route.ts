import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClerkClient } from '@clerk/nextjs/server'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export async function POST() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await clerk.users.getUser(userId)

    // Only set initial metadata if it doesn't exist
    if (!user.publicMetadata || Object.keys(user.publicMetadata).length === 0) {
      await clerk.users.updateUserMetadata(userId, {
        privateMetadata: {
          paddleCustomerId: null,
          lastWebhookEvent: {
            type: 'initial_setup',
            timestamp: new Date().toISOString(),
          }
        },
        publicMetadata: {
          subscriptionStatus: 'inactive',
          subscriptionPlan: 'free',
          premium: false
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error setting up user metadata:', error)
    return NextResponse.json(
      { error: 'Failed to set up user metadata' },
      { status: 500 }
    )
  }
} 