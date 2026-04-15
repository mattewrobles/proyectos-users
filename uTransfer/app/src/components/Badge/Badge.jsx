/**
 * Badge — uTransfer DS / node 40006033:12034
 * h=22 · radius=10 · px=10 · py=2 · Inter Regular 12px
 */

const VARIANTS = {
  default:     { bg: 'bg-[#090909]', text: 'text-white' },
  secondary:   { bg: 'bg-[#787880]', text: 'text-[#ebebf5]' },
  destructive: { bg: 'bg-[#e5484d]', text: 'text-white' },
  success:     { bg: 'bg-[#34c759]', text: 'text-white' },
  outline:     { bg: 'bg-transparent border border-[#313131]', text: 'text-[#ebebf5]' },
  warning:     { bg: 'bg-[#f59e0b]', text: 'text-black' },
}

export function Badge({ label, variant = 'default', dot = false, className = '' }) {
  const v = VARIANTS[variant] || VARIANTS.default

  if (dot) {
    return (
      <span
        className={`inline-block w-2 h-2 rounded-full ${v.bg} ${className}`}
        aria-label={label}
      />
    )
  }

  return (
    <span
      className={`
        inline-flex items-center justify-center
        h-[22px] px-[10px] rounded-[10px]
        text-xs font-normal leading-none
        ${v.bg} ${v.text} ${className}
      `}
    >
      {label}
    </span>
  )
}
