const BASE =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-md cursor-pointer whitespace-nowrap no-underline transition-colors active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed'

const VARIANTS = {
  primary: 'bg-primary text-white shadow-card hover:enabled:bg-primary-hover',
  outline:
    'bg-transparent text-primary border-[1.5px] border-primary hover:enabled:bg-primary-soft',
  ghost: 'bg-transparent text-ink-muted hover:enabled:text-primary',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-[17px]',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
