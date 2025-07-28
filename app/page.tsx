import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Welcome to Clerk + Paddle Starter
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          A modern Next.js starter template with authentication and subscription management
        </p>
        <div className="space-y-4">
          <p className="text-sm text-zinc-500">
            Get started by adding Clerk and Paddle to your project
          </p>
        </div>
      </div>
    </div>
  )
}
