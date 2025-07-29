export function DashboardMetrics() {
  return (
    <>
      <MetricCard
        title="API Calls"
        value="2,451"
        change="+12.5%"
        trend="up"
      />
      <MetricCard
        title="Active Users"
        value="1,234"
        change="+5.2%"
        trend="up"
      />
      <MetricCard
        title="Response Time"
        value="145ms"
        change="-8.1%"
        trend="down"
      />
    </>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}

function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/[.02] border border-white/[.05] backdrop-blur-sm">
      <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {change}
          <span className="ml-0.5">
            {trend === 'up' ? '↑' : '↓'}
          </span>
        </p>
      </div>
    </div>
  )
} 