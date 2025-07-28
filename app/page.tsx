import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Clerk + Paddle Starter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          A modern Next.js starter template with authentication and subscription management
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get started by adding Clerk and Paddle to your project
          </p>
        </div>
      </div>
    </main>
  );
}
