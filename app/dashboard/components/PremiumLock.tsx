'use client'

import { useState } from 'react'
import { createCheckoutSession } from '@/app/actions/subscription'
import { SubscriptionStatus } from '@/lib/paddle/utils'

interface PremiumLockProps {
  children: React.ReactNode
  subscriptionStatus: {
    status: SubscriptionStatus
    trialEndsAt: string | null
  } | null
}

export function PremiumLock({ children, subscriptionStatus }: PremiumLockProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  // User has access if:
  // 1. Status is active, or
  // 2. Status is trial and trial hasn't ended
  const hasAccess = subscriptionStatus && (
    subscriptionStatus.status === 'active' ||
    (subscriptionStatus.status === 'trial' && 
      subscriptionStatus.trialEndsAt && 
      new Date(subscriptionStatus.trialEndsAt) > new Date())
  )

  // If user has access, show the content
  if (hasAccess) {
    return <>{children}</>
  }

  async function handleUpgradeClick() {
    try {
      setIsLoading(true)
      const { checkoutUrl } = await createCheckoutSession()
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Error creating checkout session:', error)
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative group">
      {/* Blurred Content */}
      <div className="filter blur-[2px] pointer-events-none opacity-50">
        {children}
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="bg-black/40 p-6 rounded-xl text-center max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
          <p className="text-zinc-400 mb-4">
            Upgrade your account to access this feature and much more.
          </p>
          <button
            onClick={handleUpgradeClick}
            disabled={isLoading}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Upgrade Now'}
          </button>
        </div>
      </div>
    </div>
  )
} 