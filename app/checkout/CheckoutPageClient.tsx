'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { initializePaddle, Paddle } from '@paddle/paddle-js'
import { useRouter } from 'next/navigation'

export default function CheckoutPageClient() {
  const { user } = useUser()
  const router = useRouter()
  const [paddle, setPaddle] = useState<Paddle>()
  const [priceId, setPriceId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
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

  // Fetch Paddle config from API and initialize
  useEffect(() => {
    if (!user) return

    const loadPaddle = async () => {
      try {
        const res = await fetch('/api/paddle/config')
        const { token, environment, priceId } = await res.json()

        setPriceId(priceId)

        const paddleInstance = await initializePaddle({
          environment,
          token,
          eventCallback: async (event) => {
            console.log('Paddle event:', event)

            if (
              event.name === 'checkout.completed' &&
              user?.emailAddresses[0]?.emailAddress &&
              event.data?.customer?.id
            ) {
              try {
                const customerId = event.data.customer.id

                const response = await fetch('/api/user', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: user.emailAddresses[0].emailAddress,
                    subscriptionStatus: 'trial',
                    reason: 'Completed initial checkout',
                    paddleCustomerId: customerId
                  })
                })

                if (!response.ok) {
                  throw new Error('Failed to update subscription status')
                }

                router.push('/dashboard')
              } catch (error) {
                console.error('Error updating subscription status:', error)
              }
            }
          }
        })

        if (paddleInstance) {
          setPaddle(paddleInstance)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Failed to initialize Paddle:', err)
        setIsLoading(false)
      }
    }

    loadPaddle()
  }, [user, router])

  // Open Paddle Checkout
  useEffect(() => {
    const userEmail = user?.emailAddresses[0]?.emailAddress
    if (!paddle || !userEmail || isLoading || !priceId) return

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email: userEmail },
      settings: {
        displayMode: 'inline',
        theme: 'dark',
        locale: 'en',
        successUrl: `${window.location.origin}/dashboard`,
        frameInitialHeight: 450,
        frameTarget: 'paddle-checkout',
        frameStyle: 'width: 100%; min-width: 312px; background-color: transparent; border: none;',
        variant: 'one-page'
      }
    })
  }, [paddle, user, isLoading, priceId])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Side - Checkout Form */}
      <div className="flex-1 border-r border-white/[.05]">
        <div className="max-w-xl mx-auto px-8 py-12">
          {/* Paddle Embed */}
          {isLoading ? (
            <div className="rounded-2xl p-8 text-center">
              <div className="w-6 h-6 border-2 border-white/[.05] border-t-emerald-500 rounded-full animate-spin mx-auto" />
              <p className="text-zinc-400 mt-4">Loading secure checkout...</p>
            </div>
          ) : (
            <>
              <div id="paddle-checkout" className="paddle-checkout min-h-[450px]" />
              <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout powered by Paddle</span>
              </div>
            </>
          )}
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