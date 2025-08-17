'use client'
import { useState } from 'react'
import { createCheckoutSession } from '@/app/actions/subscription'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { SubscriptionStatus } from '@/lib/paddle/utils'
import { getProPlan } from '@/lib/config/pricing'
import { Check, Lock, Star } from 'lucide-react'

interface PremiumLockProps {
  children: React.ReactNode
  subscriptionStatus: {
    status: SubscriptionStatus
    trialEndsAt: string | null
  } | null
}

export function PremiumLock({ children, subscriptionStatus }: PremiumLockProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { isSignedIn } = useUser()
  const router = useRouter()
  const proPlan = getProPlan()
 
  const hasAccess = subscriptionStatus && (
    subscriptionStatus.status === 'active' ||
    (subscriptionStatus.status === 'trial' &&
      subscriptionStatus.trialEndsAt &&
      new Date(subscriptionStatus.trialEndsAt) > new Date())
  )

  if (hasAccess) return <>{children}</>

  const handleUpgradeClick = async () => {
    if (!isSignedIn) return router.push('/sign-in')
    try {
      setIsLoading(true)
      const { checkoutUrl } = await createCheckoutSession()
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative group">
      <div className="blur-[2px] pointer-events-none opacity-30">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
        <div className="relative max-w-md w-full">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
            <Star size={16} className="text-white" />
            <span className="text-white">Most Popular</span>
          </div>

          <div className="relative p-6 rounded-2xl bg-black/60 backdrop-blur-sm border-2 border-emerald-500/30 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lock size={24} className="text-emerald-500" />
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                {proPlan.name}
              </h3>
            </div>
            
            <p className="text-zinc-400 mb-4">{proPlan.description}</p>
            
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                {proPlan.price}
              </span>
              <span className="text-zinc-400 text-lg">{proPlan.period}</span>
            </div>

            {/* <ul className="space-y-3 text-left mb-6">
              {proPlan.features.slice(0, 4).map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">{feature}</span>
                </li>
              ))}
              {proPlan.features.length > 4 && (
                <li className="text-zinc-400 text-sm text-center pt-2">
                  + {proPlan.features.length - 4} more features
                </li>
              )}
            </ul> */}

            <button
              onClick={handleUpgradeClick}
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-emerald-500/25"
            >
              {isLoading ? 'Loading...' : proPlan.buttonText}
            </button>

            <p className="text-zinc-500 text-xs mt-4">
              14-day free trial • No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}