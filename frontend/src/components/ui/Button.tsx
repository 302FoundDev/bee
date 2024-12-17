import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined' | 'exotic' | 'transparent' | 'gradient' | 'base' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'icon'
  className?: string
  disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'secondary',
  size = 'md',
  className = 'w-full',
  disabled = false,
  ...props
}: ButtonProps) => {

  const def = 'px-5 py-1 transition ease-in-out'

  const variants = {
    primary: 'bg-green-700 hover:bg-green-800',
    secondary: 'bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2',
    danger: 'bg-red-700 hover:bg-red-800',
    outlined: 'border-2 border-pink-700 hover:bg-pink-700 hover:text-white',
    exotic: 'bg-indigo-700 hover:bg-indigo-800',
    transparent: 'bg-transparent border border-zinc-500 hover:bg-neutral-800',
    gradient: 'font-medium text-neutral-100 from-indigo-600 via-pink-600 to-purple-600 bg-gradient-to-r',
    base: 'rounded-md w-full px-4 py-1.5 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800 dark:hover:text-neutral-100 dark:hover:bg-neutral-850',
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  }

  const sizeVariants = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    xxl: 'text-2xl',
    icon: 'h-10 w-10',
  }

  const disabledStyles = disabled ? 'bg-gray-400 cursor-not-allowed' : ''

  return (
    <button
      type={type}
      onClick={!disabled ? onClick : undefined}
      className={clsx(
        def,
        variants[variant],
        sizeVariants[size],
        disabledStyles,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
