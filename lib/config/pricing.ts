// lib/config/pricing.ts
export interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  period: string
  features: string[]
  paddlePriceId?: string
  isPopular?: boolean
  buttonText: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started and small projects',
    price: '$0',
    period: '/month',
    features: [
      'Up to 5 PDF signatures per month',
      'Basic document templates',
      'Email notifications',
      'Standard support',
      'Watermarked documents'
    ],
    buttonText: 'Get Started Free'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for professionals and growing businesses',
    price: process.env.NEXT_PUBLIC_PRO_PLAN_PRICE || '$20',
    period: '/month',
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID || 'pri_01j9xyz...',
    isPopular: true,
    features: [
      'Unlimited PDF signatures',
      'Custom document templates',
      'Priority email support',
      'No watermarks',
      'Advanced analytics',
      'Team collaboration',
      'API access'
    ],
    buttonText: 'Start Pro Trial'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large teams with advanced requirements',
    price: 'Custom',
    period: '',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'On-premise deployment',
      'Advanced security features',
      'Custom training'
    ],
    buttonText: 'Contact Sales'
  }
]

// Helper function to get a specific plan
export function getPlan(planId: string): PricingPlan | undefined {
  return pricingPlans.find(plan => plan.id === planId)
}

// Get the pro plan specifically (most common use case)
export function getProPlan(): PricingPlan {
  const proPlan = getPlan('pro')
  if (!proPlan) {
    throw new Error('Pro plan not found in pricing configuration')
  }
  return proPlan
}