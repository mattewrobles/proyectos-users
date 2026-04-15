import { useState } from 'react'
import { TabBar } from './TabBar'

export default {
  title: 'DS / Tab Bar',
  component: TabBar,
  parameters: {
    docs: { description: { component: 'Tab Bar. Figma `40006284:4192`. Container: w=362, h=70, r=40, bg=#151516. Active tab: bg=#000000. Center FAB: send button.' } },
  },
  argTypes: {
    active: { control: 'select', options: ['home', 'movimientos', 'beneficios', 'ajustes'] },
  },
}

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground = {
  render: (args) => (
    <div className="flex justify-center">
      <TabBar active={args.active} onNavigate={() => {}} onFAB={() => {}} />
    </div>
  ),
  args: { active: 'home' },
}

// ── All active states ─────────────────────────────────────────────────────────
export const AllStates = {
  name: 'All Active States',
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      {['home', 'movimientos', 'beneficios', 'ajustes'].map(tab => (
        <div key={tab} className="flex flex-col gap-1 items-center">
          <span className="text-[#484848] text-xs">{tab}</span>
          <TabBar active={tab} onNavigate={() => {}} onFAB={() => {}} />
        </div>
      ))}
    </div>
  ),
}

// ── Interactive ───────────────────────────────────────────────────────────────
export const Interactive = {
  name: 'Interactive — nav real',
  render: () => {
    const [active, setActive] = useState('home')
    const pages = {
      home:         { title: 'Inicio',        desc: 'Balance y acciones rápidas' },
      movimientos:  { title: 'Movimientos',   desc: 'Historial de transacciones' },
      beneficios:   { title: 'Beneficios',    desc: 'Upoints y gift cards' },
      ajustes:      { title: 'Ajustes',       desc: 'Perfil y preferencias' },
    }
    const page = pages[active]

    return (
      <div className="flex flex-col gap-6 items-center">
        {/* Mock screen */}
        <div
          className="flex flex-col items-center justify-center rounded-[32px]"
          style={{ width: 362, height: 200, background: '#111113', border: '1px solid #222222' }}
        >
          <p className="text-[#f9fafb] text-[20px] font-semibold" style={{ fontFamily: 'Inter' }}>
            {page.title}
          </p>
          <p className="text-[#484848] text-[13px] mt-1" style={{ fontFamily: 'Inter' }}>
            {page.desc}
          </p>
        </div>

        <TabBar active={active} onNavigate={setActive} onFAB={() => alert('Enviar dinero')} />
      </div>
    )
  },
}

// ── In-app context ────────────────────────────────────────────────────────────
export const InContext = {
  name: 'In context — pantalla mobile',
  render: () => {
    const [active, setActive] = useState('home')

    return (
      <div
        className="relative overflow-hidden"
        style={{ width: 393, height: 600, background: '#0d0d12', borderRadius: 32 }}
      >
        {/* Dummy content */}
        <div className="p-6">
          <p className="text-[#7c8287] text-xs mb-1" style={{ fontFamily: 'Inter' }}>Buenos días</p>
          <p className="text-[#f9fafb] text-[28px] font-semibold" style={{ fontFamily: 'Inter' }}>$4,050.08</p>
          <p className="text-[#484848] text-sm mt-1" style={{ fontFamily: 'Inter' }}>Saldo total</p>
        </div>

        {/* Tab bar fixed at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-center pb-4"
        >
          <TabBar active={active} onNavigate={setActive} onFAB={() => {}} />
        </div>
      </div>
    )
  },
}
