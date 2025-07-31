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
      <div className="relative min-h-[calc(100vh-4rem)] p-8 pt-24">
        {/* 3D Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#10b981_0%,_#064e3b_50%,_#000_100%)] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_#000_100%)] opacity-80" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto space-y-8">
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
            <div className="bg-white/[.06] border border-white/10 rounded-2xl p-6 flex-1 backdrop-blur-2xl shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.1)] hover:bg-white/[.08] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-500/10 p-2 rounded-lg backdrop-blur-xl">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="font-medium text-emerald-500/90">Trial Status</h3>
              </div>
              <div className="text-2xl font-bold text-white/90 mb-1">
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

            <div className="bg-white/[.06] border border-white/10 rounded-2xl p-6 flex-1 backdrop-blur-2xl shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.1)] hover:bg-white/[.08] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500/10 p-2 rounded-lg backdrop-blur-xl">
                  <Rocket className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-medium text-blue-500/90">Build Streak</h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Day 1</div>
              <p className="text-sm text-zinc-400">Keep shipping! 🚢</p>
            </div>

            <div className="bg-white/[.06] border border-white/10 rounded-2xl p-6 flex-1 backdrop-blur-2xl shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.1)] hover:bg-white/[.08] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500/10 p-2 rounded-lg backdrop-blur-xl">
                  <Trophy className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="font-medium text-purple-500/90">Builder Level</h3>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Rookie</div>
              <p className="text-sm text-zinc-400">The journey begins! 🌱</p>
            </div>
          </div>

          {/* Fun Motivation Section and Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fun Motivation Section */}
            <div className="bg-white/[.06] border border-white/10 rounded-2xl p-8 backdrop-blur-2xl shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.1)] hover:bg-white/[.08] transition-all">
              <h2 className="text-xl font-semibold mb-4 text-white/90">🎯 Today's Mission</h2>
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
            <div className="bg-white/[.04] rounded-2xl p-8 border border-white/10 backdrop-blur-2xl shadow-[inset_0px_0.5px_0px_rgba(255,255,255,0.1)] hover:bg-white/[.06] transition-all">
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