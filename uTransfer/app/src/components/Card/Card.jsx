/**
 * Card — uTransfer DS / Figma "Card" component
 * 164×178 · radius=16 · px=py=16 · gap=26
 *
 * Dark:  bg=#191b1e (Generals/Input)
 * Light: bg=#f6f6f6
 *
 * Used for: balance display, transaction summary, crypto assets
 */

export function Card({
  title,
  subtitle,
  amount,
  delta,          // "+0.66%" — positive/negative
  icon,           // React node — top-left icon
  chart,          // React node — wave/sparkline
  dark = true,
  className = '',
  children,
}) {
  const bg    = dark ? 'bg-[#191b1e]' : 'bg-[#f6f6f6]'
  const titleC = dark ? 'text-[#f9fafb]' : 'text-[#191b1e]'
  const subC   = dark ? 'text-[#7c8287]' : 'text-[#7c8287]'
  const amtC   = dark ? 'text-[#dcd8d7]' : 'text-[#191b1e]'
  const iconBg = dark ? 'bg-black' : 'bg-black'

  const isPositive = delta?.startsWith('+')

  return (
    <div className={`flex flex-col gap-6 p-4 rounded-2xl w-[164px] ${bg} ${className}`}>

      {/* Title row */}
      <div className="flex items-center gap-2">
        {icon && (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
            <span className="text-white w-5 h-5">{icon}</span>
          </div>
        )}
        <div className="flex flex-col gap-0.5 min-w-0">
          {title && (
            <span className={`text-sm font-semibold leading-tight truncate ${titleC}`}>{title}</span>
          )}
          {subtitle && (
            <span className={`text-xs leading-tight truncate ${subC}`}>{subtitle}</span>
          )}
        </div>
      </div>

      {/* Chart slot */}
      {chart && (
        <div className="w-full h-[37px] shrink-0">
          {chart}
        </div>
      )}

      {/* Amount + delta */}
      {(amount || delta) && (
        <div className="flex items-center gap-4">
          {amount && (
            <span className={`text-sm font-semibold ${amtC}`}>{amount}</span>
          )}
          {delta && (
            <span className={`text-xs ${isPositive ? 'text-[#02bbb5]' : 'text-[#e42131]'}`}>
              {delta}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  )
}

/**
 * CardLarge — pantalla principal, balance total
 * Uso: home screen, wallet overview
 */
export function CardLarge({ title, subtitle, amount, badge, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 p-5 rounded-[24px] bg-[#191b1e] w-full ${className}`}>
      {(title || subtitle) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <p className="text-xs text-[#7c8287]">{title}</p>}
            {amount && <p className="text-3xl font-semibold text-[#f9fafb] mt-1">{amount}</p>}
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}
      {subtitle && <p className="text-sm text-[#7c8287]">{subtitle}</p>}
      {children}
    </div>
  )
}
