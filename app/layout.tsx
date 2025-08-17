import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from './components/Header'
import { AuthSetup } from './components/AuthSetup'
import './globals.css'
import { dark } from '@clerk/themes'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  colorScheme: 'dark light',
}

export const metadata: Metadata = {
  title: {
    default: 'Regulatory Compliance Dashboard',
    template: '%s | Regulatory Compliance Dashboard',
  },
  description: 'Modern regulatory compliance management system with team collaboration and document tracking',
  keywords: [
    'regulatory',
    'compliance',
    'dashboard',
    'team collaboration',
    'document management',
    'requirements tracking',
  ],
  authors: [{ name: 'Your Organization' }],
  creator: 'Your Organization',
  publisher: 'Your Organization',
  applicationName: 'Regulatory Compliance Dashboard',
  category: 'Business',
  classification: 'Business Application',
  robots: {
    index: false, // Set to true for production if you want search indexing
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://yourapp.com',
    siteName: 'Regulatory Compliance Dashboard',
    title: 'Regulatory Compliance Dashboard',
    description: 'Modern regulatory compliance management system',
    images: [
      {
        url: '/og-image.jpg', // Add your OpenGraph image
        width: 1200,
        height: 630,
        alt: 'Regulatory Compliance Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regulatory Compliance Dashboard',
    description: 'Modern regulatory compliance management system',
    images: ['/twitter-image.jpg'], // Add your Twitter card image
  },
  manifest: '/manifest.json', // Add a web app manifest
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#09090b' },
    ],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3b82f6',
          colorText: '#ffffff',
          colorBackground: '#09090b',
          colorInputBackground: '#18181b',
          colorInputText: '#ffffff',
        },
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm font-medium',
          card: 'bg-zinc-900 border-zinc-800',
          headerTitle: 'text-white',
          headerSubtitle: 'text-zinc-400',
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html 
        lang="en" 
        className="dark h-full scroll-smooth"
        suppressHydrationWarning
      >
        <body 
          className={`
            ${geistSans.variable} 
            ${geistMono.variable} 
            h-full 
            bg-zinc-950 
            text-white 
            antialiased 
            selection:bg-blue-600/20 
            selection:text-blue-100
            overflow-x-hidden
          `}
        >
          <AuthSetup />
          
          {/* Skip to main content for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Skip to main content
          </a>

          {/* Background gradient overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black -z-10" />
          
          {/* Subtle grid pattern */}
          <div 
            className="fixed inset-0 opacity-[0.02] -z-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          <div className="flex min-h-screen flex-col">
            <Header />
            
            <main 
              id="main-content"
              className="flex-1 relative"
              role="main"
            >
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span>© 2025 Regulatory Compliance Dashboard</span>
                    <span>•</span>
                    <span>Secure & Compliant</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <a 
                      href="/privacy" 
                      className="text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                    <a 
                      href="/terms" 
                      className="text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      Terms of Service
                    </a>
                    <a 
                      href="/support" 
                      className="text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      Support
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>

          {/* Loading indicator for page transitions */}
          <div 
            id="loading-indicator" 
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 origin-left transition-transform duration-300 z-50"
            style={{ display: 'none' }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}