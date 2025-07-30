'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { initializePaddle, Paddle } from '@paddle/paddle-js'
import { useRouter } from 'next/navigation'

export default function PaddleCheckout() {
  const { user } = useUser()
  const router = useRouter()
  const [paddle, setPaddle] = useState<Paddle>()
  const [priceId, setPriceId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

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
    <>
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
    </>
  )
} 