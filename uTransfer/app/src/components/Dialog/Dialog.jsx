import { Button } from '../Button/Button'

/**
 * Dialog — Modal/overlay component
 * Figma: 40006005:24889 — 16 variants
 * Container: w=343, cornerRadius=40, px/py=20, gap=16
 * Liquid Glass background: brand purple base + glass overlay
 */
export function Dialog({
  type = 'primary',         // 'primary' | 'critical'
  illustration = null,      // ReactNode — 88×88 slot
  title = 'Título',
  description = null,       // ReactNode or string — optional
  primaryAction = null,     // { label, onClick }
  secondaryAction = null,   // { label, onClick }
  onClose,
}) {
  const accentColor = type === 'critical' ? '#e42131' : '#2b1c45'
  const primaryBg   = type === 'critical' ? '#3d0a0e' : '#2b1c45'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog card */}
      <div
        className="relative w-[343px] flex flex-col items-center gap-4 p-5 rounded-[40px] overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Layer 1 — solid brand fill */}
        <div
          className="absolute inset-0 rounded-[40px]"
          style={{ background: accentColor, opacity: 0.92 }}
        />
        {/* Layer 2 — glass overlay */}
        <div
          className="absolute inset-0 rounded-[40px] backdrop-blur-xl"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        />
        {/* Layer 3 — inner border */}
        <div
          className="absolute inset-0 rounded-[40px]"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
        />

        {/* Content above layers */}
        <div className="relative w-full flex flex-col items-center gap-4">
          {/* Illustration slot */}
          {illustration && (
            <div
              className="flex items-center justify-center rounded-full overflow-hidden shrink-0"
              style={{ width: 88, height: 88, background: '#191b1e' }}
            >
              {illustration}
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col items-center gap-2 w-full text-center">
            <h2
              className="w-full text-[18px] leading-[24px] text-center text-[#f9fafb]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              {title}
            </h2>
            {description && (
              <p
                className="w-full text-[16px] leading-[22px] text-center text-[#ebebf5]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, opacity: 0.85 }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col gap-4 w-full pt-2">
              {primaryAction && (
                <button
                  onClick={primaryAction.onClick}
                  className="w-full h-14 rounded-[20px] text-[#f9fafb] text-[16px] font-semibold transition-opacity hover:opacity-90 active:opacity-75"
                  style={{ background: primaryBg, fontFamily: 'Inter, sans-serif' }}
                >
                  {primaryAction.label}
                </button>
              )}
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  className="w-full h-14 rounded-[20px] text-[#f9fafb] text-[16px] font-semibold transition-opacity hover:opacity-90 active:opacity-75"
                  style={{ background: '#151516', fontFamily: 'Inter, sans-serif' }}
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * DialogPreview — same as Dialog but without the fixed overlay,
 * useful for Storybook canvas previews.
 */
export function DialogPreview({
  type = 'primary',
  illustration = null,
  title = 'Título',
  description = null,
  primaryAction = null,
  secondaryAction = null,
}) {
  const accentColor = type === 'critical' ? '#e42131' : '#2b1c45'
  const primaryBg   = type === 'critical' ? '#3d0a0e' : '#2b1c45'

  return (
    <div
      className="relative w-[343px] flex flex-col items-center gap-4 p-5 rounded-[40px] overflow-hidden"
    >
      {/* Layer 1 */}
      <div
        className="absolute inset-0 rounded-[40px]"
        style={{ background: accentColor, opacity: 0.92 }}
      />
      {/* Layer 2 */}
      <div
        className="absolute inset-0 rounded-[40px] backdrop-blur-xl"
        style={{ background: 'rgba(0,0,0,0.45)' }}
      />
      {/* Layer 3 — inner border */}
      <div
        className="absolute inset-0 rounded-[40px]"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
      />

      <div className="relative w-full flex flex-col items-center gap-4">
        {illustration && (
          <div
            className="flex items-center justify-center rounded-full overflow-hidden shrink-0"
            style={{ width: 88, height: 88, background: '#191b1e' }}
          >
            {illustration}
          </div>
        )}

        <div className="flex flex-col items-center gap-2 w-full text-center">
          <h2
            className="w-full text-[18px] leading-[24px] text-center text-[#f9fafb]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="w-full text-[16px] leading-[22px] text-center text-[#ebebf5]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, opacity: 0.85 }}
            >
              {description}
            </p>
          )}
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col gap-4 w-full pt-2">
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="w-full h-14 rounded-[20px] text-[#f9fafb] text-[16px] font-semibold transition-opacity hover:opacity-90 active:opacity-75"
                style={{ background: primaryBg, fontFamily: 'Inter, sans-serif' }}
              >
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="w-full h-14 rounded-[20px] text-[#f9fafb] text-[16px] font-semibold transition-opacity hover:opacity-90 active:opacity-75"
                style={{ background: '#151516', fontFamily: 'Inter, sans-serif' }}
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
