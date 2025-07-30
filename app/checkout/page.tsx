import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CheckoutPageClient from './CheckoutPageClient';

export default async function CheckoutPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }
  
  // This is a server component, so this is where you'll check subscription status
  // From your BE/DB/Paddle directly. For demo we'll hardcode true/false

  const isSubscribed = false;
  if (isSubscribed) {
    redirect('/dashboard');
  }

  return <CheckoutPageClient />;
} 