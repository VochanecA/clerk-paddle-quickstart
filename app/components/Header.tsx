'use client'

import { useEffect, useState } from 'react'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './Button'
import { useRouter, usePathname } from 'next/navigation'
import { SubscriptionPortalPage } from './SubscriptionPortalPage'
import { CreditCard } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const [portalUrl, setPortalUrl] = useState<string | null>(null)
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')


  // Fetch portal URL when component mounts
  useEffect(() => {
    const fetchPortalUrl = async () => {
      if (!user?.emailAddresses?.[0]?.emailAddress) return;

      try {
        const response = await fetch('/api/user/portal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.emailAddresses[0].emailAddress
          })
        });

        if (response.ok) {
          const { url } = await response.json();
          setPortalUrl(url);
        } else {
          // If user has no subscription, don't show the portal button
          console.warn('Failed to create portal session');
        }
      } catch (error) {
        console.error('Error opening customer portal:', error);
      }
    };

    if (isSignedIn) {
      fetchPortalUrl();
    }
  }, [user, isSignedIn]);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full flex h-16 items-center justify-between bg-black/[.02] backdrop-blur-xl border-b border-white/[.05] px-12">
          <button 
            onClick={() => {
              if (isSignedIn) {
                router.push('/dashboard')
              } else {
                router.push('/')
              }
            }}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:animate-pulse" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:to-emerald-500/70 transition-all duration-300">
              Clerk + Paddle
            </span>
          </button>
          
          <div className="flex items-center gap-4">
            {!isAuthPage && (
              <SignedOut>
                <Button variant="primary" onClick={() => {
                  router.push('/sign-in')
                }}>Sign In</Button>
              </SignedOut>
            )}
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              >
                {portalUrl && (
                <UserButton.UserProfilePage 
                  label="Subscription" 
                  labelIcon={<CreditCard size={16}/>} 
                  url="subscription"
                >
                  <SubscriptionPortalPage portalUrl={portalUrl} />
                </UserButton.UserProfilePage>
                )}
              </UserButton>
            </SignedIn>
          </div>
        </div>
    </header>
  )
} 