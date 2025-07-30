import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import CheckoutPageClient from './CheckoutPageClient'
import { isSubscriptionActive } from '../actions/subscription'

export default async function CheckoutPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }
  
  // Check subscription status server-side
  const hasActiveSubscription = await isSubscriptionActive()
  if (hasActiveSubscription) {
    redirect('/dashboard')
  }

  return <CheckoutPageClient />
} 