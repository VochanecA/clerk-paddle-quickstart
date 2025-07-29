interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group relative">
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      
      {/* Card Content */}
      <div className="relative p-8 rounded-2xl bg-white/[.02] border border-white/[.05] backdrop-blur-sm hover:bg-white/[.04] transition-all duration-300">
        <div className="flex items-start gap-4">
          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <div>
            <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {title}
            </h3>
            <p className="text-zinc-400">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#064e3b_0%,_#000_100%)] opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[.03] backdrop-blur-sm border border-white/[.05] text-sm text-white/70">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Built for Developers
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(to_right,_#fff_0%,_rgba(255,255,255,0.5)_100%)] leading-[1.1]">
            Everything You Need
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            A complete toolkit for building modern web applications with authentication and payments.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            title="Open Source"
            description="MIT licensed and free to use in personal and commercial projects. No strings attached."
            icon="🌟"
          />
          <FeatureCard 
            title="Community Driven"
            description="Built and maintained by the community. Contributions are always welcome."
            icon="👥"
          />
          <FeatureCard 
            title="Modern Stack"
            description="Built with Next.js 15, TypeScript, and Tailwind CSS. Always up to date."
            icon="⚡️"
          />
          <FeatureCard 
            title="Authentication"
            description="Secure auth powered by Clerk, with complete source code and examples."
            icon="🔐"
          />
          <FeatureCard 
            title="Payments"
            description="Paddle integration for subscriptions, with full implementation examples."
            icon="💳"
          />
          <FeatureCard 
            title="Zero Config"
            description="Get started in minutes with our detailed documentation and examples."
            icon="🚀"
          />
        </div>
      </div>
    </div>
  )
} 