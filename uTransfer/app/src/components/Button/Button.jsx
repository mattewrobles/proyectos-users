/**
 * Button — uTransfer Design System
 *
 * Extracted from Figma: Utransfer_D_S / node 40006005:26441
 * 168 variants: 4 sizes × 6 styles × 4 states × 2 content types
 *
 * Sizes  → Giant (56px) · Large (48px) · Medium (44px) · Small (36px)
 * Styles → Primary · Secondary · Tertiary · Clear · Error · Success
 * States → Default · Hover · Disabled · Outline
 */

// ── Size config (px values from Figma) ─────────────────────────────────────
const SIZE = {
  giant:  { h: 'h-14',     px: 'px-6',  py: 'py-4',  text: 'text-[18px]', icon: 'w-6 h-6' },
  large:  { h: 'h-12',     px: 'px-5',  py: 'py-[14px]', text: 'text-base', icon: 'w-5 h-5' },
  medium: { h: 'h-11',     px: 'px-4',  py: 'py-3',  text: 'text-sm', icon: 'w-[18px] h-[18px]' },
  small:  { h: 'h-9',      px: 'px-3',  py: 'py-2',  text: 'text-xs', icon: 'w-4 h-4' },
}

// ── Style config (exact hex from Figma) ────────────────────────────────────
const STYLE = {
  primary:   { bg: 'bg-[#2b1c45]', text: 'text-white', hover: 'hover:bg-[#121213]' },
  secondary: { bg: 'bg-[#d9016c]', text: 'text-white', hover: 'hover:bg-[#b80059]' },
  tertiary:  { bg: 'bg-[#151516]', text: 'text-[#f9fafb]', hover: 'hover:bg-[#2a2a2d]' },
  clear:     { bg: 'bg-transparent', text: 'text-[#f9fafb]', hover: 'hover:bg-white/10' },
  error:     { bg: 'bg-[#e42131]', text: 'text-white', hover: 'hover:bg-[#c41929]' },
  success:   { bg: 'bg-[#34c759]', text: 'text-white', hover: 'hover:bg-[#28a046]' },
}

// ── Outline state (all styles share this — from Figma Outline state) ───────
const OUTLINE_STYLE = 'bg-transparent border border-[#313131] text-[#e1e4e8] hover:border-[#525252]'

// ── Disabled state ─────────────────────────────────────────────────────────
const DISABLED_STYLE = 'bg-[#525252] text-[#7c8287] cursor-not-allowed pointer-events-none'

export function Button({
  label = 'Button',
  size = 'giant',
  variant = 'primary',   // primary | secondary | tertiary | clear | error | success
  outline = false,        // true = Outline state
  disabled = false,
  iconLeft = null,        // React node
  iconRight = null,       // React node
  iconOnly = false,       // Only Icons content type
  onClick,
  className = '',
  ...props
}) {
  const s = SIZE[size] || SIZE.giant
  const v = STYLE[variant] || STYLE.primary

  // Determine classes by state
  let stateClasses
  if (disabled) {
    stateClasses = DISABLED_STYLE
  } else if (outline) {
    stateClasses = OUTLINE_STYLE
  } else {
    stateClasses = `${v.bg} ${v.text} ${v.hover}`
  }

  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-medium leading-none',
    'rounded-[20px]',              // cornerRadius=20 from Figma (all sizes)
    'transition-colors duration-150',
    'select-none',
    s.h,
    iconOnly ? `${s.px}` : `${s.px}`,
    s.text,
    stateClasses,
    'w-full',                      // FILL horizontal — matches Figma default
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      className={base}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {iconLeft && (
        <span className={`shrink-0 ${s.icon}`} aria-hidden="true">
          {iconLeft}
        </span>
      )}

      {!iconOnly && (
        <span className="truncate">{label}</span>
      )}

      {iconOnly && !iconLeft && !iconRight && (
        // icon-only placeholder slot
        <span className={`shrink-0 ${s.icon}`} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="9" />
          </svg>
        </span>
      )}

      {iconRight && (
        <span className={`shrink-0 ${s.icon}`} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  )
}
