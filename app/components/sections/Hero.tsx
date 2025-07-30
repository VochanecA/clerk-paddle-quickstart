import { Button } from '../Button'
import { PROJECT, SOCIAL_LINKS, EXTERNAL_LINKS } from '@/app/config/constants'

export function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32">
      {/* 3D Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#10b981_0%,_#064e3b_50%,_#000_100%)] opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_#000_100%)] opacity-80" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Overline */}
        <div className="mb-8 tracking-wide">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[.03] backdrop-blur-sm border border-white/[.05] text-sm text-white/70">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Open Source • MIT License
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-[linear-gradient(to_right,_#fff_0%,_rgba(255,255,255,0.5)_100%)] leading-[1.1]">
          <span className="block">Open Source.</span>
          <span className="block mt-1">Production Ready.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          {PROJECT.DESCRIPTION}
          <span className="block mt-2 text-zinc-300">Built for developers, by developers. Free forever.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="w-full sm:w-auto text-lg px-8">
              Star on GitHub →
            </Button>
          </a>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="hidden sm:inline">or</span>
            <a href={EXTERNAL_LINKS.CLERK_DOCS} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="w-full sm:w-auto text-lg px-8">
                View Documentation
              </Button>
            </a>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">MIT</div>
            <div className="text-sm text-zinc-400 mt-1">Licensed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">100%</div>
            <div className="text-sm text-zinc-400 mt-1">Open Source</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">0</div>
            <div className="text-sm text-zinc-400 mt-1">Vendor Lock-in</div>
          </div>
        </div>
      </div>
    </div>
  )
} 