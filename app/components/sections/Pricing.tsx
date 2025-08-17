'use client'
import { useState } from 'react'
import { createCheckoutSession } from '@/app/actions/subscription'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { pricingPlans } from '@/lib/config/pricing'
import { Check, Star } from 'lucide-react'

interface PricingCardProps {
  title: string
  description: string
  price: string
  period?: string
  features: string[]
  isPopular?: boolean
  buttonText: string
  onButtonClick: () => void
  isLoading?: boolean
}

function PricingCard({ 
  title, 
  description, 
  price, 
  period = '/month',
  features, 
  isPopular = false, 
  buttonText,
  onButtonClick,
  isLoading = false
}: PricingCardProps) {
  return (
    <div className="group relative">
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
            <Star size={16} className="text-white" />
            <span className="text-white">Most Popular</span>
          </div>
        </div>
      )}

      {/* Hover Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${
        isPopular 
          ? 'from-emerald-500/[.1] to-teal-500/[.05]' 
          : 'from-emerald-500/[.05] to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
     
      {/* Card Content */}
      <div className={`relative p-8 rounded-2xl bg-white/[.02] backdrop-blur-sm hover:bg-white/[.04] transition-all duration-300 h-full flex flex-col ${
        isPopular 
          ? 'border-2 border-emerald-500/30' 
          : 'border border-white/[.05]'
      }`}>
        
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            {title}
          </h3>
          <p className="text-zinc-400 mb-6">{description}</p>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              {price}
            </span>
            {period && (
              <span className="text-zinc-400 text-lg">{period}</span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="flex-1 mb-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1">
                  <Check size={16} className="text-emerald-500 flex-shrink-0" />
                </div>
                <span className="text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={onButtonClick}
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            isPopular
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-emerald-500/25'
              : 'bg-white/[.05] text-white border border-white/[.1] hover:bg-white/[.1] hover:border-white/[.2]'
          }`}
        >
          {isLoading ? 'Loading...' : buttonText}
        </button>
      </div>
    </div>
  )
}

export function Pricing() {
  const [isLoading, setIsLoading] = useState(false)
  const { isSignedIn } = useUser()
  const router = useRouter()

  async function handleUpgradeClick() {
    // Check if user is authenticated first
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

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

  function handleContactClick() {
    // Handle contact for enterprise
    window.location.href = 'mailto:contact@yourdomain.com'
  }

  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#064e3b_0%,_#000_100%)] opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[.03] backdrop-blur-sm border border-white/[.05] text-sm text-white/70">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Simple Pricing
          </div>
         
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(to_right,_#fff_0%,_rgba(255,255,255,0.5)_100%)] leading-[1.1]">
            Choose Your Plan
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Start for free and upgrade when you need more features. No hidden fees or long-term commitments.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              title={plan.name}
              description={plan.description}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              isPopular={plan.isPopular}
              buttonText={plan.buttonText}
              onButtonClick={() => {
                if (plan.id === 'free') {
                  router.push('/sign-up')
                } else if (plan.id === 'pro') {
                  handleUpgradeClick()
                } else if (plan.id === 'enterprise') {
                  handleContactClick()
                }
              }}
              isLoading={plan.id === 'pro' ? isLoading : false}
            />
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-zinc-400">
            All plans include a 14-day free trial. No credit card required to get started.
          </p>
        </div>
      </div>
    </div>
  )
}