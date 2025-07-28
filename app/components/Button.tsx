import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 transition-all duration-200'
  
  const variants = {
    primary: 'bg-[#6c47ff]/90 hover:bg-[#6c47ff] text-white backdrop-blur-sm',
    secondary: 'border border-white/[.08] bg-white/[.02] hover:bg-white/[.05] text-white backdrop-blur-sm'
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
} 