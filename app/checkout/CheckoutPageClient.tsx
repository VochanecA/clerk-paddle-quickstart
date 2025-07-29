'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useRouter } from 'next/navigation';
import { Lock, Mic, Shield, Check } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPageClient() {
  const { user } = useUser();
  const router = useRouter();
  const [paddle, setPaddle] = useState<Paddle>();
  const [priceId, setPriceId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [trialEndDate, setTrialEndDate] = useState<string>('');

  // Calculate trial end date
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    setTrialEndDate(date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }));
  }, []);

  // Fetch Paddle config from API and initialize
  useEffect(() => {
    if (!user) return;

    const loadPaddle = async () => {
      try {
        const res = await fetch('/api/paddle/config');
        const { token, environment, priceId } = await res.json();

        setPriceId(priceId);

        const paddleInstance = await initializePaddle({
          environment,
          token,
          eventCallback: async (event) => {
            console.log('Paddle event:', event);

            if (
              event.name === 'checkout.completed' &&
              user?.emailAddresses[0]?.emailAddress &&
              event.data?.customer?.id
            ) {
              try {
                const customerId = event.data.customer.id;

                const response = await fetch('/api/user', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: user.emailAddresses[0].emailAddress,
                    subscriptionStatus: 'trial',
                    reason: 'Completed initial checkout',
                    paddleCustomerId: customerId
                  })
                });

                if (!response.ok) {
                  throw new Error('Failed to update subscription status');
                }

                router.push('/welcome');
              } catch (error) {
                console.error('Error updating subscription status:', error);
              }
            }
          }
        });

        if (paddleInstance) {
          setPaddle(paddleInstance);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to initialize Paddle:', err);
        setIsLoading(false);
      }
    };

    loadPaddle();
  }, [user, router]);

  // Open Paddle Checkout
  useEffect(() => {
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    if (!paddle || !userEmail || isLoading || !priceId) return;

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email: userEmail },
      settings: {
        displayMode: 'inline',
        theme: 'light',
        locale: 'en',
        successUrl: `${window.location.origin}/welcome`,
        frameInitialHeight: 450,
        frameTarget: 'paddle-checkout',
        frameStyle: 'width: 100%; min-width: 312px; background-color: transparent; border: none;',
        variant: 'one-page'
      }
    });
  }, [paddle, user, isLoading, priceId]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-background)]">
      {/* Left Panel - Checkout Form */}
      <div className="flex-1 min-h-screen border-r border-[var(--color-tertiary)] flex flex-col">
        <header className="w-full border-b border-[var(--color-tertiary)] bg-[var(--color-background)]/80 backdrop-blur-xl h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-2 text-[var(--color-foreground)]">
            <Mic size={20} />
            <span className="font-medium">LogFast</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-[var(--color-secondary)]">
            <Lock size={14} />
            <span>Secure Checkout</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="max-w-[600px] mx-auto px-6">
            {/* Mobile Product Info */}
            <div className="md:hidden py-12">
              <h2 className="text-4xl font-display text-[var(--color-foreground)] mb-2">LogFast</h2>
              <p className="text-[var(--color-secondary)] leading-relaxed mb-8">The last workout and nutrition tracker you'll ever need</p>
              
              <div className="bg-gradient-to-br from-[var(--color-background)] to-[var(--color-off-white)] rounded-2xl p-6 border border-[var(--color-tertiary)]">
                <h1 className="text-4xl font-display font-light text-[var(--color-foreground)] mb-2">$15<span className="text-lg text-[var(--color-secondary)]">/month</span></h1>
                <p className="text-[var(--color-secondary)]">Free for 7 days</p>
                <p className="text-xs text-[var(--color-secondary)]">First payment: {trialEndDate}</p>
              </div>
            </div>

            {/* Checkout Form */}
            {isLoading ? (
              <div className="rounded-2xl p-8 text-center">
                <div className="w-6 h-6 border-2 border-[var(--color-tertiary)] border-t-[var(--color-foreground)] rounded-full animate-spin mx-auto"></div>
                <p className="text-[var(--color-secondary)] mt-4">Loading secure checkout...</p>
              </div>
            ) : (
              <>
                <div id="paddle-checkout" className="paddle-checkout" />
                <div className="mt-6 flex items-center gap-3 text-sm text-[var(--color-secondary)] mb-12">
                  <Shield size={16} />
                  <span>Powered by Paddle</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Order Summary (Hidden on Mobile) */}
      <div className="hidden md:block w-full md:w-[480px] bg-[var(--color-off-white)] md:sticky md:top-0 md:h-screen overflow-auto">
        <div className="px-8 py-12 h-full flex flex-col">
          {/* Product Description Header */}
          <div>
            <h2 className="text-4xl font-display text-[var(--color-foreground)] mb-2">LogFast</h2>
            <p className="text-[var(--color-secondary)] leading-relaxed">The last workout and nutrition tracker you'll ever need</p>
          </div>

          {/* Price Display */}
          <div className="mt-12 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-off-white)] rounded-2xl p-6 border border-[var(--color-tertiary)]">
            <h1 className="text-4xl font-display font-light text-[var(--color-foreground)] mb-2">$15<span className="text-lg text-[var(--color-secondary)]">/month</span></h1>
            <p className="text-[var(--color-secondary)]">Free for 7 days</p>
            <p className="text-xs text-[var(--color-secondary)]">First payment: {trialEndDate}</p>
          </div>

          {/* Features */}
          <div className="flex-1 py-12">
            <h2 className="font-medium text-[var(--color-foreground)] mb-4">Everything You Need</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-[var(--color-background)] rounded-full p-1">
                  <Check size={14} className="text-[var(--color-foreground)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">Unlimited AI Logs</p>
                  <p className="text-sm text-[var(--color-secondary)]">Log any workout or meal with voice or natural text</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-[var(--color-background)] rounded-full p-1">
                  <Check size={14} className="text-[var(--color-foreground)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">Real-time Voice Input</p>
                  <p className="text-sm text-[var(--color-secondary)]">No need to type, just speak naturally</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-[var(--color-background)] rounded-full p-1">
                  <Check size={14} className="text-[var(--color-foreground)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">Historical Analysis</p>
                  <p className="text-sm text-[var(--color-secondary)]">Track progress over time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-[var(--color-secondary)] space-y-3 pt-6 border-t border-[var(--color-tertiary)]">
            <p>By continuing, you agree to our terms of service and Paddle's terms of service.</p>
            <div className="space-x-4">
              <Link href="/terms" target="_blank" className="hover:text-[var(--color-foreground)] transition-colors">
                LogFast Terms of Service
              </Link>
              <Link href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" className="hover:text-[var(--color-foreground)] transition-colors">
                Paddle Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 