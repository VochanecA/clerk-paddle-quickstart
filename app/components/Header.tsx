import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './Button'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full flex h-16 items-center justify-end gap-4 bg-black/[.02] backdrop-blur-xl border-b border-white/[.05] px-4 pr-12">
          <SignedOut>
            <SignInButton>
              <Button variant="secondary">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="primary">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
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
    </header>
  )
} 