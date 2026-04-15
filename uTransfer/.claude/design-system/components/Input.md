# Input — uTransfer DS

> Campo de texto para formularios. Radius: `rounded-md` (12px). Fill: `general-input`.
> Fuente Figma: variantes verificadas en `ds-components.md`

---

## Variantes del DS

| Figma Variant | Key | Estado |
|---------------|-----|--------|
| Default · Large · Outline | `85a6f7f74d08b5dbc46d9593345f458eca417bff` | Normal, Activo |
| Disabled · Large · Outline | `631be5a59ee2aa5ed648147dce07876963b177f3` | Disabled outline |
| Disabled · Large · Filled | `0908ecd4774705ee0d989aad3c1b3d62429957f1` | Disabled filled |

---

## Props

```typescript
interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'search';
  state?: 'inactive' | 'active' | 'disabled' | 'error' | 'success';
  hint?: string;        // texto de ayuda debajo del input
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;  // icono o botón a la derecha
  prefix?: string;      // ej: "$" o "USD"
  suffix?: string;      // ej: ".00"
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  maxLength?: number;
}
```

---

## Código React

```tsx
import { cn } from '@/lib/utils';
import { Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';

export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  state = 'inactive',
  hint,
  errorMessage,
  leftIcon,
  rightElement,
  prefix,
  suffix,
  size = 'lg',
  fullWidth = true,
  className,
  inputClassName,
  name,
  id,
  autoFocus,
  maxLength,
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = state === 'disabled';
  const hasError   = state === 'error' || !!errorMessage;
  const isActive   = focused || state === 'active';

  const inputSizes = {
    sm: 'h-s-11 px-s-4 text-body-sm',
    md: 'h-[52px] px-s-5 text-subtitle-m',
    lg: 'h-[56px] px-s-5 text-subtitle-m',
  };

  return (
    <div className={cn('flex flex-col gap-s-2', fullWidth && 'w-full', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id || name}
          className={cn(
            'text-subtitle-m font-medium',
            isDisabled ? 'text-text-opacity-tertiary' : 'text-text-secondary',
          )}
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div
        className={cn(
          'relative flex items-center',
          'rounded-md',           // Radius-md — 12px
          'bg-general-input',     // Generals/Input
          'border',
          'transition-all duration-200',
          // Borde según estado
          hasError    ? 'border-red-500 ring-1 ring-red-500/30'
          : isActive  ? 'border-border-brand ring-1 ring-btn-primary/20'
          : isDisabled ? 'border-border-secondary opacity-50 cursor-not-allowed'
          : 'border-border-primary hover:border-border-neutral',
        )}
      >
        {/* Icono izquierdo */}
        {leftIcon && (
          <span className="pl-s-5 text-icon-primary flex-shrink-0">
            {leftIcon}
          </span>
        )}

        {/* Prefijo */}
        {prefix && (
          <span className={cn('pl-s-5 text-subtitle-m font-medium', isDisabled ? 'text-text-opacity-tertiary' : 'text-text-secondary')}>
            {prefix}
          </span>
        )}

        {/* Campo */}
        <input
          id={id || name}
          name={name}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            'flex-1 bg-transparent outline-none',
            'font-sans text-text-primary placeholder:text-text-opacity-tertiary',
            'disabled:cursor-not-allowed',
            leftIcon || prefix ? 'pl-s-3' : 'pl-s-5',
            rightElement || type === 'password' || suffix ? 'pr-s-3' : 'pr-s-5',
            inputSizes[size],
            inputClassName,
          )}
        />

        {/* Sufijo */}
        {suffix && (
          <span className={cn('pr-s-5 text-subtitle-m', isDisabled ? 'text-text-opacity-tertiary' : 'text-text-secondary')}>
            {suffix}
          </span>
        )}

        {/* Botón show/hide password */}
        {type === 'password' && (
          <button
            type="button"
            tabIndex={-1}
            className="pr-s-5 text-icon-primary hover:text-text-primary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {/* Elemento derecho (custom) */}
        {rightElement && !type.includes('password') && (
          <span className="pr-s-5 flex items-center flex-shrink-0">
            {rightElement}
          </span>
        )}
      </div>

      {/* Hint / Error */}
      {(hint || errorMessage) && (
        <p className={cn(
          'text-caption',
          hasError ? 'text-red-400' : 'text-text-opacity-secondary',
        )}>
          {errorMessage || hint}
        </p>
      )}
    </div>
  );
};
```

---

## Ejemplos de uso

```tsx
// Input de monto (pantalla Enviar)
<Input
  label="Monto"
  placeholder="0.00"
  type="number"
  prefix="$"
  suffix="USD"
/>

// Email
<Input
  label="Correo electrónico"
  placeholder="tu@email.com"
  type="email"
  name="email"
/>

// Contraseña
<Input
  label="Contraseña"
  placeholder="Mínimo 8 caracteres"
  type="password"
  name="password"
/>

// Con error
<Input
  label="Número de teléfono"
  value={phone}
  onChange={setPhone}
  state="error"
  errorMessage="Número inválido. Incluye el código de país."
/>

// Disabled
<Input
  label="País"
  value="Ecuador"
  state="disabled"
/>

// Con icono izquierdo y hint
<Input
  label="Buscar contacto"
  placeholder="Nombre o usuario"
  leftIcon={<Search className="w-5 h-5" />}
  hint="Busca entre tus contactos de uTransfer"
/>

// Input numérico grande (monto)
<Input
  placeholder="0"
  type="number"
  size="lg"
  inputClassName="text-h3 font-semibold text-center"
  suffix="USD"
/>
```

---

## Estructura visual (Figma Large Outline)

```
┌──────────────────────────────────────────┐  h: 56px
│  Label                    Placeholder    │  radius: Radius-md (12px)
└──────────────────────────────────────────┘  bg: Generals/Input
                                              border: Border/Primary (inactive)
                                              border: Border/Brand (active)
```

---

## Input numérico / monto (patrón especial uTransfer)

```tsx
// Input grande para ingresar montos
export const AmountInput = ({ value, onChange, currency = 'USD' }) => (
  <div className="flex flex-col items-center gap-s-3">
    <div className="flex items-baseline gap-s-2">
      <span className="text-h5 text-text-secondary">{currency}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className={cn(
          'bg-transparent outline-none text-center',
          'text-[48px] font-bold text-text-primary',
          'w-full max-w-[200px]',
          'placeholder:text-text-opacity-tertiary',
        )}
      />
    </div>
    {/* Equivalente en otra moneda */}
    <p className="text-body-sm text-text-secondary">≈ S/. 0.00</p>
  </div>
);
```

---

## Notas importantes

- **`label` en Figma es el texto real** — cambiar el string de la prop, no dejarlo como "Label"
- Estado `inactive` → `Inactive` en Figma, estado `active` → `Active`
- El input de monto (envío) usa tamaño de texto gigante (`text-[48px]`) — fuera de escala normal
- Siempre usar `type="number"` con `inputmode="decimal"` para montos en mobile
- **Forgot password**: el input de email debe tener un link "¿Olvidaste?" como `rightElement`
