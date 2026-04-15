# Modal / Dialog — uTransfer DS

> Overlay con glassmorphism. Fondo: `Backgrounds/Bg-glass 2`.
> Effect style: `Dialog` (key: `206d603d7fe94a4a4a5ec3d78805b70021c15a4c`).
> Radius: `rounded-2xl` (24px).

---

## Reglas del DS

| Elemento | Token | Valor |
|----------|-------|-------|
| Fondo modal | `--bg-glass-2` | `rgba(20,20,22,0.92)` |
| Backdrop blur | `--glass-blur-modal` | `blur(40px)` |
| Radius | `Radius-2xl` | `24px` |
| Título | `--modal-title` | `#f2f2f2` |
| Effect style Figma | `Dialog` | key `206d603d...` |

---

## Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;       // botones de acción
  size?: 'sm' | 'md' | 'lg' | 'full'; // 'full' = bottom sheet
  showCloseButton?: boolean;
  preventClose?: boolean;         // no cerrar al hacer click fuera
  className?: string;
}
```

---

## Código React

```tsx
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Bottom Sheet (más común en mobile) + Dialog (tablet/web)
export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  preventClose = false,
  className,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventClose) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose, preventClose]);

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm:   'max-w-sm w-full mx-s-5',
    md:   'max-w-[393px] w-full mx-s-5',
    lg:   'max-w-lg w-full mx-s-5',
    full: 'w-full mx-0 rounded-t-2xl rounded-b-none mt-auto',  // Bottom sheet
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay oscuro */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!preventClose ? onClose : undefined}
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(
          'relative z-10',
          'glass-modal',              // glass-modal utility = bg-glass-2 + backdrop-blur-modal
          'rounded-2xl',              // Radius-2xl — 24px
          'flex flex-col',
          'animate-in',               // micro-animación de entrada
          size === 'full'
            ? 'animate-slide-in-from-bottom'
            : 'animate-zoom-in duration-200',
          sizeClasses[size],
          className,
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-s-4 p-s-6 pb-0">
            <div className="flex-1">
              {title && (
                <h2
                  id="modal-title"
                  className="text-h5 font-semibold text-text-primary"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-body-sm text-text-secondary mt-s-2">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  'flex-shrink-0 w-s-9 h-s-9 rounded-full',
                  'bg-card-normal-primary flex items-center justify-center',
                  'text-icon-primary hover:text-text-primary transition-colors',
                  'active:scale-95 transition-transform',
                )}
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {children && (
          <div className="p-s-6 flex-1 overflow-y-auto">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="p-s-6 pt-0 safe-bottom">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## Variante: Bottom Sheet (móvil)

```tsx
export const BottomSheet = ({ isOpen, onClose, title, children, footer }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="full"
    footer={footer}
  >
    {/* Handle bar */}
    <div className="absolute top-s-3 left-1/2 -translate-x-1/2 w-s-9 h-s-1 rounded-full bg-border-primary" />
    {children}
  </Modal>
);
```

---

## Variante: Confirmation Dialog

```tsx
export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    description={message}
    showCloseButton={false}
    footer={
      <div className="flex flex-col gap-s-3">
        <Button
          variant={destructive ? 'destructive' : 'primary'}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
        <Button variant="ghost" onClick={onClose}>
          {cancelLabel}
        </Button>
      </div>
    }
  />
);
```

---

## Variante: Success / Error Sheet

```tsx
export const StatusSheet = ({ isOpen, onClose, type, title, message, onAction }) => (
  <BottomSheet isOpen={isOpen} onClose={onClose}>
    <div className="flex flex-col items-center text-center gap-s-5 py-s-7">
      {/* Ilustración */}
      <div className={cn(
        'w-s-16 h-s-16 rounded-full flex items-center justify-center',
        type === 'success' ? 'bg-icon-positive/20' : 'bg-red-500/20',
      )}>
        {type === 'success'
          ? <CheckCircle className="w-8 h-8 text-icon-positive" />
          : <XCircle className="w-8 h-8 text-red-400" />
        }
      </div>
      <div>
        <h3 className="text-h5 font-semibold text-text-primary">{title}</h3>
        <p className="text-body-sm text-text-secondary mt-s-2">{message}</p>
      </div>
    </div>
    <Button onClick={onAction || onClose}>Entendido</Button>
  </BottomSheet>
);
```

---

## Ejemplos de uso

```tsx
// Modal de confirmación de envío
<Modal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Confirmar envío"
  description="Estás enviando $150.00 a María García"
  footer={
    <div className="flex flex-col gap-s-3">
      <Button onClick={handleSend}>Confirmar envío</Button>
      <Button variant="ghost" onClick={() => setShowConfirm(false)}>Cancelar</Button>
    </div>
  }
>
  <div className="bg-card rounded-xl p-s-5">
    <TransactionSummary />
  </div>
</Modal>

// Bottom sheet de selección de método
<BottomSheet
  isOpen={showMethods}
  onClose={() => setShowMethods(false)}
  title="Selecciona método de pago"
>
  <PaymentMethodList methods={paymentMethods} onSelect={handleSelect} />
</BottomSheet>
```

---

## Notas importantes

- **Glass effect** es obligatorio (`glass-modal` utility) — nunca usar fondo sólido en modales
- **Bottom Sheet** es el patrón mobile estándar — solo usar Modal centrado en ≥768px
- Siempre incluir `safe-bottom` en el footer para evitar overlap con home indicator de iPhone
- El **handle bar** (línea en la parte superior) es requerido en Bottom Sheets
- Animación de entrada: `slide-in-from-bottom` para Bottom Sheet, `zoom-in` para Dialog
