# Card — uTransfer DS

> Contenedor de información. Radius: `rounded-xl` o `rounded-2xl`. Fill: `Cards-Fills/Card`.
> Sin box-shadow decorativo — profundidad por contraste de color.

---

## Variantes de fill (tokens)

| Tipo | Token fill | Uso |
|------|-----------|-----|
| Card principal | `--card` (`#1c1d1e`) | Balance, info importante |
| Card foreground | `--card-foreground` (`#242526`) | Superficie sobre card |
| Normal/Primary | `--card-normal-primary` | Quick actions, action chips |
| Normal/Secondary | `--card-normal-secondary` | Items de lista |
| Normal/Tertiary | `--card-normal-tertiary` | Sub-items |
| Normal/Quaternary | `--card-normal-quaternary` | Menor jerarquía |
| Vibrant/Primary | `--card-vibrant-primary` | **Solo en Juegos/Upoints** |

---

## Props

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outline' | 'glass';
  fill?: 'card' | 'foreground' | 'normal-primary' | 'normal-secondary' | 'vibrant';
  radius?: 'xl' | '2xl' | '3xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

---

## Código React

```tsx
import { cn } from '@/lib/utils';

const cardFills = {
  'card':            'bg-card',
  'foreground':      'bg-card-foreground',
  'normal-primary':  'bg-card-normal-primary',
  'normal-secondary':'bg-card-normal-secondary',
  'vibrant':         'bg-card-vibrant-primary',
} as const;

const cardPaddings = {
  none: '',
  sm:   'p-s-4',   // 12px
  md:   'p-s-5',   // 16px
  lg:   'p-s-6',   // 20px — más común en cards principales
} as const;

const cardRadii = {
  xl:  'rounded-xl',    // 20px — cards estándar
  '2xl': 'rounded-2xl', // 24px — cards grandes, modales
  '3xl': 'rounded-3xl', // 32px — elementos prominentes
} as const;

export const Card = ({
  variant = 'default',
  fill = 'card',
  radius = 'xl',
  padding = 'lg',
  children,
  className,
  onClick,
}: CardProps) => {
  const isInteractive = !!onClick;

  return (
    <div
      onClick={onClick}
      className={cn(
        // Base
        cardFills[fill],
        cardRadii[radius],
        cardPaddings[padding],
        // Variante
        variant === 'outline'  && 'border border-border-primary',
        variant === 'glass'    && 'glass-modal',
        variant === 'elevated' && 'shadow-card',
        // Interactivo
        isInteractive && 'cursor-pointer active:scale-[0.99] transition-transform duration-150',
        className,
      )}
    >
      {children}
    </div>
  );
};
```

---

## Subcomponentes

```tsx
// Card de balance (Home principal)
export const BalanceCard = ({ amount, currency, upoints }) => (
  <Card fill="card" radius="2xl" padding="lg">
    <div className="flex flex-col gap-s-3">
      <p className="text-caption text-text-secondary">Balance disponible</p>
      <div className="flex items-baseline gap-s-2">
        <span className="text-h3 font-semibold text-text-primary">{amount}</span>
        <span className="text-subtitle-m text-text-secondary">{currency}</span>
      </div>
      {/* Upoints badge */}
      <div className="flex items-center gap-s-2 mt-s-2">
        <div className="w-4 h-4 rounded-full bg-brand-yellow flex-shrink-0" />
        <span className="text-caption text-text-branding font-medium">{upoints} Upoints</span>
      </div>
    </div>
  </Card>
);

// Item de lista de transacciones
export const TransactionItem = ({ name, date, amount, positive = true }) => (
  <div
    className={cn(
      'flex items-center gap-s-4 p-s-4',
      'bg-card-normal-secondary rounded-xl',
      'cursor-pointer active:opacity-80 transition-opacity',
    )}
  >
    {/* Avatar */}
    <div className="w-s-11 h-s-11 rounded-full bg-card-normal-primary flex items-center justify-center flex-shrink-0">
      <span className="text-subtitle-m font-semibold text-text-primary">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
    {/* Info */}
    <div className="flex-1 min-w-0">
      <p className="text-body-sm font-medium text-text-primary truncate">{name}</p>
      <p className="text-caption text-text-opacity-secondary">{date}</p>
    </div>
    {/* Monto */}
    <p className={cn(
      'text-body-sm font-semibold flex-shrink-0',
      positive ? 'text-icon-positive' : 'text-text-primary',
    )}>
      {positive ? '+' : '-'}{amount}
    </p>
  </div>
);

// Quick action chip (Home grid)
export const QuickActionChip = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center gap-s-2 p-s-4',
      'bg-card-normal-primary rounded-xl',
      'active:scale-95 transition-transform duration-150',
      'min-w-[72px]',
    )}
  >
    <div className="w-s-11 h-s-11 rounded-full bg-card flex items-center justify-center">
      {icon}
    </div>
    <span className="text-caption text-text-secondary">{label}</span>
  </button>
);

// Card de contacto frecuente
export const ContactChip = ({ avatar, name, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center gap-s-2',
      'active:scale-95 transition-transform duration-150',
    )}
  >
    <div className="w-s-12 h-s-12 rounded-full overflow-hidden bg-card-normal-primary">
      {avatar
        ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
        : <span className="w-full h-full flex items-center justify-center text-h5 font-semibold text-text-primary">
            {name.charAt(0)}
          </span>
      }
    </div>
    <span className="text-caption text-text-secondary text-center max-w-[60px] truncate">{name}</span>
  </button>
);
```

---

## Ejemplos de uso

```tsx
// Card básica
<Card fill="card" radius="2xl" padding="lg">
  <h2 className="text-h5 font-semibold text-text-primary">Depósito recibido</h2>
  <p className="text-body-sm text-text-secondary mt-s-2">$150.00 USD</p>
</Card>

// Card con borde (outline)
<Card variant="outline" fill="card" radius="xl">
  <p>Contenido</p>
</Card>

// Card glass (modal, overlay)
<Card variant="glass" radius="2xl" padding="lg">
  <p>Contenido del modal</p>
</Card>

// Card clickeable
<Card fill="card" radius="xl" padding="md" onClick={() => navigate('/send')}>
  <div className="flex items-center justify-between">
    <span className="text-subtitle-m text-text-primary">Enviar a contacto</span>
    <ChevronRight className="w-5 h-5 text-icon-primary" />
  </div>
</Card>

// Sección con lista de items
<Card fill="card" radius="2xl" padding="none" className="overflow-hidden">
  {transactions.map((tx, i) => (
    <div key={tx.id}>
      <TransactionItem {...tx} />
      {i < transactions.length - 1 && (
        <div className="mx-s-5 h-px bg-border-secondary" />
      )}
    </div>
  ))}
</Card>
```

---

## Notas importantes

- **Sin box-shadow** en cards — Revolut style. Solo contraste de color entre capas
- `rounded-xl` (20px) para cards de lista; `rounded-2xl` (24px) para cards de balance/info
- Dividers entre items: `h-px bg-border-secondary` (nunca `border-t`)
- Cards Vibrant (`card-vibrant-*`) **solo en la sección de Juegos/Upoints** — no mezclar con el resto de la UI
- En cards clickeables: `active:scale-[0.99]` para feedback táctil
