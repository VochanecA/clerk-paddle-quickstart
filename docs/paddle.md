# Paddle Integration

## Overview
This template uses Paddle.js (v1.4) for subscription billing. Paddle handles:
- Checkout experience
- Subscription management
- Customer portal
- Payment processing

## Key Features

### Checkout Flow
- Beautiful inline checkout
- Dark theme integration
- Trial management
- Automatic customer creation

### Subscription Management
- Customer portal for subscription management
- Trial period handling
- Subscription status synced to Clerk

### Coming Soon
- 🔄 Webhook handling for subscription events
- ✅ Webhook signature verification
- 📊 Usage tracking

## Setup

1. Create a Paddle account at [paddle.com](https://paddle.com)
2. Create a subscription product
3. Add environment variables to `.env.local`:
```env
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=ptk_dev_******
PADDLE_SECRET_KEY=psk_dev_******
NEXT_PUBLIC_PADDLE_PRICE_ID=pri_******
```

## Usage Examples

### Initialize Checkout
```typescript
const paddleInstance = await initializePaddle({
  environment, // 'sandbox' or 'production'
  token,
  eventCallback: (event) => {
    if (event.name === 'checkout.completed') {
      // Handle successful checkout
    }
  }
})
```

### Open Checkout
```typescript
paddle.Checkout.open({
  items: [{ priceId, quantity: 1 }],
  customer: { email: userEmail },
  settings: {
    displayMode: 'inline',
    theme: 'dark',
    locale: 'en'
  }
})
```

### Customer Portal
```typescript
// Open customer portal for subscription management
const { url } = await paddle.customerPortal({
  customerId: user.privateMetadata.paddleCustomerId
})
```

## Subscription States

The template handles these subscription states:
- `not_started`: New user, no subscription
- `trial`: Free trial period
- `active`: Active paid subscription
- `past_due`: Payment failed
- `cancelled`: Subscription cancelled 