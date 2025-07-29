interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/[.02] border border-white/[.05] backdrop-blur-sm hover:bg-white/[.04] transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  )
}

export function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  )
} 