'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

export function AuthSetup() {
  const { isSignedIn, isLoaded, user } = useUser()

  useEffect(() => {
    // Only run setup when user is signed in, clerk is loaded,
    // and user has no metadata
    if (isLoaded && isSignedIn && user?.publicMetadata 
      && Object.keys(user.publicMetadata).length === 0) {
      fetch('/api/auth/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(error => {
        console.error('Error setting up user:', error)
      })
    }
  }, [isLoaded, isSignedIn, user?.publicMetadata])

  return null
} 