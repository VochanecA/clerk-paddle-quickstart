import { Button } from '../Button'

function FeatureList({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-zinc-300">
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </div>
  )
}

function VideoDemo({ title, description, videoId }: { title: string; description: string; videoId?: string }) {
  return (
    <div className="aspect-video rounded-2xl bg-white/[.02] border border-white/[.05] backdrop-blur-sm overflow-hidden">
      {videoId ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-zinc-400">{description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function Demos() {
  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2a0e9d_0%,_#000_100%)] opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[.03] backdrop-blur-sm border border-white/[.05] text-sm text-white/70">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Video Walkthroughs
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(to_right,_#fff_0%,_rgba(255,255,255,0.5)_100%)]">
            See It In Action
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Watch detailed walkthroughs of the authentication and subscription flows.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Auth Video */}
          <div>
            <VideoDemo 
              title="Authentication Flow"
              description="Complete walkthrough of the Clerk authentication implementation"
            />
            <div className="mt-8 space-y-3">
              <FeatureList text="User sign-up flow" />
              <FeatureList text="Social authentication setup" />
              <FeatureList text="Protected routes implementation" />
              <FeatureList text="User profile management" />
            </div>
          </div>

          {/* Subscription Video */}
          <div>
            <VideoDemo 
              title="Subscription Flow"
              description="Step-by-step guide to implementing Paddle subscriptions"
            />
            <div className="mt-8 space-y-3">
              <FeatureList text="Subscription plan setup" />
              <FeatureList text="Payment processing integration" />
              <FeatureList text="Webhook configuration" />
              <FeatureList text="User billing portal" />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button variant="secondary" className="text-lg px-8">
            View All Tutorials →
          </Button>
        </div>
      </div>
    </div>
  )
} 