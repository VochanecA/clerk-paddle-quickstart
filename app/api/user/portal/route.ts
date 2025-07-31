import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { createCustomerPortalSession } from '@/lib/paddle/utils';

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const { userId } = await auth();
    const user = await currentUser()
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get subscription status from Clerk metadata
    const privateMetadata = user.privateMetadata || {}

    const paddleCustomerId = privateMetadata.paddleCustomerId as string | null || null

    if (!paddleCustomerId) {
      return NextResponse.json({ error: 'No Paddle customer ID found' }, { status: 400 });
    }
    
    // Create customer portal session
    const portalUrl = await createCustomerPortalSession(paddleCustomerId);

    console.log('portalUrl', portalUrl);

    return NextResponse.json({ url: portalUrl });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create customer portal session' },
      { status: 500 }
    );
  }
} 