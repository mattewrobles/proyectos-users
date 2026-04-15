import { useState } from 'react'
import { Dialog, DialogPreview } from './Dialog'

export default {
  title: 'DS / Dialog',
  component: DialogPreview,
  parameters: {
    docs: { description: { component: 'Dialog. Figma `40006005:24889`. 16 variants: type × illustration × description × actions.' } },
  },
  argTypes: {
    type:        { control: 'select', options: ['primary', 'critical'] },
    title:       { control: 'text' },
    description: { control: 'text' },
  },
}

// ── Sample illustration ──────────────────────────────────────────────────────
const WalletIllustration = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="22" fill="#2b1c45" />
    <path d="M10 16h24v16a2 2 0 01-2 2H12a2 2 0 01-2-2V16z" stroke="#f9fafb" strokeWidth="1.5" fill="none"/>
    <path d="M10 16l5-6h14l5 6" stroke="#f9fafb" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="22" cy="24" r="3" stroke="#02bbb5" strokeWidth="1.5" fill="none"/>
  </svg>
)

const WarningIllustration = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="22" fill="#3d0a0e" />
    <path d="M22 14l9 16H13l9-16z" stroke="#e42131" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <line x1="22" y1="20" x2="22" y2="25" stroke="#e42131" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="22" cy="28" r="1" fill="#e42131"/>
  </svg>
)

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground = {
  render: (args) => (
    <div className="flex justify-center">
      <DialogPreview
        type={args.type}
        title={args.title}
        description={args.description}
        illustration={<WalletIllustration />}
        primaryAction={{ label: 'Continuar', onClick: () => {} }}
        secondaryAction={{ label: 'Cancelar', onClick: () => {} }}
      />
    </div>
  ),
  args: {
    type: 'primary',
    title: '¡Transferencia exitosa!',
    description: 'Tu dinero ha sido enviado correctamente. Recibirás una confirmación en tu correo.',
  },
}

// ── All 4 content combinations ───────────────────────────────────────────────
export const AllVariants = {
  name: 'Variants — Primary type',
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      {/* With illustration + description + 2 actions */}
      <DialogPreview
        type="primary"
        illustration={<WalletIllustration />}
        title="¡Transferencia exitosa!"
        description="Tu dinero llegará en los próximos minutos."
        primaryAction={{ label: 'Ver detalles', onClick: () => {} }}
        secondaryAction={{ label: 'Volver al inicio', onClick: () => {} }}
      />
      {/* Without illustration, with description + 2 actions */}
      <DialogPreview
        type="primary"
        title="Confirmar envío"
        description="¿Estás seguro que deseas enviar $50.00 a Gaby?"
        primaryAction={{ label: 'Sí, enviar', onClick: () => {} }}
        secondaryAction={{ label: 'Cancelar', onClick: () => {} }}
      />
      {/* With illustration + 1 action, no description */}
      <DialogPreview
        type="primary"
        illustration={<WalletIllustration />}
        title="Billetera creada"
        primaryAction={{ label: 'Comenzar', onClick: () => {} }}
      />
      {/* Minimal — only title + 1 action */}
      <DialogPreview
        type="primary"
        title="Sesión expirada"
        primaryAction={{ label: 'Iniciar sesión', onClick: () => {} }}
      />
    </div>
  ),
}

// ── Critical type ────────────────────────────────────────────────────────────
export const CriticalVariants = {
  name: 'Variants — Critical type',
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      <DialogPreview
        type="critical"
        illustration={<WarningIllustration />}
        title="¿Eliminar cuenta?"
        description="Esta acción no se puede deshacer. Perderás todos tus Upoints y historial de transacciones."
        primaryAction={{ label: 'Sí, eliminar', onClick: () => {} }}
        secondaryAction={{ label: 'Cancelar', onClick: () => {} }}
      />
      <DialogPreview
        type="critical"
        title="Error de pago"
        description="No pudimos procesar tu transacción. Por favor intenta de nuevo."
        primaryAction={{ label: 'Reintentar', onClick: () => {} }}
        secondaryAction={{ label: 'Cancelar', onClick: () => {} }}
      />
      <DialogPreview
        type="critical"
        illustration={<WarningIllustration />}
        title="Fondos insuficientes"
        primaryAction={{ label: 'Depositar ahora', onClick: () => {} }}
      />
    </div>
  ),
}

// ── Primary vs Critical ──────────────────────────────────────────────────────
export const PrimaryVsCritical = {
  name: 'Primary vs Critical',
  render: () => (
    <div className="flex gap-6 flex-wrap justify-center">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-[#7c8287] text-xs mb-1">Primary</span>
        <DialogPreview
          type="primary"
          illustration={<WalletIllustration />}
          title="Envío completado"
          description="$50.00 enviados a Naho"
          primaryAction={{ label: 'Ver recibo', onClick: () => {} }}
          secondaryAction={{ label: 'Inicio', onClick: () => {} }}
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-[#7c8287] text-xs mb-1">Critical</span>
        <DialogPreview
          type="critical"
          illustration={<WarningIllustration />}
          title="Transferencia fallida"
          description="No se pudo completar el envío. Verifica tu saldo."
          primaryAction={{ label: 'Reintentar', onClick: () => {} }}
          secondaryAction={{ label: 'Cancelar', onClick: () => {} }}
        />
      </div>
    </div>
  ),
}

// ── Live dialog (with overlay) ───────────────────────────────────────────────
export const LiveOverlay = {
  name: 'Live — con overlay',
  render: () => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('primary')

    return (
      <div className="flex flex-col gap-3 items-center">
        <div className="flex gap-3">
          <button
            onClick={() => { setType('primary'); setOpen(true) }}
            className="px-4 h-10 rounded-[20px] bg-[#2b1c45] text-[#f9fafb] text-sm font-semibold"
          >
            Abrir Primary
          </button>
          <button
            onClick={() => { setType('critical'); setOpen(true) }}
            className="px-4 h-10 rounded-[20px] bg-[#e42131] text-[#f9fafb] text-sm font-semibold"
          >
            Abrir Critical
          </button>
        </div>
        <p className="text-[#484848] text-xs">Haz click fuera del dialog o en "Cancelar" para cerrar</p>
        {open && (
          <Dialog
            type={type}
            illustration={type === 'primary' ? <WalletIllustration /> : <WarningIllustration />}
            title={type === 'primary' ? '¡Transferencia exitosa!' : '¿Eliminar cuenta?'}
            description={
              type === 'primary'
                ? 'Tu dinero ha sido enviado a Gaby correctamente.'
                : 'Esta acción no se puede deshacer.'
            }
            primaryAction={{ label: type === 'primary' ? 'Ver recibo' : 'Eliminar', onClick: () => setOpen(false) }}
            secondaryAction={{ label: 'Cancelar', onClick: () => setOpen(false) }}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    )
  },
}
