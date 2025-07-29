import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '',
  disabled = false
}: ButtonProps) {
  const baseStyles = 'rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-emerald-600/90 hover:bg-emerald-600 text-white backdrop-blur-sm disabled:hover:bg-emerald-600/90',
    secondary: 'border border-white/[.08] bg-white/[.02] hover:bg-white/[.05] text-white backdrop-blur-sm disabled:hover:bg-white/[.02]'
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
} 