import { useEffect, useState } from 'react'

// ── Icons ─────────────────────────────────────────────────────────────────────
const CheckIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const InfoIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)
const AlertIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const SuccessIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── State config ──────────────────────────────────────────────────────────────
const STATE_CONFIG = {
  default: {
    icon: (c) => <CheckIcon color={c} />,
    // per-style icon bg and text
    style1: { iconBg: '#191b1e', iconColor: '#e1e4e8', textColor: '#f9fafb', bg: '#121213', border: null },
    style2: { iconBg: '#191b1e', iconColor: '#e1e4e8', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style3: { iconBg: '#ffffff',  iconColor: '#484848', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style4: { iconBg: '#ffffff',  iconColor: '#484848', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style5: { iconBg: '#ffffff',  iconColor: '#484848', textColor: '#f9fafb', bg: '#121213', border: null },
  },
  info: {
    icon: (c) => <InfoIcon color={c} />,
    style1: { iconBg: '#0084ff', iconColor: '#ffffff', textColor: '#f9fafb', bg: '#121213', border: null },
    style2: { iconBg: '#4b85f5', iconColor: '#ffffff', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style3: { iconBg: '#ffffff',  iconColor: '#00336b', textColor: '#212020', bg: '#edf2fd', border: '#00336b' },
    style4: { iconBg: '#ffffff',  iconColor: '#0084ff', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style5: { iconBg: '#ffffff',  iconColor: '#00336b', textColor: '#f9fafb', bg: '#00336b', border: null },
  },
  success: {
    icon: (c) => <SuccessIcon color={c} />,
    style1: { iconBg: '#01e17b', iconColor: '#ffffff', textColor: '#f9fafb', bg: '#121213', border: null },
    style2: { iconBg: '#01e17b', iconColor: '#ffffff', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style3: { iconBg: '#ffffff',  iconColor: '#165425', textColor: '#212020', bg: '#e5fcf1', border: '#165425' },
    style4: { iconBg: '#ffffff',  iconColor: '#01e17b', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style5: { iconBg: '#ffffff',  iconColor: '#165425', textColor: '#f9fafb', bg: '#165425', border: null },
  },
  error: {
    icon: (c) => <AlertIcon color={c} />,
    style1: { iconBg: '#f04349', iconColor: '#ffffff', textColor: '#f9fafb', bg: '#121213', border: null },
    style2: { iconBg: '#f04349', iconColor: '#ffffff', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style3: { iconBg: '#ffffff',  iconColor: '#eb2e3e', textColor: '#212020', bg: '#fdecec', border: '#eb2e3e' },
    style4: { iconBg: '#ffffff',  iconColor: '#f04349', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style5: { iconBg: '#ffffff',  iconColor: '#eb2e3e', textColor: '#ffffff', bg: '#eb2e3e', border: null },
  },
  warning: {
    icon: (c) => <AlertIcon color={c} />,
    style1: { iconBg: '#f04349', iconColor: '#ffffff', textColor: '#f9fafb', bg: '#121213', border: null },
    style2: { iconBg: '#fdcd0f', iconColor: '#121213', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style3: { iconBg: '#ffffff',  iconColor: '#d97706', textColor: '#212020', bg: '#fffae8', border: '#d97706' },
    style4: { iconBg: '#ffffff',  iconColor: '#fdcd0f', textColor: '#f9fafb', bg: '#121213', border: '#404040' },
    style5: { iconBg: '#ffffff',  iconColor: '#d97706', textColor: '#f9fafb', bg: '#d97706', border: null },
  },
}

/**
 * Toast — Notification component
 * Figma: 40006032:6634 — 25 variants (5 styles × 5 states)
 *
 * Styles:
 *   1 — Solid dark (circular icon badge, no border)
 *   2 — Solid dark + border (pill icon badge)
 *   3 — Light tinted bg + colored border (white icon badge)
 *   4 — Dark + border + white icon bg (pill icon badge, colored icon stroke)
 *   5 — Colored bg (pill icon badge, white bg)
 *
 * States: default | info | success | error | warning
 *
 * Props:
 *   message   — text content
 *   style     — 1 | 2 | 3 | 4 | 5
 *   state     — 'default' | 'info' | 'success' | 'error' | 'warning'
 *   onClose   — callback when X is clicked
 *   duration  — auto-dismiss in ms (0 = no auto-dismiss)
 *   visible   — controlled visibility
 */
export function Toast({
  message = 'Mensaje de toast',
  style = 1,
  state = 'default',
  onClose,
  duration = 0,
  visible = true,
}) {
  const [show, setShow] = useState(visible)

  useEffect(() => { setShow(visible) }, [visible])

  useEffect(() => {
    if (!duration || !show) return
    const t = setTimeout(() => {
      setShow(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(t)
  }, [duration, show, onClose])

  if (!show) return null

  const stateKey = state.toLowerCase()
  const styleKey = `style${style}`
  const cfg = STATE_CONFIG[stateKey]?.[styleKey] ?? STATE_CONFIG.default.style1
  const iconEl = STATE_CONFIG[stateKey]?.icon?.(cfg.iconColor) ?? <CheckIcon color={cfg.iconColor} />
  const isStyle1 = style === 1

  return (
    <div
      className="flex items-center gap-3 px-4"
      style={{
        width: 350,
        height: 56,
        borderRadius: 16,
        background: cfg.bg,
        border: cfg.border ? `1px solid ${cfg.border}` : 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* Icon badge */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 32,
          height: 32,
          borderRadius: isStyle1 ? 50 : 9999,
          background: cfg.iconBg,
        }}
      >
        {iconEl}
      </div>

      {/* Message */}
      <span
        className="flex-1 text-[14px] leading-[19px]"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          color: cfg.textColor,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {message}
      </span>

      {/* Close */}
      {onClose && (
        <button
          onClick={() => { setShow(false); onClose() }}
          className="flex items-center justify-center shrink-0 transition-opacity hover:opacity-70"
          style={{ color: cfg.textColor, opacity: 0.6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}

/**
 * ToastProvider — positions toasts at the top of the screen
 * Usage: wrap your app, then use the `useToast` hook
 */
export function ToastStack({ toasts = [], onClose }) {
  return (
    <div
      className="fixed top-5 left-1/2 flex flex-col gap-2 z-50"
      style={{ transform: 'translateX(-50%)' }}
    >
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={() => onClose?.(t.id)} />
      ))}
    </div>
  )
}
