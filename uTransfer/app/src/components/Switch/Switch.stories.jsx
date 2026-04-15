import { useState } from 'react'
import { Switch } from './Switch'

export default {
  title: 'DS / Switch',
  component: Switch,
  parameters: {
    docs: { description: { component: 'Switch Standalone. Figma `40006005:25048`. 8 variants (2 states × 2 sizes × 2 selected). Off: rgba(120,120,128,0.32). On: #d9016c (brand magenta).' } },
  },
  argTypes: {
    size:     { control: 'select', options: ['small', 'large'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label:    { control: 'text' },
  },
}

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground = {
  render: (args) => {
    const [on, setOn] = useState(args.selected ?? false)
    return <Switch {...args} selected={on} onChange={setOn} />
  },
  args: { size: 'large', disabled: false, label: 'Label' },
}

// ── All 8 Variants ────────────────────────────────────────────────────────────
export const AllVariants = {
  name: 'All 8 variants',
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { label: 'Enabled · Off    · Large', selected: false, disabled: false, size: 'large' },
        { label: 'Enabled · On     · Large', selected: true,  disabled: false, size: 'large' },
        { label: 'Disabled · Off   · Large', selected: false, disabled: true,  size: 'large' },
        { label: 'Disabled · On    · Large', selected: true,  disabled: true,  size: 'large' },
        { label: 'Enabled · Off    · Small', selected: false, disabled: false, size: 'small' },
        { label: 'Enabled · On     · Small', selected: true,  disabled: false, size: 'small' },
        { label: 'Disabled · Off   · Small', selected: false, disabled: true,  size: 'small' },
        { label: 'Disabled · On    · Small', selected: true,  disabled: true,  size: 'small' },
      ].map(({ label, ...props }) => (
        <div key={label} className="flex items-center gap-4">
          <Switch {...props} />
          <span className="text-[#484848] text-xs" style={{ fontFamily: 'Inter', minWidth: 220 }}>{label}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Interactive ───────────────────────────────────────────────────────────────
export const Interactive = {
  name: 'Interactive — Large vs Small',
  render: () => {
    const [large, setLarge] = useState(false)
    const [small, setSmall] = useState(false)

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Switch size="large" selected={large} onChange={setLarge} />
          <span className="text-[#abb1b5] text-sm" style={{ fontFamily: 'Inter' }}>
            Large — {large ? 'On' : 'Off'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Switch size="small" selected={small} onChange={setSmall} />
          <span className="text-[#abb1b5] text-sm" style={{ fontFamily: 'Inter' }}>
            Small — {small ? 'On' : 'Off'}
          </span>
        </div>
      </div>
    )
  },
}

// ── In context — Ajustes ──────────────────────────────────────────────────────
export const InContext = {
  name: 'In context — Ajustes',
  render: () => {
    const [state, setState] = useState({
      notifs:    true,
      biometria: false,
      darkMode:  true,
      upoints:   true,
      twofa:     false,
    })
    const toggle = (k) => setState(s => ({ ...s, [k]: !s[k] }))

    const rows = [
      { key: 'notifs',    label: 'Notificaciones push',           sub: 'Recibe alertas de movimientos' },
      { key: 'biometria', label: 'Face ID / Touch ID',            sub: 'Acceso rápido con biometría' },
      { key: 'darkMode',  label: 'Modo oscuro',                   sub: 'Siempre activo en la app' },
      { key: 'upoints',   label: 'Gana Upoints automáticamente',  sub: 'Por cada transacción realizada' },
      { key: 'twofa',     label: 'Verificación en dos pasos',     sub: null, disabled: true },
    ]

    return (
      <div
        className="flex flex-col rounded-[24px] overflow-hidden"
        style={{ width: 360, background: '#151516', border: '1px solid #222222' }}
      >
        {rows.map(({ key, label, sub, disabled }, i) => (
          <div
            key={key}
            className="flex items-center justify-between px-4"
            style={{
              minHeight: 64,
              borderBottom: i < rows.length - 1 ? '1px solid #1f1f1f' : 'none',
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span
                style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500, color: disabled ? '#525252' : '#f9fafb' }}
              >
                {label}
              </span>
              {sub && (
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#484848' }}>
                  {sub}
                </span>
              )}
            </div>
            <Switch
              size="small"
              selected={state[key]}
              disabled={disabled}
              onChange={() => toggle(key)}
            />
          </div>
        ))}
      </div>
    )
  },
}
