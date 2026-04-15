/**
 * ToggleButton — uTransfer Design System
 *
 * Extraído de Figma: Utransfer_D_S / node 40006032:6871
 * Segmented control de 2 opciones.
 *
 * Specs:
 *   Container:  bg=#191b1e · cornerRadius=20 · padding=4px · gap=8px
 *   Tab activo: bg=#111111 · cornerRadius=16 · px=16 · py=8
 *   Tab inactivo: sin bg · cornerRadius=12
 *   Texto: Inter Semi Bold 14px
 *   Activo:   #f9fafb
 *   Inactivo: #484848
 */
export function ToggleButton({
  options = [{ label: 'Item 1' }, { label: 'Item 2' }],
  value,           // label del activo
  onChange,
  iconLeft = null,
  iconRight = null,
  className = '',
}) {
  return (
    <div
      className={`flex items-center gap-2 p-1 rounded-[20px] bg-[#191b1e] w-full ${className}`}
    >
      {options.map(({ label, icon }) => {
        const isActive = label === value
        return (
          <button
            key={label}
            onClick={() => onChange?.(label)}
            className={[
              'flex-1 flex items-center justify-center gap-2',
              'py-2 px-4 h-12',
              'text-sm font-semibold leading-none',
              'transition-all duration-200',
              isActive
                ? 'bg-[#111111] rounded-[16px] text-[#f9fafb]'
                : 'rounded-[12px] text-[#484848] hover:text-[#7b7b7b]',
            ].join(' ')}
          >
            {(icon || iconLeft) && (
              <span className="w-6 h-6 shrink-0" aria-hidden="true">
                {icon || iconLeft}
              </span>
            )}
            {label}
            {iconRight && (
              <span className="w-6 h-6 shrink-0" aria-hidden="true">
                {iconRight}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
