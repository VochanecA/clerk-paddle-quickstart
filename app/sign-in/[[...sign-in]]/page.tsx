import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes'

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* 3D Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#10b981_0%,_#064e3b_50%,_#000_100%)] opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_#000_100%)] opacity-80" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative">
        <SignIn
          fallbackRedirectUrl={`/dashboard`}
          signUpFallbackRedirectUrl={`/dashboard`}
          withSignUp={true}
        />
      </div>
    </div>
  );
} 