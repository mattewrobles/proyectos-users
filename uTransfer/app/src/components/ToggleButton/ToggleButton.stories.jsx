import { useState } from 'react'
import { ToggleButton } from './ToggleButton'

export default {
  title: 'DS / ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Segmented control de 2 opciones. Figma `40006032:6871`.',
      },
    },
  },
}

// ── Playground ─────────────────────────────────────────────────────────────
export const Playground = {
  render: () => {
    const [active, setActive] = useState('Enviar')
    return (
      <div className="max-w-sm">
        <ToggleButton
          options={[{ label: 'Enviar' }, { label: 'Recibir' }]}
          value={active}
          onChange={setActive}
        />
        <p className="text-[#484848] text-xs mt-3 text-center">Activo: {active}</p>
      </div>
    )
  },
}

// ── Ambos estados ──────────────────────────────────────────────────────────
export const BothStates = {
  name: 'Both States',
  render: () => (
    <div className="max-w-sm flex flex-col gap-4">
      <div>
        <p className="text-[#484848] text-xs mb-2">Selected=On (Item 1 activo)</p>
        <ToggleButton
          options={[{ label: 'Item 1' }, { label: 'Item 2' }]}
          value="Item 1"
        />
      </div>
      <div>
        <p className="text-[#484848] text-xs mb-2">Selected=Off (Item 2 activo)</p>
        <ToggleButton
          options={[{ label: 'Item 1' }, { label: 'Item 2' }]}
          value="Item 2"
        />
      </div>
    </div>
  ),
}

// ── Casos de uso reales ────────────────────────────────────────────────────
const ArrowUpRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ArrowDownLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M17 7L7 17M7 17h10M7 17V7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const UseCases = {
  name: 'Use Cases',
  render: () => {
    const [tab1, setTab1] = useState('Enviar')
    const [tab2, setTab2] = useState('Nacional')
    const [tab3, setTab3] = useState('Upoints')

    return (
      <div className="max-w-sm flex flex-col gap-6">
        <div>
          <p className="text-[#484848] text-xs mb-2">Enviar / Recibir</p>
          <ToggleButton
            options={[
              { label: 'Enviar',  icon: <ArrowUpRight /> },
              { label: 'Recibir', icon: <ArrowDownLeft /> },
            ]}
            value={tab1}
            onChange={setTab1}
          />
        </div>
        <div>
          <p className="text-[#484848] text-xs mb-2">Nacional / Internacional</p>
          <ToggleButton
            options={[{ label: 'Nacional' }, { label: 'Internacional' }]}
            value={tab2}
            onChange={setTab2}
          />
        </div>
        <div>
          <p className="text-[#484848] text-xs mb-2">Juegos</p>
          <ToggleButton
            options={[{ label: 'Upoints' }, { label: 'Gift Cards' }]}
            value={tab3}
            onChange={setTab3}
          />
        </div>
      </div>
    )
  },
}
