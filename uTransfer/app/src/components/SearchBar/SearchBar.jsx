/**
 * SearchBar — uTransfer Design System
 * Figma: 40006093:8434 — 10 variants (5 states × 2 forms)
 *
 * Specs: w=320 (fluid), h=48, r=24 (full pill), px=16, py=12, gap=12
 *
 * States: enabled | enabled-value | hover | focus | disabled
 * Forms:
 *   off — dark outlined (#151516 bg)
 *   on  — gray filled  (#767680 bg) — iOS spotlight style
 *
 * Right slot:
 *   enabled/disabled → ⌘K shortcut hint
 *   enabled-value/focus → × clear button
 *   hover → empty
 */

// ── Icons ─────────────────────────────────────────────────────────────────────
const SearchIcon = ({ color = '#e1e4e8' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
)

const ClearIcon = ({ color = '#e1e4e8' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const CommandIcon = ({ color = '#abb1b5' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
  </svg>
)

// ── State config ──────────────────────────────────────────────────────────────
// [bg, border, borderWidth, textColor, rightSlot]
const STATE_CONFIG = {
  off: {
    enabled:        { bg: '#151516', border: '#404040', bw: 1, textColor: '#abb1b5', right: 'shortcut' },
    'enabled-value':{ bg: '#151516', border: '#404040', bw: 1, textColor: '#f9fafb', right: 'clear'    },
    hover:          { bg: '#151516', border: '#404040', bw: 1, textColor: '#abb1b5', right: 'none'     },
    focus:          { bg: '#151516', border: '#d9016c', bw: 2, textColor: '#7c8287', right: 'clear'    },
    disabled:       { bg: '#151516', border: '#262626', bw: 1, textColor: '#525252', right: 'shortcut' },
  },
  on: {
    enabled:        { bg: '#151516', border: '#1a1a1a', bw: 1, textColor: '#abb1b5', right: 'shortcut' },
    'enabled-value':{ bg: '#767680', border: null,      bw: 0, textColor: '#f9fafb', right: 'clear'    },
    hover:          { bg: '#767680', border: null,      bw: 0, textColor: '#abb1b5', right: 'none'     },
    focus:          { bg: '#767680', border: '#d9016c', bw: 2, textColor: '#f9fafb', right: 'clear'    },
    disabled:       { bg: '#767680', border: null,      bw: 0, textColor: '#525252', right: 'shortcut' },
  },
}

// ── Shortcut hint — ⌘K ───────────────────────────────────────────────────────
function ShortcutHint({ disabled }) {
  const color = disabled ? '#262626' : '#abb1b5'
  return (
    <div className="flex items-center shrink-0" style={{ gap: 4 }}>
      {/* ⌘ */}
      <div className="flex items-center justify-center" style={{ width: 24, height: 24, background: '#121213', borderRadius: 8 }}>
        <CommandIcon color={color} />
      </div>
      {/* K */}
      <div className="flex items-center justify-center" style={{ width: 24, height: 24, background: '#121213', borderRadius: 8 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color, lineHeight: 1 }}>
          K
        </span>
      </div>
    </div>
  )
}

/**
 * SearchBar
 *
 * @param {string}   state       - 'enabled' | 'enabled-value' | 'hover' | 'focus' | 'disabled'
 * @param {string}   form        - 'off' | 'on'
 * @param {string}   value       - controlled input value
 * @param {function} onChange    - (e) => void
 * @param {function} onClear     - () => void — fired when × is clicked
 * @param {string}   placeholder
 * @param {string}   className
 */
export function SearchBar({
  state = 'enabled',
  form = 'off',
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
}) {
  const cfg = STATE_CONFIG[form]?.[state] ?? STATE_CONFIG.off.enabled
  const isDisabled = state === 'disabled'

  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        height: 48,
        borderRadius: 24,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 12,
        background: cfg.bg,
        border: cfg.border ? `${cfg.bw}px solid ${cfg.border}` : 'none',
        boxSizing: 'border-box',
        opacity: isDisabled ? 0.7 : 1,
      }}
    >
      {/* Search icon */}
      <SearchIcon />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        className="flex-1 min-w-0 bg-transparent outline-none"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '19px',
          color: cfg.textColor,
          caretColor: '#d9016c',
        }}
      />

      {/* Right slot */}
      {cfg.right === 'shortcut' && <ShortcutHint disabled={isDisabled} />}

      {cfg.right === 'clear' && (
        <button
          onClick={onClear}
          className="flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 24, height: 24 }}
        >
          <ClearIcon color="#e1e4e8" />
        </button>
      )}
    </div>
  )
}

/**
 * SearchBarControlled — fully managed version with auto state transitions
 */
export function SearchBarControlled({ form = 'off', placeholder = 'Search...', onSearch, className = '' }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const state = !focused && !value
    ? 'enabled'
    : focused && !value
    ? 'focus'
    : !focused && value
    ? 'enabled-value'
    : 'focus' // focused + value

  const handleClear = () => {
    setValue('')
    onSearch?.('')
  }

  return (
    <SearchBar
      state={state}
      form={form}
      value={value}
      onChange={(e) => { setValue(e.target.value); onSearch?.(e.target.value) }}
      onClear={handleClear}
      placeholder={placeholder}
      className={className}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

// Need useState import
import { useState } from 'react'
