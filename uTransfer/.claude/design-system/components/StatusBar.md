# Status Bar — uTransfer DS

> Barra de estado iOS. Componente local (no importado de librería externa).
> Node ID en Figma: `1:916` — usar `getNodeByIdAsync`, nunca `importComponentByKeyAsync`.

---

## Información del componente

- **Tipo:** Componente local en el archivo `Utransfer v2`
- **Node ID Figma:** `1:916`
- **Tamaño:** 393×44px (ancho completo de frame mobile)
- **Uso:** Primera instancia en TODAS las pantallas de la app

---

## En web (React)

En web no se usa el status bar del DS de Figma — se reemplaza por:
1. **En mobile web:** Se respeta el `safe-area-inset-top` del sistema (iOS)
2. **En web app:** Se puede simular para prototipos o demos

---

## Código React (simulado para prototipos)

```tsx
import { Signal, Wifi, Battery } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBarProps {
  time?: string;
  dark?: boolean;           // true = iconos oscuros (para fondos claros)
  transparent?: boolean;    // true = sin fondo
  className?: string;
}

export const StatusBar = ({
  time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
  dark = false,
  transparent = false,
  className,
}: StatusBarProps) => {
  const iconColor = dark ? 'text-text-invert' : 'text-text-primary';

  return (
    <div
      className={cn(
        'flex items-center justify-between',
        'h-[44px] px-s-6',
        'select-none',
        !transparent && 'bg-bg-foreground',
        className,
      )}
    >
      {/* Tiempo */}
      <span className={cn('text-body-sm font-semibold', iconColor)}>
        {time}
      </span>

      {/* Iconos del sistema */}
      <div className={cn('flex items-center gap-s-2', iconColor)}>
        <Signal className="w-[17px] h-[12px]" strokeWidth={2} />
        <Wifi className="w-[16px] h-[12px]" strokeWidth={2} />
        <Battery className="w-[25px] h-[12px]" strokeWidth={2} />
      </div>
    </div>
  );
};
```

---

## Uso estándar en pantallas

```tsx
// Pantalla típica
export const AppScreen = ({ children, title }) => (
  <div className="flex flex-col w-[393px] h-[852px] bg-bg-foreground overflow-hidden">
    {/* Status bar — siempre primera */}
    <StatusBar />

    {/* Navigation header */}
    <AppHeader title={title} />

    {/* Contenido */}
    <main className="flex-1 overflow-y-auto">
      {children}
    </main>
  </div>
);

// Con safe area real (producción)
export const SafeScreen = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-bg-foreground">
    {/* Safe area top (iOS) */}
    <div className="safe-top bg-bg-foreground" />

    {/* Contenido */}
    <main className="flex-1">
      {children}
    </main>

    {/* Safe area bottom */}
    <div className="safe-bottom bg-bg-foreground" />
  </div>
);
```

---

## App Header (Navigation Bar)

El status bar va siempre acompañado del navigation header:

```tsx
interface AppHeaderProps {
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export const AppHeader = ({
  title,
  leftAction,
  rightAction,
  transparent = false,
  className,
}: AppHeaderProps) => (
  <div
    className={cn(
      'flex items-center justify-between',
      'h-[56px] px-s-5',
      !transparent && 'bg-bg-foreground',
      className,
    )}
  >
    {/* Left */}
    <div className="w-s-11 flex items-center">
      {leftAction || (
        <button className="w-s-9 h-s-9 rounded-full bg-card-normal-primary flex items-center justify-center active:opacity-70">
          <ChevronLeft className="w-5 h-5 text-icon-primary" />
        </button>
      )}
    </div>

    {/* Title */}
    {title && (
      <h1 className="text-subtitle-m font-semibold text-text-primary flex-1 text-center">
        {title}
      </h1>
    )}

    {/* Right */}
    <div className="w-s-11 flex items-center justify-end">
      {rightAction}
    </div>
  </div>
);
```

---

## Ejemplos de uso

```tsx
// Pantalla con back button
<AppHeader
  title="Enviar dinero"
  leftAction={
    <button onClick={goBack} className="w-s-9 h-s-9 rounded-full bg-card-normal-primary flex items-center justify-center">
      <ChevronLeft className="w-5 h-5 text-icon-primary" />
    </button>
  }
  rightAction={
    <button className="w-s-9 h-s-9 rounded-full bg-card-normal-primary flex items-center justify-center">
      <HelpCircle className="w-5 h-5 text-icon-primary" />
    </button>
  }
/>

// Home header con avatar
<AppHeader
  leftAction={
    <div className="flex items-center gap-s-3">
      <div className="w-s-9 h-s-9 rounded-full bg-brand-rose overflow-hidden">
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-caption text-text-secondary">Hola,</p>
        <p className="text-body-sm font-semibold text-text-primary">{user.firstName}</p>
      </div>
    </div>
  }
  rightAction={
    <button className="w-s-9 h-s-9 rounded-full bg-card-normal-primary relative">
      <Bell className="w-5 h-5 text-icon-primary" />
      {hasNotifications && (
        <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-brand-rose" />
      )}
    </button>
  }
/>
```

---

## Notas importantes

- En **Figma:** usar `getNodeByIdAsync('1:916')` — este componente NO tiene key de librería
- En **producción web:** no renderizar el StatusBar simulado — usar `safe-top` CSS
- El header de navegación (`AppHeader`) tiene **56px de altura** — no 44px
- El header puede ser `transparent` para pantallas con imagen de fondo
