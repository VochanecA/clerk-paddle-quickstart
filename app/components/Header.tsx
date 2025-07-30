'use client'

import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './Button'
import { useRouter, usePathname } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { isSignedIn } = useUser()
  
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full flex h-16 items-center justify-between bg-black/[.02] backdrop-blur-xl border-b border-white/[.05] px-4 pr-12">
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
              />
            </SignedIn>
          </div>
        </div>
    </header>
  )
} 