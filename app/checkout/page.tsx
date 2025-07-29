import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getPaddleSubscriptionStatus } from '@/lib/paddle/utils';
import CheckoutPageClient from './CheckoutPageClient';

export default async function CheckoutPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in?redirect_url=/checkout');
  }

  // Check subscription status using email
  const hasSubscription = await getPaddleSubscriptionStatus(user.emailAddresses[0].emailAddress);
  
  // Redirect subscribed users to the dashboard
  if (hasSubscription) {
    redirect('/dashboard');
  }

  return <CheckoutPageClient />;
} 