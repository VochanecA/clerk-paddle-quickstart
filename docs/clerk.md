# Clerk Integration

## Overview
This template uses Clerk (v6.27) for authentication and user management. Clerk handles:
- User authentication
- User sessions
- Protected routes
- User metadata (for subscription state)

## Key Features

### Authentication Flow
- Sign in/up with email
- Protected routes via middleware
- Automatic session management
- Dark theme UI components

### User Metadata
The template uses Clerk's metadata to store subscription information:

```typescript
// Public metadata (visible to frontend)
{
  subscriptionStatus: 'not_started' | 'trial' | 'active' | 'past_due' | 'cancelled'
  trialStartedAt: string | null
  trialEndsAt: string | null
}

// Private metadata (server-side only)
{
  paddleCustomerId: string
  lastWebhookEvent: {
    type: string
    timestamp: string
  }
}
```

### Protected Routes
All routes except these are protected:
- `/` (landing page)
- `/sign-in`
- `/sign-up`
- `/api/paddle/webhook`

## Setup

1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Add environment variables to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_******
CLERK_SECRET_KEY=sk_test_******
```

## Usage Examples

### Protecting Routes
```typescript
// middleware.ts
export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return
  await auth.protect()
})
```

### Accessing User Data
```typescript
// Client components
const { user } = useUser()
const subscriptionStatus = user?.publicMetadata?.subscriptionStatus

// Server components
const { userId } = await auth()
const user = await clerk.users.getUser(userId)
```

### Managing Metadata
```typescript
await clerk.users.updateUserMetadata(userId, {
  publicMetadata: {
    subscriptionStatus: 'trial',
    trialStartedAt: new Date().toISOString()
  }
})
``` 