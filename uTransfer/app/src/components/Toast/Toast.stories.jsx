import { useState } from 'react'
import { Toast, ToastStack } from './Toast'

export default {
  title: 'DS / Toast',
  component: Toast,
  parameters: {
    docs: { description: { component: 'Toast. Figma `40006032:6634`. 25 variantes: 5 estilos × 5 estados. w=350, h=56, radius=16.' } },
  },
  argTypes: {
    style:   { control: 'select', options: [1, 2, 3, 4, 5] },
    state:   { control: 'select', options: ['default', 'info', 'success', 'error', 'warning'] },
    message: { control: 'text' },
  },
}

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    style: 1,
    state: 'success',
    message: 'Transferencia enviada correctamente',
  },
}

// ── All states per style ──────────────────────────────────────────────────────
const STATES = ['default', 'info', 'success', 'error', 'warning']
const MESSAGES = {
  default: 'Mensaje de toast',
  info:    'Tu sesión expirará pronto',
  success: 'Transferencia exitosa',
  error:   'No se pudo completar el pago',
  warning: 'Saldo bajo — recarga tu billetera',
}

export const Style1 = {
  name: 'Style 1 — Solid dark',
  render: () => (
    <div className="flex flex-col gap-3">
      {STATES.map(s => (
        <Toast key={s} style={1} state={s} message={MESSAGES[s]} onClose={() => {}} />
      ))}
    </div>
  ),
}

export const Style2 = {
  name: 'Style 2 — Dark + border',
  render: () => (
    <div className="flex flex-col gap-3">
      {STATES.map(s => (
        <Toast key={s} style={2} state={s} message={MESSAGES[s]} onClose={() => {}} />
      ))}
    </div>
  ),
}

export const Style3 = {
  name: 'Style 3 — Light tinted',
  render: () => (
    <div className="flex flex-col gap-3">
      {STATES.map(s => (
        <Toast key={s} style={3} state={s} message={MESSAGES[s]} onClose={() => {}} />
      ))}
    </div>
  ),
}

export const Style4 = {
  name: 'Style 4 — Dark + white icon',
  render: () => (
    <div className="flex flex-col gap-3">
      {STATES.map(s => (
        <Toast key={s} style={4} state={s} message={MESSAGES[s]} onClose={() => {}} />
      ))}
    </div>
  ),
}

export const Style5 = {
  name: 'Style 5 — Colored bg',
  render: () => (
    <div className="flex flex-col gap-3">
      {STATES.map(s => (
        <Toast key={s} style={5} state={s} message={MESSAGES[s]} onClose={() => {}} />
      ))}
    </div>
  ),
}

// ── All 25 variants grid ──────────────────────────────────────────────────────
export const AllVariants = {
  name: 'All 25 Variants',
  render: () => (
    <div className="flex gap-8 flex-wrap">
      {[1, 2, 3, 4, 5].map(style => (
        <div key={style} className="flex flex-col gap-2">
          <span className="text-[#484848] text-xs mb-1">Style {style}</span>
          {STATES.map(s => (
            <Toast key={s} style={style} state={s} message={MESSAGES[s]} onClose={() => {}} />
          ))}
        </div>
      ))}
    </div>
  ),
}

// ── Live dismissable toasts ───────────────────────────────────────────────────
export const LiveToasts = {
  name: 'Live — dismissable',
  render: () => {
    const [toasts, setToasts] = useState([
      { id: 1, style: 1, state: 'success', message: 'Transferencia exitosa ✓' },
      { id: 2, style: 2, state: 'info',    message: 'Tienes 3 nuevas notificaciones' },
      { id: 3, style: 3, state: 'warning', message: 'Saldo bajo — recarga pronto' },
    ])

    const remove = (id) => setToasts(prev => prev.filter(t => t.id !== id))
    const add = (state) => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, style: Math.ceil(Math.random() * 5), state, message: MESSAGES[state] }])
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {STATES.map(s => (
            <button
              key={s}
              onClick={() => add(s)}
              className="px-3 h-9 rounded-[12px] text-sm text-[#f9fafb] font-medium"
              style={{ background: '#191b1e', border: '1px solid #313131' }}
            >
              + {s}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {toasts.map(t => (
            <Toast key={t.id} {...t} onClose={() => remove(t.id)} />
          ))}
        </div>
        {toasts.length === 0 && (
          <p className="text-[#484848] text-sm">Todos los toasts fueron cerrados. Agrega nuevos arriba.</p>
        )}
      </div>
    )
  },
}

// ── Auto-dismiss ──────────────────────────────────────────────────────────────
export const AutoDismiss = {
  name: 'Auto-dismiss (3 s)',
  render: () => {
    const [key, setKey] = useState(0)
    return (
      <div className="flex flex-col gap-3 items-start">
        <button
          onClick={() => setKey(k => k + 1)}
          className="px-4 h-10 rounded-[16px] text-[#f9fafb] text-sm font-semibold bg-[#2b1c45]"
        >
          Mostrar toast (3 s)
        </button>
        <Toast
          key={key}
          style={1}
          state="success"
          message="¡Guardado! Este toast desaparece en 3 s"
          duration={3000}
          visible={true}
        />
      </div>
    )
  },
}
