import { DashboardMetrics } from './components/DashboardMetrics'
import { PremiumLock } from './components/PremiumLock'
import { getSubscriptionStatus } from '../actions/subscription'

export default async function DashboardPage() {
  // Fetch subscription status server-side
  const subscriptionStatus = await getSubscriptionStatus()

  return (
    <PremiumLock subscriptionStatus={subscriptionStatus}>
      <div className="min-h-[calc(100vh-4rem)] p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-zinc-400 mt-2">Manage your account and explore features</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardMetrics />
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Analytics Feature */}
            <div className="p-6 rounded-2xl bg-white/[.02] border border-white/[.05] backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Analytics Overview</h3>
                  <p className="text-zinc-400">Track your key metrics and performance</p>
                </div>
                <span className="text-2xl">📊</span>
              </div>
              <div className="h-48 flex items-center justify-center border border-white/[.05] rounded-lg">
                <div className="space-y-3 w-full px-6">
                  {/* Fake Chart Bars */}
                  <div className="h-2 bg-white/[.05] rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-violet-500/50 rounded-full" />
                  </div>
                  <div className="h-2 bg-white/[.05] rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-violet-500/50 rounded-full" />
                  </div>
                  <div className="h-2 bg-white/[.05] rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-violet-500/50 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Feature */}
            <div className="p-6 rounded-2xl bg-white/[.02] border border-white/[.05] backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
                  <p className="text-zinc-400">Your latest actions and updates</p>
                </div>
                <span className="text-2xl">📝</span>
              </div>
              <div className="h-48 flex flex-col justify-center space-y-4 border border-white/[.05] rounded-lg p-4">
                <ActivityItem 
                  text="Dashboard accessed"
                  time="2 minutes ago"
                />
                <ActivityItem 
                  text="Profile updated"
                  time="1 hour ago"
                />
                <ActivityItem 
                  text="New login from Chrome"
                  time="3 hours ago"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PremiumLock>
  )
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/[.05] last:border-0">
      <span className="text-sm text-zinc-300">{text}</span>
      <span className="text-xs text-zinc-500">{time}</span>
    </div>
  )
} 