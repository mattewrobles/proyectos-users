/**
 * Switch Standalone — uTransfer Design System
 * Figma: 40006005:25048 — 8 variants (2 states × 2 sizes × 2 selected)
 *
 * Large:  outer hit area 54×48, track 54×32, thumb 28×28, thumb-travel 22px
 * Small:  outer hit area 44×32, track 44×22, thumb 18×18, thumb-travel 22px
 *
 * Off:  track rgba(120,120,128,0.32) · thumb #ffffff
 * On:   track #d9016c (brand magenta) · thumb #ffffff
 * Disabled (any): toggle opacity 0.40
 */

const SIZE = {
  large: {
    outerW:    54,
    outerH:    48,
    trackW:    54,
    trackH:    32,
    thumbSize: 28,
    travel:    22,
  },
  small: {
    outerW:    44,
    outerH:    32,
    trackW:    44,
    trackH:    22,
    thumbSize: 18,
    travel:    22,
  },
}

export function Switch({
  selected  = false,
  size      = 'large',
  disabled  = false,
  label,
  onChange,
}) {
  const s = SIZE[size] || SIZE.large

  const trackColor = selected ? '#d9016c' : 'rgba(120,120,128,0.32)'

  return (
    <label
      className="inline-flex items-center gap-3"
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {/* Hit target — matches Figma outer frame dimensions */}
      <button
        role="switch"
        aria-checked={selected}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!selected)}
        className="flex items-center justify-center shrink-0 focus-visible:outline-none"
        style={{
          width:      s.outerW,
          height:     s.outerH,
          background: 'none',
          border:     'none',
          padding:    0,
        }}
      >
        {/* Toggle track */}
        <div
          style={{
            position:   'relative',
            width:      s.trackW,
            height:     s.trackH,
            borderRadius: 9999,
            background:   trackColor,
            padding:      2,
            boxSizing:    'border-box',
            opacity:      disabled ? 0.4 : 1,
            transition:   'background 200ms ease',
          }}
        >
          {/* Thumb */}
          <div
            style={{
              width:      s.thumbSize,
              height:     s.thumbSize,
              borderRadius: 9999,
              background: '#ffffff',
              boxShadow:  '0 2px 4px rgba(0,0,0,0.3)',
              transform:  selected ? `translateX(${s.travel}px)` : 'translateX(0)',
              transition: 'transform 200ms ease',
            }}
          />
        </div>
      </button>

      {label && (
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize:   14,
            fontWeight: 400,
            color:      disabled ? '#525252' : '#f9fafb',
          }}
        >
          {label}
        </span>
      )}
    </label>
  )
}
