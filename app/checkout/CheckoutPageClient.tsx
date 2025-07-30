'use client'

import { useEffect, useState } from 'react'
import PaddleCheckout from './components/PaddleCheckout'

export default function CheckoutPageClient() {
  const [trialEndDate, setTrialEndDate] = useState<string>('')

  // Calculate trial end date
  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    setTrialEndDate(date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }))
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Side - Checkout Form */}
      <div className="flex-1 border-r border-white/[.05]">
        <div className="max-w-xl mx-auto px-8 py-12">
          <PaddleCheckout />
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="w-[480px] bg-white/[.02] backdrop-blur-sm">
        <div className="px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Pro Plan
            </h1>
            <p className="text-zinc-400">
              Get full access to all features with our Pro plan subscription.
            </p>
          </div>

          {/* Price Display */}
          <div className="mb-8 p-6 rounded-xl bg-white/[.02] border border-white/[.05]">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-zinc-400">/month</span>
            </div>
            <p className="text-zinc-300">Free for 7 days</p>
            <p className="text-sm text-zinc-500">First payment: {trialEndDate}</p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-emerald-500/10">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Full API Access</p>
                <p className="text-sm text-zinc-400">Unlimited API calls and endpoints</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-emerald-500/10">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Priority Support</p>
                <p className="text-sm text-zinc-400">24/7 email and chat support</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-emerald-500/10">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Advanced Analytics</p>
                <p className="text-sm text-zinc-400">Detailed insights and reporting</p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="text-xs text-zinc-500 space-y-3 pt-6 border-t border-white/[.05]">
            <p>By continuing, you agree to our terms of service and Paddle's terms of service.</p>
            <div className="space-x-4">
              <a href="/terms" target="_blank" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" className="hover:text-white transition-colors">
                Paddle Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 