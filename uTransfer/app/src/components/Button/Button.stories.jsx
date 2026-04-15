import { Button } from './Button'

/**
 * uTransfer DS — Button
 *
 * Fiel a Figma: Utransfer_D_S / node 40006005:26441
 * 168 variants total. Aquí documentamos todas las combinaciones relevantes.
 */
export default {
  title: 'DS / Button',
  component: Button,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',  value: '#0d0d12' },
        { name: 'light', value: '#f5f5f7' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    docs: {
      description: {
        component:
          'Botón principal del DS de uTransfer. 4 tamaños × 6 estilos × 4 estados. Extraído de Figma nodo `40006005:26441`.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['giant', 'large', 'medium', 'small'],
      description: 'Giant=56px · Large=48px · Medium=44px · Small=36px',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'clear', 'error', 'success'],
    },
    outline:   { control: 'boolean' },
    disabled:  { control: 'boolean' },
    iconOnly:  { control: 'boolean' },
    label:     { control: 'text' },
  },
}

// ── Playground ────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    label:   'Depositar',
    size:    'giant',
    variant: 'primary',
  },
}

// ── Estilos × Estado Default ──────────────────────────────────────────────
export const AllStyles = {
  name: 'Styles — Default state',
  render: () => (
    <div className="flex flex-col gap-3 p-6 max-w-sm bg-[#0d0d12]">
      <Button label="Primary"   variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Tertiary"  variant="tertiary" />
      <Button label="Clear"     variant="clear" />
      <Button label="Error"     variant="error" />
      <Button label="Success"   variant="success" />
    </div>
  ),
}

// ── States — Primary ──────────────────────────────────────────────────────
export const PrimaryStates = {
  name: 'Primary — All states',
  render: () => (
    <div className="flex flex-col gap-3 p-6 max-w-sm bg-[#0d0d12]">
      <div className="text-[#5a5a72] text-xs font-medium uppercase tracking-widest mb-1">Default</div>
      <Button label="Continuar"  variant="primary" />

      <div className="text-[#5a5a72] text-xs font-medium uppercase tracking-widest mt-2 mb-1">Hover (simulado)</div>
      <button className="w-full h-14 rounded-[20px] bg-[#121213] text-white text-[18px] font-medium transition-colors">
        Continuar
      </button>

      <div className="text-[#5a5a72] text-xs font-medium uppercase tracking-widest mt-2 mb-1">Disabled</div>
      <Button label="Continuar"  variant="primary" disabled />

      <div className="text-[#5a5a72] text-xs font-medium uppercase tracking-widest mt-2 mb-1">Outline</div>
      <Button label="Continuar"  variant="primary" outline />
    </div>
  ),
}

// ── Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  name: 'Sizes — Primary',
  render: () => (
    <div className="flex flex-col gap-3 p-6 max-w-sm bg-[#0d0d12]">
      <div className="flex items-center gap-3">
        <span className="text-[#5a5a72] text-xs w-16">Giant 56</span>
        <Button label="Giant"  size="giant"  variant="primary" className="flex-1" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[#5a5a72] text-xs w-16">Large 48</span>
        <Button label="Large"  size="large"  variant="primary" className="flex-1" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[#5a5a72] text-xs w-16">Medium 44</span>
        <Button label="Medium" size="medium" variant="primary" className="flex-1" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[#5a5a72] text-xs w-16">Small 36</span>
        <Button label="Small"  size="small"  variant="primary" className="flex-1" />
      </div>
    </div>
  ),
}

// ── With Icons ────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const WithIcons = {
  name: 'Icons + Text',
  render: () => (
    <div className="flex flex-col gap-3 p-6 max-w-sm bg-[#0d0d12]">
      <Button label="Enviar dinero" variant="primary"   iconLeft={<ArrowRight />} />
      <Button label="Volver"        variant="tertiary"  iconLeft={<ArrowLeft />} />
      <Button label="Continuar"     variant="primary"   iconRight={<ArrowRight />} />
      <Button label="Secondary"     variant="secondary" iconLeft={<ArrowRight />} />
    </div>
  ),
}

// ── Icon Only ─────────────────────────────────────────────────────────────
export const IconOnly = {
  name: 'Only Icons',
  render: () => (
    <div className="flex gap-3 p-6 bg-[#0d0d12]">
      <Button variant="primary"   iconOnly size="giant"  iconLeft={<ArrowRight />} className="w-14" />
      <Button variant="secondary" iconOnly size="large"  iconLeft={<ArrowRight />} className="w-12" />
      <Button variant="tertiary"  iconOnly size="medium" iconLeft={<ArrowRight />} className="w-11" />
      <Button variant="clear"     iconOnly size="small"  iconLeft={<ArrowRight />} className="w-9" />
    </div>
  ),
}

// ── Full grid — todas las combinaciones ───────────────────────────────────
export const FullGrid = {
  name: 'Full DS Grid',
  render: () => {
    const variants = ['primary', 'secondary', 'tertiary', 'clear', 'error', 'success']
    const sizes    = ['giant', 'large', 'medium', 'small']

    return (
      <div className="p-8 bg-[#0d0d12] overflow-auto">
        <table className="border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="text-[#5a5a72] text-xs text-left pr-4 pb-2"></th>
              {sizes.map(s => (
                <th key={s} className="text-[#5a5a72] text-xs capitalize pb-2 text-center">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map(v => (
              <tr key={v}>
                <td className="text-[#5a5a72] text-xs capitalize pr-4 py-1">{v}</td>
                {sizes.map(s => (
                  <td key={s} className="py-1 px-1 min-w-[120px]">
                    <Button label={v.charAt(0).toUpperCase() + v.slice(1)} size={s} variant={v} className="w-full" />
                  </td>
                ))}
              </tr>
            ))}
            {/* Disabled row */}
            <tr>
              <td className="text-[#5a5a72] text-xs pr-4 py-1">disabled</td>
              {sizes.map(s => (
                <td key={s} className="py-1 px-1 min-w-[120px]">
                  <Button label="Disabled" size={s} variant="primary" disabled className="w-full" />
                </td>
              ))}
            </tr>
            {/* Outline row */}
            <tr>
              <td className="text-[#5a5a72] text-xs pr-4 py-1">outline</td>
              {sizes.map(s => (
                <td key={s} className="py-1 px-1 min-w-[120px]">
                  <Button label="Outline" size={s} variant="primary" outline className="w-full" />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  },
}

// ── En pantalla móvil (393px) ─────────────────────────────────────────────
export const MobileContext = {
  name: 'Mobile (393px)',
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
  render: () => (
    <div className="w-[393px] min-h-screen bg-[#0d0d12] p-6 flex flex-col gap-4">
      <h2 className="text-[#f9fafb] text-2xl font-semibold mb-2">Enviar dinero</h2>
      <Button label="Continuar"   variant="primary" />
      <Button label="Cancelar"    variant="clear" />
    </div>
  ),
}
