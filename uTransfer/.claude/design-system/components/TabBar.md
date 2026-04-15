# Tab Bar — uTransfer DS

> Navegación inferior. Glass effect: `Backgrounds/Bg-glass`. Radius: `rounded-full` o `rounded-2xl`.
> Touch targets ≥44px. Con `safe-area-inset-bottom`.

---

## Estructura visual

```
┌─────────────────────────────────────────────┐
│   🏠 Home  │  💸 Enviar  │  🎮 Juegos  │ ⚙️  │
└─────────────────────────────────────────────┘
h: ~64px + safe-area-bottom
bg: Backgrounds/Bg-glass (glass effect)
border-top: Border/Primary
```

---

## Props

```typescript
interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs?: TabItem[];
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;  // ícono en estado activo
  badge?: number;                // número de notificaciones
}
```

---

## Código React

```tsx
import { cn } from '@/lib/utils';
import { Home, Send, Gamepad2, Settings, PlusCircle } from 'lucide-react';

const DEFAULT_TABS: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="w-6 h-6" strokeWidth={1.5} />,
    activeIcon: <Home className="w-6 h-6" strokeWidth={2.5} />,
  },
  {
    id: 'send',
    label: 'Enviar',
    icon: <Send className="w-6 h-6" strokeWidth={1.5} />,
    activeIcon: <Send className="w-6 h-6" strokeWidth={2.5} />,
  },
  {
    id: 'games',
    label: 'Juegos',
    icon: <Gamepad2 className="w-6 h-6" strokeWidth={1.5} />,
    activeIcon: <Gamepad2 className="w-6 h-6" strokeWidth={2.5} />,
  },
  {
    id: 'settings',
    label: 'Ajustes',
    icon: <Settings className="w-6 h-6" strokeWidth={1.5} />,
    activeIcon: <Settings className="w-6 h-6" strokeWidth={2.5} />,
  },
];

export const TabBar = ({
  activeTab,
  onTabChange,
  tabs = DEFAULT_TABS,
}: TabBarProps) => (
  <nav
    className={cn(
      'fixed bottom-0 left-0 right-0 z-40',
      'glass-nav',              // bg-glass + backdrop-blur
      'border-t border-border-primary',
      'safe-bottom',            // env(safe-area-inset-bottom)
    )}
  >
    <div className="flex items-center justify-around h-[64px] px-s-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TabBarItem
            key={tab.id}
            tab={tab}
            isActive={isActive}
            onPress={() => onTabChange(tab.id)}
          />
        );
      })}
    </div>
  </nav>
);

const TabBarItem = ({
  tab,
  isActive,
  onPress,
}: {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
}) => (
  <button
    onClick={onPress}
    className={cn(
      'flex flex-col items-center justify-center gap-s-1',
      'min-w-[44px] h-[44px] px-s-3',  // touch target ≥44px
      'rounded-xl',
      'transition-all duration-200',
      'active:scale-90',
      isActive ? 'text-general-primary' : 'text-text-secondary hover:text-text-primary',
    )}
    aria-label={tab.label}
    aria-selected={isActive}
  >
    {/* Icono con punto de indicador */}
    <div className="relative">
      {isActive ? (tab.activeIcon || tab.icon) : tab.icon}
      {/* Badge de notificaciones */}
      {tab.badge && tab.badge > 0 && (
        <span className={cn(
          'absolute -top-1 -right-1',
          'min-w-[16px] h-[16px] rounded-full',
          'bg-brand-rose text-white',
          'text-[10px] font-bold flex items-center justify-center px-[3px]',
        )}>
          {tab.badge > 99 ? '99+' : tab.badge}
        </span>
      )}
    </div>
    {/* Label */}
    <span className={cn(
      'text-[10px] font-medium',
      isActive ? 'text-general-primary' : 'text-text-secondary',
    )}>
      {tab.label}
    </span>
  </button>
);
```

---

## Variante: Tab Bar flotante (pill)

```tsx
// Tab bar redondeada flotante (Revolut style)
export const FloatingTabBar = ({ activeTab, onTabChange, tabs = DEFAULT_TABS }) => (
  <nav
    className={cn(
      'fixed bottom-s-5 left-1/2 -translate-x-1/2 z-40',
      'glass-nav',
      'rounded-full',
      'border border-border-primary',
      'shadow-dialog',
    )}
  >
    <div className="flex items-center h-[56px] px-s-3 gap-s-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center justify-center gap-s-2',
              'h-s-11 px-s-4 rounded-full',
              'transition-all duration-200',
              isActive
                ? 'bg-btn-primary text-white'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {isActive ? (tab.activeIcon || tab.icon) : tab.icon}
            {isActive && (
              <span className="text-body-sm font-medium whitespace-nowrap">
                {tab.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </nav>
);
```

---

## Uso en layout principal

```tsx
// app/layout.tsx o _app.tsx
export const AppLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="relative min-h-screen bg-bg-base">
      {/* Contenido con padding bottom para el tab bar */}
      <main className="pb-[calc(64px+env(safe-area-inset-bottom))]">
        {children}
      </main>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};
```

---

## Tabs de uTransfer (definición completa)

```tsx
// Tabs de la app según product.md
const UTRANSFER_TABS: TabItem[] = [
  { id: 'home',     label: 'Home',    icon: <Home />    },
  { id: 'send',     label: 'Enviar',  icon: <Send />    },
  { id: 'games',    label: 'Juegos',  icon: <Gamepad2 /> },
  { id: 'settings', label: 'Ajustes', icon: <Settings /> },
];
```

---

## Notas importantes

- **Glass obligatorio** en tab bar — es un elemento flotante sobre el contenido
- `safe-bottom` es **crítico** — sin él el tab bar queda detrás del home indicator de iPhone
- Touch targets: cada tab button mínimo `44x44px`
- El tab activo usa `general-primary` (#d9016c) como color
- `active:scale-90` da feedback táctil al presionar
- Si el diseño usa tab bar flotante (pill): agregar `pb-s-16` al contenido para dejar espacio
