import { useState } from 'react'
import { SearchBar, SearchBarControlled } from './SearchBar'

export default {
  title: 'DS / Search Bar',
  component: SearchBar,
  parameters: {
    docs: { description: { component: 'Search Bar. Figma `40006093:8434`. 10 variants (5 states × 2 forms). h=48, r=24 (pill), px=16. Form=Off: dark outlined. Form=On: gray filled (iOS spotlight style).' } },
  },
  argTypes: {
    state: { control: 'select', options: ['enabled', 'enabled-value', 'hover', 'focus', 'disabled'] },
    form:  { control: 'select', options: ['off', 'on'] },
    value: { control: 'text' },
  },
}

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    state: 'enabled',
    form: 'off',
    value: '',
    placeholder: 'Search...',
  },
  render: (args) => (
    <div className="flex justify-center" style={{ minWidth: 360 }}>
      <SearchBar {...args} className="w-[320px]" />
    </div>
  ),
}

// ── Form Off — All States ─────────────────────────────────────────────────────
export const FormOffAllStates = {
  name: 'Form Off — All States',
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 320 }}>
      {[
        { state: 'enabled',       label: 'Enabled',       value: '' },
        { state: 'enabled-value', label: 'Enabled Value', value: 'Bitcoin' },
        { state: 'hover',         label: 'Hover',         value: '' },
        { state: 'focus',         label: 'Focus',         value: '' },
        { state: 'disabled',      label: 'Disabled',      value: '' },
      ].map(({ state, label, value }) => (
        <div key={state} className="flex flex-col gap-1">
          <span className="text-[#484848] text-xs" style={{ fontFamily: 'Inter' }}>{label}</span>
          <SearchBar state={state} form="off" value={value} placeholder="Search..." />
        </div>
      ))}
    </div>
  ),
}

// ── Form On — All States ──────────────────────────────────────────────────────
export const FormOnAllStates = {
  name: 'Form On — All States (iOS)',
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 320 }}>
      {[
        { state: 'enabled',       label: 'Enabled',       value: '' },
        { state: 'enabled-value', label: 'Enabled Value', value: 'Bitcoin' },
        { state: 'hover',         label: 'Hover',         value: '' },
        { state: 'focus',         label: 'Focus',         value: '' },
        { state: 'disabled',      label: 'Disabled',      value: '' },
      ].map(({ state, label, value }) => (
        <div key={state} className="flex flex-col gap-1">
          <span className="text-[#484848] text-xs" style={{ fontFamily: 'Inter' }}>{label}</span>
          <SearchBar state={state} form="on" value={value} placeholder="Search..." />
        </div>
      ))}
    </div>
  ),
}

