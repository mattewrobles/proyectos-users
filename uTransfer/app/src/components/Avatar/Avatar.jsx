/**
 * Avatar — uTransfer DS / node 40006034:14091
 * Variants: Initials · Icon · Photo
 * Sizes: 18 · 24 · 32 · 40 · 48 · 64
 * Radius: Circular · Rounded · Off
 *
 * Specs from Figma (48 Circular Initials):
 *   bg=#141414, cornerRadius=30, text=white 12px
 */

const SIZE = {
  18: { wh: 'w-[18px] h-[18px]', text: 'text-[8px]',  icon: 10 },
  24: { wh: 'w-6 h-6',           text: 'text-[10px]', icon: 12 },
  32: { wh: 'w-8 h-8',           text: 'text-xs',     icon: 14 },
  40: { wh: 'w-10 h-10',         text: 'text-sm',     icon: 16 },
  48: { wh: 'w-12 h-12',         text: 'text-sm',     icon: 20 },
  64: { wh: 'w-16 h-16',         text: 'text-base',   icon: 24 },
}

const RADIUS = {
  circular: 'rounded-full',
  rounded:  'rounded-[12px]',
  off:      'rounded-none',
}

export function Avatar({
  initials,
  src,
  icon,
  size = 48,
  radius = 'circular',
  bg = '#141414',
  className = '',
}) {
  const s = SIZE[size] || SIZE[48]
  const r = RADIUS[radius] || RADIUS.circular

  const base = `relative shrink-0 inline-flex items-center justify-center overflow-hidden ${s.wh} ${r} ${className}`

  if (src) {
    return (
      <div className={base} style={{ background: bg }}>
        <img src={src} alt={initials || ''} className="w-full h-full object-cover" />
      </div>
    )
  }

  if (icon) {
    return (
      <div className={base} style={{ background: bg }}>
        <span className="text-white" style={{ width: s.icon, height: s.icon }}>
          {icon}
        </span>
      </div>
    )
  }

  return (
    <div className={base} style={{ background: bg }}>
      <span className={`text-white font-semibold leading-none ${s.text}`}>
        {initials?.slice(0, 2).toUpperCase()}
      </span>
    </div>
  )
}
