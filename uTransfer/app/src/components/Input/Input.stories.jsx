import { useState } from 'react'
import { Input } from './Input'

export default {
  title: 'DS / Input',
  component: Input,
  parameters: {
    docs: { description: { component: 'Input. Figma `40006005:22203`. 36 variants: 9 states × 2 sizes × 2 styles. h=56, r=20, stroke=0.5px.' } },
  },
  argTypes: {
    state:       { control: 'select', options: ['default','filled','hover','focus','disabled','success','info','warning','error'] },
    size:        { control: 'select', options: ['large','medium'] },
    inputStyle:  { control: 'select', options: ['outline','filled'] },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
  },
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
  </svg>
)
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    label:       'Email',
    placeholder: 'tucorreo@gmail.com',
    helperText:  'Usaremos este correo para confirmaciones.',
    state:       'default',
    size:        'large',
    inputStyle:  'outline',
  },
}

// ── Interactive ───────────────────────────────────────────────────────────────
export const Interactive = {
  name: 'Interactive',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="max-w-sm flex flex-col gap-6">
        <Input
          label="Monto a enviar"
          placeholder="0.00"
          value={value}
          onChange={e => setValue(e.target.value)}
          state={value ? 'filled' : 'default'}
          helperText="El monto mínimo es $1.00"
        />
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@gmail.com"
          state="focus"
          helperText="Focus — borde #958da3"
        />
      </div>
    )
  },
}

// ── All States — Outline ──────────────────────────────────────────────────────
const STATES = [
  { state: 'default',  label: 'Default',  helper: 'Helper Text' },
  { state: 'filled',   label: 'Filled',   helper: 'Helper Text' },
  { state: 'hover',    label: 'Hover',    helper: 'Helper Text' },
  { state: 'focus',    label: 'Focus',    helper: 'Helper Text' },
  { state: 'disabled', label: 'Disabled', helper: 'Helper Text' },
  { state: 'success',  label: 'Success',  helper: 'Success Text' },
  { state: 'info',     label: 'Info',     helper: 'Info Text' },
  { state: 'warning',  label: 'Warning',  helper: 'Warning Text' },
  { state: 'error',    label: 'Error',    helper: 'Error Text' },
]

export const AllStatesOutline = {
  name: 'All States — Outline',
  render: () => (
    <div className="max-w-sm flex flex-col gap-4">
      {STATES.map(({ state, label, helper }) => (
        <Input key={state} label={label} placeholder="Placeholder" helperText={helper} state={state} inputStyle="outline" />
      ))}
    </div>
  ),
}

export const AllStatesFilled = {
  name: 'All States — Filled',
  render: () => (
    <div className="max-w-sm flex flex-col gap-4">
      {STATES.map(({ state, label, helper }) => (
        <Input key={state} label={label} placeholder="Placeholder" helperText={helper} state={state} inputStyle="filled" />
      ))}
    </div>
  ),
}

// ── Outline vs Filled ─────────────────────────────────────────────────────────
export const OutlineVsFilled = {
  name: 'Outline vs Filled',
  render: () => (
    <div className="flex gap-8 flex-wrap">
      <div className="flex flex-col gap-4 min-w-[300px]">
        <span className="text-[#484848] text-xs">Outline</span>
        {['default','focus','success','error'].map(s => (
          <Input key={s} label={s} placeholder="Placeholder" helperText={s + ' text'} state={s} inputStyle="outline" />
        ))}
      </div>
      <div className="flex flex-col gap-4 min-w-[300px]">
        <span className="text-[#484848] text-xs">Filled</span>
        {['default','focus','success','error'].map(s => (
          <Input key={s} label={s} placeholder="Placeholder" helperText={s + ' text'} state={s} inputStyle="filled" />
        ))}
      </div>
    </div>
  ),
}

// ── With Icons ────────────────────────────────────────────────────────────────
export const WithIcons = {
  name: 'With Icons',
  render: () => (
    <div className="max-w-sm flex flex-col gap-4">
      <Input label="Buscar" placeholder="Buscar contacto..." iconLeft={<SearchIcon />} />
      <Input label="Contraseña" placeholder="••••••••" type="password" iconLeft={<UserIcon />} iconRight={<EyeIcon />} />
      <Input label="País" placeholder="Selecciona un país" iconRight={<ChevronDown />} />
      <Input
        label="Monto"
        placeholder="0.00"
        iconLeft={<span className="text-[#7c8287] text-sm font-medium">$</span>}
        helperText="Saldo disponible: $250.00"
      />
    </div>
  ),
}

// ── Flujo real — Enviar dinero ────────────────────────────────────────────────
export const SendFlow = {
  name: 'In context — Enviar dinero',
  render: () => (
    <div className="w-[393px] p-6 flex flex-col gap-5">
      <h2 className="text-[#f9fafb] text-[24px] font-semibold" style={{ fontFamily: 'Inter' }}>
        Enviar dinero
      </h2>
      <Input label="¿A quién envías?" placeholder="Nombre o número de teléfono" iconLeft={<SearchIcon />} />
      <Input
        label="Monto"
        placeholder="0.00"
        iconLeft={<span className="text-[#7c8287] text-sm font-medium">USD</span>}
        helperText="Saldo disponible: $250.00"
      />
      <Input label="Nota (opcional)" placeholder="Para qué es este envío..." />
      <Input
        label="Correo"
        placeholder="correo@ejemplo.com"
        state="error"
        helperText="Error Text"
      />
      <Input
        label="Teléfono verificado"
        placeholder="+593 99 999 9999"
        state="success"
        helperText="Success Text"
      />
    </div>
  ),
}
