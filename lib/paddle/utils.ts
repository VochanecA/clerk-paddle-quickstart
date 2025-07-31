export type SubscriptionStatus = 'not_started' | 'trial' | 'active' | 'past_due' | 'cancelled'

export interface Subscription {
  status: SubscriptionStatus
  currentPeriodEnd: string
  planId: string
  updateUrl: string
  cancelUrl: string
} 

const getPaddleApiUrl = () => {
  if(process.env.PADDLE_ENV === 'production') {
    return 'https://api.paddle.com';
  } else {
    return 'https://sandbox-api.paddle.com';
  }
}


export const createCustomerPortalSession = async (customerId: string) => {
  try {
    const paddleApiUrl = getPaddleApiUrl();
    const response = await fetch(`${paddleApiUrl}/customers/${customerId}/portal-sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Failed to create customer portal session:', await response.text());
      throw new Error('Failed to create customer portal session');
    }

    const data = await response.json();

    return data.data.urls.general.overview;
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw error;
  }
}