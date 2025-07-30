import { DashboardMetrics } from './components/DashboardMetrics'
import { PremiumLock } from './components/PremiumLock'
import { getSubscriptionStatus } from '../actions/subscription'
import { currentUser } from '@clerk/nextjs/server'
import { Sparkles, Rocket, Trophy } from 'lucide-react'

export default async function DashboardPage() {
  // Fetch subscription status server-side
  const subscriptionStatus = await getSubscriptionStatus()
  const user = await currentUser()

  if (!user) return null

  // Get first name or username for personalization
  const firstName = user.firstName || user.username?.split(' ')[0] || 'Builder'

  return (
    <PremiumLock subscriptionStatus={subscriptionStatus}>
      <div className="min-h-[calc(100vh-4rem)] p-8 pt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Fun Welcome Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {subscriptionStatus?.status === 'trial' ? '⚡️ Trial Activated' : '🚀 Welcome Back'} {firstName}!
              </h1>
              {subscriptionStatus?.status === 'trial' && (
                <div className="bg-emerald-500/10 text-emerald-500 text-sm px-3 py-1 rounded-full">
                  Pro Trial
                </div>
              )}
            </div>
            <p className="text-zinc-400">Time to build something awesome! No pressure though, we're all figuring it out together 😅</p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white/[.03] border border-white/[.05] rounded-xl p-6 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-500/10 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="font-medium">Trial Status</h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {subscriptionStatus?.trialEndsAt ? (
                  <>
                    {new Date(subscriptionStatus.trialEndsAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </>
                ) : 'No trial active'}
              </div>
              <p className="text-sm text-zinc-400">Trial end date (you got this! 💪)</p>
            </div>

            <div className="bg-white/[.03] border border-white/[.05] rounded-xl p-6 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <Rocket className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-medium">Build Streak</h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Day 1</div>
              <p className="text-sm text-zinc-400">Keep shipping! 🚢</p>
            </div>

            <div className="bg-white/[.03] border border-white/[.05] rounded-xl p-6 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500/10 p-2 rounded-lg">
                  <Trophy className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="font-medium">Builder Level</h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Rookie</div>
              <p className="text-sm text-zinc-400">The journey begins! 🌱</p>
            </div>
          </div>

          {/* Fun Motivation Section and Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fun Motivation Section */}
            <div className="bg-white/[.03] border border-white/[.05] rounded-xl p-8">
              <h2 className="text-xl font-semibold mb-4">🎯 Today's Mission</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Ship That Feature</h3>
                    <p className="text-sm text-zinc-400">Remember: Done is better than perfect. Unless it's a payment system. Then maybe test it first 😅</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Tweet Your Progress</h3>
                    <p className="text-sm text-zinc-400">Building in public? More like building a community! 🐦</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Touch Some Grass</h3>
                    <p className="text-sm text-zinc-400">Yes, it still exists outside. We checked. 🌿</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspirational Quote */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-8 border border-white/[.05] flex flex-col justify-center">
              <blockquote className="text-lg font-medium text-white/90">
                "The best time to launch was yesterday. The second best time is today. 
                The third best time is also today because who's counting anyway?"
              </blockquote>
              <p className="mt-2 text-sm text-white/70">- Indie Wisdom</p>
            </div>
          </div>
        </div>
      </div>
    </PremiumLock>
  )
} 