// ── Off vs On ─────────────────────────────────────────────────────────────────
export const OffVsOn = {
  name: 'Off vs On — side by side',
  render: () => (
    <div className="flex gap-8 flex-wrap">
      <div className="flex flex-col gap-4" style={{ width: 300 }}>
        <span className="text-[#abb1b5] text-xs font-medium" style={{ fontFamily: 'Inter' }}>Form: Off (dark outlined)</span>
        {['enabled', 'focus', 'enabled-value', 'disabled'].map(state => (
          <div key={state} className="flex flex-col gap-1">
            <span className="text-[#484848] text-xs" style={{ fontFamily: 'Inter' }}>{state}</span>
            <SearchBar
              state={state}
              form="off"
              value={state === 'enabled-value' ? 'Ethereum' : ''}
              placeholder="Search..."
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4" style={{ width: 300 }}>
        <span className="text-[#abb1b5] text-xs font-medium" style={{ fontFamily: 'Inter' }}>Form: On (iOS spotlight)</span>
        {['enabled', 'focus', 'enabled-value', 'disabled'].map(state => (
          <div key={state} className="flex flex-col gap-1">
            <span className="text-[#484848] text-xs" style={{ fontFamily: 'Inter' }}>{state}</span>
            <SearchBar
              state={state}
              form="on"
              value={state === 'enabled-value' ? 'Ethereum' : ''}
              placeholder="Search..."
            />
          </div>
        ))}
      </div>
    </div>
  ),
}

// ── Controlled ────────────────────────────────────────────────────────────────
export const Controlled = {
  name: 'Controlled — auto state',
  render: () => {
    const [results, setResults] = useState([])
    const contacts = ['Ana García', 'Luis Martínez', 'María López', 'Carlos Rodríguez', 'Sofia Hernández']

    const handleSearch = (q) => {
      setResults(q ? contacts.filter(c => c.toLowerCase().includes(q.toLowerCase())) : [])
    }

    return (
      <div className="flex flex-col gap-4" style={{ width: 320 }}>
        <SearchBarControlled
          form="off"
          placeholder="Buscar contacto..."
          onSearch={handleSearch}
        />
        {results.length > 0 && (
          <div
            className="flex flex-col rounded-[16px] overflow-hidden"
            style={{ background: '#1a1a1a', border: '1px solid #262626' }}
          >
            {results.map(name => (
              <div
                key={name}
                className="flex items-center px-4"
                style={{ height: 48, fontFamily: 'Inter', fontSize: 14, color: '#e1e4e8', borderBottom: '1px solid #262626' }}
              >
                {name}
              </div>
            ))}
          </div>
        )}
        <p className="text-[#484848] text-xs" style={{ fontFamily: 'Inter' }}>
          Try typing a name — state auto-transitions between enabled → focus → enabled-value
        </p>
      </div>
    )
  },
}

// ── In context ────────────────────────────────────────────────────────────────
export const InContext = {
  name: 'In context — pantalla mobile',
  render: () => {
    const [query, setQuery] = useState('')

    const contacts = [
      { name: 'Ana García',        amount: '$120.00', time: 'Hace 2h' },
      { name: 'Luis Martínez',     amount: '$45.00',  time: 'Ayer' },
      { name: 'María López',       amount: '$200.00', time: 'Lun' },
      { name: 'Carlos Rodríguez',  amount: '$15.00',  time: 'Dom' },
      { name: 'Sofia Hernández',   amount: '$80.00',  time: 'Vie' },
    ]

    const filtered = query
      ? contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
      : contacts

    return (
      <div
        className="relative overflow-hidden"
        style={{ width: 393, height: 680, background: '#0d0d12', borderRadius: 32 }}
      >
        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <div>
            <p className="text-[#f9fafb] text-[22px] font-semibold" style={{ fontFamily: 'Inter' }}>
              Movimientos
            </p>
            <p className="text-[#484848] text-sm mt-0.5" style={{ fontFamily: 'Inter' }}>
              Historial de transacciones
            </p>
          </div>

          {/* SearchBar */}
          <SearchBarControlled
            form="off"
            placeholder="Buscar movimientos..."
            onSearch={setQuery}
          />

          {/* List */}
          <div className="flex flex-col gap-2">
            {filtered.map(c => (
              <div
                key={c.name}
                className="flex items-center justify-between px-4"
                style={{ height: 56, background: '#151516', borderRadius: 16, border: '1px solid #222222' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center text-xs font-semibold"
                    style={{ width: 36, height: 36, borderRadius: 9999, background: '#2b1c45', color: '#d9016c', fontFamily: 'Inter' }}
                  >
                    {c.name[0]}
                  </div>
                  <div>
                    <p className="text-[#f9fafb] text-sm font-medium" style={{ fontFamily: 'Inter' }}>{c.name}</p>
                    <p className="text-[#484848] text-xs" style={{ fontFamily: 'Inter' }}>{c.time}</p>
                  </div>
                </div>
                <p className="text-[#f9fafb] text-sm font-semibold" style={{ fontFamily: 'Inter' }}>{c.amount}</p>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-[#484848] text-sm text-center py-4" style={{ fontFamily: 'Inter' }}>
                Sin resultados para "{query}"
              </p>
            )}
          </div>
        </div>
      </div>
    )
  },
}
