import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes'

export default function SignInPage() {

  return (
    <div className="min-h-screen flex items-center justify-center h-screen">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <SignIn
        // Redirect URLs
        fallbackRedirectUrl={`/dashboard`}
        signUpFallbackRedirectUrl={`/dashboard`}
        // Enable sign-up within the same component
        withSignUp={true}
      />
    </div>
  );
} 