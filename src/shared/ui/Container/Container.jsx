export function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-container px-6 ${className}`}>
      {children}
    </div>
  )
}
