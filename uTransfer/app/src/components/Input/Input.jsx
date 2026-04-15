/**
 * Input — uTransfer Design System
 * Figma: 40006005:22203 — 36 variants (9 states × 2 sizes × 2 styles)
 *
 * States → Default · Filled · Hover · Focus · Disabled
 *          Success · Info · Warning · Error
 * Styles → Outline (transparent bg) · Filled (solid tinted bg)
 * Sizes  → Large · Medium (both h=56, identical in Figma)
 *
 * Field specs: h=56, px=12, py=16, cornerRadius=20, gap=12
 * Stroke weight: 0.5px
 */

// ── Outline style: transparent bg, border only ─────────────────────────────
const OUTLINE_STATES = {
  default:  { border: '#313131', textColor: '#7c8287',  helperColor: '#7c8287' },
  filled:   { border: '#3a3a3a', textColor: '#f9fafb',  helperColor: '#7c8287' },
  hover:    { border: '#e1e4e8', textColor: '#7c8287',  helperColor: '#7c8287' },
  focus:    { border: '#958da3', textColor: '#f9fafb',  helperColor: '#958da3' },
  disabled: { border: '#222222', textColor: '#525252',  helperColor: '#7c8287' },
  success:  { border: '#5dd27a', textColor: '#f9fafb',  helperColor: '#77d990' },
  info:     { border: '#3395ff', textColor: '#f9fafb',  helperColor: '#54a6ff' },
  warning:  { border: '#ffd633', textColor: '#f9fafb',  helperColor: '#ffdd54' },
  error:    { border: '#eb2e3e', textColor: '#f9fafb',  helperColor: '#ff8892' },
}

// ── Filled style: solid bg per state ──────────────────────────────────────
const FILLED_STATES = {
  default:  { bg: '#191b1e', border: '#313131', textColor: '#7c8287',  helperColor: '#7c8287' },
  filled:   { bg: '#191b1e', border: '#3a3a3a', textColor: '#f9fafb',  helperColor: '#7c8287' },
  hover:    { bg: '#191b1e', border: '#e1e4e8', textColor: '#7c8287',  helperColor: '#7c8287' },
  focus:    { bg: '#edeffe', border: '#958da3', textColor: '#28292a',  helperColor: '#958da3' },
  disabled: { bg: '#191b1e', border: '#222222', textColor: '#525252',  helperColor: '#7c8287' },
  success:  { bg: '#ebf9ee', border: '#5dd27a', textColor: '#28292a',  helperColor: '#77d990' },
  info:     { bg: '#e6f2ff', border: '#3395ff', textColor: '#28292a',  helperColor: '#54a6ff' },
  warning:  { bg: '#fffae6', border: '#ffd633', textColor: '#28292a',  helperColor: '#ffdd54' },
  error:    { bg: '#fffaf9', border: '#eb2e3e', textColor: '#28292a',  helperColor: '#ff8892' },
}

export function Input({
  label,
  placeholder = 'Placeholder',
  helperText,
  value,
  onChange,
  state = 'default',     // default|filled|hover|focus|disabled|success|info|warning|error
  size = 'large',        // large|medium
  inputStyle = 'outline', // outline|filled
  iconLeft = null,
  iconRight = null,
  type = 'text',
  id,
  className = '',
  ...props
}) {
  const isDisabled = state === 'disabled'
  const cfg = inputStyle === 'filled'
    ? (FILLED_STATES[state] ?? FILLED_STATES.default)
    : (OUTLINE_STATES[state] ?? OUTLINE_STATES.default)

  const fieldBg = inputStyle === 'filled' ? cfg.bg : 'transparent'

  return (
    <div
      className={`flex flex-col w-full ${className}`}
      style={{ gap: 8, opacity: isDisabled ? 0.6 : 1 }}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-[14px] leading-[19px] font-medium text-[#f9fafb]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {label}
        </label>
      )}

      {/* Field */}
      <div
        className="flex items-center"
        style={{
          height: 56,
          borderRadius: 20,
          paddingLeft: 12,
          paddingRight: 12,
          gap: 12,
          background: fieldBg,
          border: `0.5px solid ${cfg.border}`,
          boxSizing: 'border-box',
        }}
      >
        {/* Left icon */}
        {iconLeft && (
          <span
            className="shrink-0 flex items-center justify-center"
            style={{ width: 24, height: 24, color: '#7c8287' }}
          >
            {iconLeft}
          </span>
        )}

        {/* Native input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={isDisabled}
          className="flex-1 min-w-0 bg-transparent outline-none"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 16,
            lineHeight: '22px',
            fontWeight: 400,
            color: cfg.textColor,
            caretColor: cfg.border,
          }}
          // placeholder color via CSS variable trick — tailwind class handles it
          {...props}
        />

        {/* Right icon */}
        {iconRight && (
          <span
            className="shrink-0 flex items-center justify-center"
            style={{ width: 24, height: 24, color: '#7c8287' }}
          >
            {iconRight}
          </span>
        )}
      </div>

      {/* Helper text */}
      {helperText && (
        <p
          className="text-[12px] leading-[16px]"
          style={{ fontFamily: 'Inter, sans-serif', color: cfg.helperColor }}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
