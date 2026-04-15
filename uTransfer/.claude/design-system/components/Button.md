# Button — uTransfer DS

> Componente principal de acción. Siempre pill (`rounded-full`).
> Fuente Figma: Keys verificados en `ds-components.md`

---

## Variantes del DS

| Figma Variant | Key | Uso |
|---------------|-----|-----|
| Giant · Default · Primary | `15be15cfa0d8c4667e4eb8f84bf80f9919e019c9` | **CTA principal** de pantalla |
| Giant · Disabled · Primary | `c31e596f9c633e08cd3e492699bfa9f3d594313c` | Estado disabled |
| Giant · Default · Clear | `c4757e2398d2f767b0b188296d6efe17d15e1b9c` | Acción secundaria / ghost |

**Regla Revolut:** Botones SIEMPRE pill (`rounded-full`). Sin border-radius < full en botones de acción.

---

## Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'giant';
  state?: 'default' | 'hover' | 'active' | 'disabled' | 'loading';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

---

## Código React

```tsx
import { cn } from '@/lib/utils'; // classnames helper
import { Loader2 } from 'lucide-react';

const buttonVariants = {
  primary:     'bg-btn-primary text-white hover:bg-btn-primary-hover active:scale-[0.98]',
  secondary:   'glass-button text-text-primary border border-border-primary hover:bg-bg-primary-elevated',
  outline:     'bg-transparent text-btn-outline border border-btn-outline hover:bg-btn-primary/10',
  ghost:       'bg-transparent text-text-primary hover:bg-card-normal-primary',
  destructive: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]',
} as const;

const buttonSizes = {
  sm:    'h-s-9  px-s-5 text-body-sm font-medium gap-s-2',   // 32px h
  md:    'h-s-11 px-s-6 text-subtitle-m font-medium gap-s-3', // 44px h (touch target)
  lg:    'h-s-12 px-s-7 text-subtitle-m font-semibold gap-s-3',// 48px h
  giant: 'h-[56px] px-s-9 text-subtitle-m font-semibold gap-s-3', // Giant del DS
} as const;

export const Button = ({
  variant = 'primary',
  size = 'giant',
  state = 'default',
  leftIcon,
  rightIcon,
  fullWidth = true,
  children,
  onClick,
  type = 'button',
  className,
}: ButtonProps) => {
  const isDisabled = state === 'disabled';
  const isLoading  = state === 'loading';

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={cn(
        // Base
        'inline-flex items-center justify-center',
        'rounded-full',        // Radius-full — SIEMPRE pill
        'font-sans',
        'transition-all duration-200 ease-smooth',
        'select-none',
        // Tamaño
        buttonSizes[size],
        // Variante
        isDisabled || isLoading
          ? 'bg-btn-disabled text-btn-disabled-text cursor-not-allowed opacity-60'
          : buttonVariants[variant],
        // Full width
        fullWidth && 'w-full',
        className,
      )}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
```

---

## Ejemplos de uso

```tsx
// CTA principal (más común)
<Button variant="primary" size="giant">
  Enviar dinero
</Button>

// Con icono izquierdo
<Button variant="primary" leftIcon={<ArrowRight className="w-5 h-5" />}>
  Continuar
</Button>

// Estado disabled
<Button variant="primary" state="disabled">
  Continuar
</Button>

// Loading
<Button variant="primary" state="loading">
  Procesando...
</Button>

// Outline (acción secundaria de marcamiento)
<Button variant="outline" size="lg">
  Cancelar
</Button>

// Ghost (dentro de modales, sin fondo)
<Button variant="ghost" size="md" fullWidth={false}>
  Más tarde
</Button>

// Destructivo
<Button variant="destructive">
  Eliminar cuenta
</Button>

// Par de botones (patrón común en uTransfer)
<div className="flex flex-col gap-s-3 w-full">
  <Button variant="primary">Confirmar envío</Button>
  <Button variant="ghost">Cancelar</Button>
</div>
```

---

## Estructura visual (Figma Giant Primary)

```
┌─────────────────────────────────────────┐  h: 56px
│            [ Texto del botón ]           │  radius: Radius-full (9999px)
└─────────────────────────────────────────┘  fill: btn-primary-bg (#d9016c)
                                              text: white, 16px, 500
                                              padding: 0 32px
```

---

## Button Group

```tsx
// Botones en fila (selector de acción)
const ButtonGroup = ({ options, value, onChange }) => (
  <div className="flex gap-s-2 p-s-2 bg-card rounded-full">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={cn(
          'flex-1 py-s-2 px-s-4 rounded-full text-body-sm font-medium transition-all duration-200',
          value === opt.value
            ? 'bg-btn-primary text-white'
            : 'text-text-secondary hover:text-text-primary'
        )}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

// Uso
<ButtonGroup
  options={[
    { value: 'send', label: 'Enviar' },
    { value: 'receive', label: 'Recibir' },
  ]}
  value={activeTab}
  onChange={setActiveTab}
/>
```

---

## Notas importantes

- **`fullWidth={true}` por defecto** — en mobile casi siempre ocupa el ancho completo
- **Tamaño `giant`** es el estándar del DS — usar `lg` solo en contextos compactos
- **No usar box-shadow en botones** — Revolut style: profundidad solo por color
- Touch target mínimo: `h-s-11` (44px) — nunca menor
- **Transición**: `transition-all duration-200` — no usar `duration-300` en botones (lento)
