'use client'

import { Button } from '@/app/components/Button'
import { createCheckoutSession } from '@/app/actions/subscription'
import { ReactNode, useState } from 'react'

interface PremiumLockProps {
  children: ReactNode
  subscriptionStatus: {
    status: 'active' | 'inactive' | 'past_due' | 'cancelled'
    plan: string
    currentPeriodEnd: Date
  } | null
}

export function PremiumLock({ children, subscriptionStatus }: PremiumLockProps) {
  const [isLoading, setIsLoading] = useState(false)
  const hasActiveSubscription = subscriptionStatus?.status === 'active'

  // If user has an active subscription, show the content
  if (hasActiveSubscription) {
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
        <div className="text-center max-w-xl mx-auto p-8">
          {/* Lock Icon */}
          <div className="bg-white/[.05] p-6 rounded-full backdrop-blur-xl mb-6 inline-flex">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>

          {/* Text */}
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Unlock Premium Features
          </h2>
          <p className="text-lg text-zinc-400 mb-8 max-w-md mx-auto">
            Get access to advanced analytics, custom reports, and more with our premium plan.
          </p>

          {/* CTA Button */}
          <Button 
            variant="primary" 
            className="text-lg px-8"
            onClick={handleUpgradeClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Upgrade to Premium →'}
          </Button>
        </div>
      </div>
    </div>
  )
} 