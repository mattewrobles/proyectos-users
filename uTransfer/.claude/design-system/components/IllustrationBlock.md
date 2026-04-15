# IllustrationBlock — uTransfer DS

> Componente para mostrar ilustraciones del DS en pantallas de estado.
> Fuente Figma: Component Set "Ilustraciones 2" · importar con `importComponentByKeyAsync`.

---

## Ilustraciones disponibles

| Nombre | Key Figma | Uso recomendado |
|--------|-----------|-----------------|
| Wallet 01 | `e4b09f3c3b1242ba4e786d74396977f94498e2de` | Éxito, transferencia completada |
| Wallet 02 | `c9a29cc971143518f852091ee93c6391b7c52891` | Wallet vacía, primer uso |
| Wallet 03 | `fc260a0441f985f02ae6193e57576321541435cc` | Depósito, fondos |
| Wallet 04 | `4dd91f2d7ba2790c18263b1b5af4371568e7800a` | Retiro, transferencia saliente |
| Wallet 05 | `a0c5ed3f766dafcc880edf3254107f8144f6c983` | Wallet segura, protección |
| Connectivity 01 | `1f1be5b89275ffdcc72b9a748e99654fdfc8259f` | Sin conexión |
| Connectivity 02 | `0f530586d586f24611d7318d25146d1213938945` | Conectando... |
| Connectivity 03 | `6fc75c45249e628726141250dfd558b8dc99e473` | Conexión establecida |
| Messages 01 | `e7bcee81839f88e9958f207fc3a189a00d8ac55d` | Notificación, solicitud de dinero |
| Messages 02 | `658cbf6f1d78c7548af2f6cf48b5aeeeac3ad575` | Mensaje enviado |
| Social 02 | `d412c7148f3c01f72bc458630443c6fbbe321ad8` | Referidos |
| Social 03 | `648d128b6469ea2d31ae7b8da02b96975b128c32` | Comunidad |
| Social 05 | `c31e46409f13259b18ce18f0e5cc7d2323233a45` | Compartir |
| Not Found | `b2f3e10b80c3cbb1bfd1532a86e9869dcd1e154e` | Error 404, no encontrado |

---

## Props

```typescript
type IllustrationType =
  | 'wallet-success'
  | 'wallet-empty'
  | 'wallet-deposit'
  | 'wallet-withdraw'
  | 'wallet-secure'
  | 'no-connection'
  | 'connecting'
  | 'connected'
  | 'message'
  | 'message-sent'
  | 'referral'
  | 'community'
  | 'share'
  | 'not-found';

interface IllustrationBlockProps {
  type: IllustrationType;
  size?: number;           // px — default 200
  title?: string;
  description?: string;
  action?: React.ReactNode; // botón o link
  className?: string;
}
```

---

## Código React

```tsx
// En web, las ilustraciones del DS de Figma se reemplazan por SVGs o imágenes.
// Se mapean por nombre semántico.

const ILLUSTRATION_MAP: Record<IllustrationType, string> = {
  'wallet-success':  '/illustrations/wallet-success.svg',   // Wallet 01
  'wallet-empty':    '/illustrations/wallet-empty.svg',     // Wallet 02
  'wallet-deposit':  '/illustrations/wallet-deposit.svg',   // Wallet 03
  'wallet-withdraw': '/illustrations/wallet-withdraw.svg',  // Wallet 04
  'wallet-secure':   '/illustrations/wallet-secure.svg',    // Wallet 05
  'no-connection':   '/illustrations/no-connection.svg',    // Connectivity 01
  'connecting':      '/illustrations/connecting.svg',       // Connectivity 02
  'connected':       '/illustrations/connected.svg',        // Connectivity 03
  'message':         '/illustrations/message.svg',          // Messages 01
  'message-sent':    '/illustrations/message-sent.svg',     // Messages 02
  'referral':        '/illustrations/referral.svg',         // Social 02
  'community':       '/illustrations/community.svg',        // Social 03
  'share':           '/illustrations/share.svg',            // Social 05
  'not-found':       '/illustrations/not-found.svg',        // Not Found
};

export const IllustrationBlock = ({
  type,
  size = 200,
  title,
  description,
  action,
  className,
}: IllustrationBlockProps) => (
  <div className={cn(
    'flex flex-col items-center text-center gap-s-5 py-s-7',
    className,
  )}>
    {/* Ilustración */}
    <div
      style={{ width: size, height: size }}
      className="flex-shrink-0"
    >
      <img
        src={ILLUSTRATION_MAP[type]}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-contain"
      />
    </div>

    {/* Texto */}
    {(title || description) && (
      <div className="flex flex-col gap-s-2 max-w-[280px]">
        {title && (
          <h2 className="text-h5 font-semibold text-text-primary">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-body-sm text-text-secondary">
            {description}
          </p>
        )}
      </div>
    )}

    {/* Acción */}
    {action && (
      <div className="w-full max-w-[280px]">
        {action}
      </div>
    )}
  </div>
);
```

---

## Pantallas de estado (uso más común)

```tsx
// Pantalla de éxito — transferencia completada
<IllustrationBlock
  type="wallet-success"
  size={200}
  title="¡Dinero enviado!"
  description="$150.00 USD están en camino a María García"
  action={
    <Button onClick={() => navigate('/home')}>Volver al inicio</Button>
  }
/>

// Estado vacío — sin transacciones
<IllustrationBlock
  type="wallet-empty"
  size={160}
  title="Aún no hay movimientos"
  description="Tus transacciones aparecerán aquí"
  action={
    <Button variant="outline" onClick={() => navigate('/send')}>
      Hacer primer envío
    </Button>
  }
/>

// Error de conexión
<IllustrationBlock
  type="no-connection"
  size={160}
  title="Sin conexión"
  description="Verifica tu conexión a internet"
  action={
    <Button onClick={retry}>Intentar de nuevo</Button>
  }
/>

// Error 404
<IllustrationBlock
  type="not-found"
  size={180}
  title="Página no encontrada"
  description="El contenido que buscas no está disponible"
/>
```

---

## Variante: Screen de estado completa

```tsx
// Pantalla full con status bar + ilustración (pantallas de éxito/error)
export const StatusScreen = ({
  type,
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  type: IllustrationType;
  title: string;
  description: string;
  primaryAction: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}) => (
  <div className="flex flex-col w-full min-h-screen bg-bg-foreground">
    <StatusBar />

    <div className="flex-1 flex flex-col items-center justify-center px-s-6">
      <IllustrationBlock
        type={type}
        size={200}
        title={title}
        description={description}
      />
    </div>

    <div className="flex flex-col gap-s-3 px-s-6 pb-s-10 safe-bottom">
      <Button onClick={primaryAction.onClick}>
        {primaryAction.label}
      </Button>
      {secondaryAction && (
        <Button variant="ghost" onClick={secondaryAction.onClick}>
          {secondaryAction.label}
        </Button>
      )}
    </div>
  </div>
);

// Uso
<StatusScreen
  type="wallet-success"
  title="¡Enviado con éxito!"
  description="María recibirá $150.00 USD en los próximos minutos"
  primaryAction={{ label: 'Volver al inicio', onClick: goHome }}
  secondaryAction={{ label: 'Hacer otro envío', onClick: goSend }}
/>
```

---

## Cómo exportar ilustraciones de Figma a SVG

Para obtener los SVGs de las ilustraciones, en Figma CLI:

```bash
# Exportar Wallet 01 como SVG
node src/index.js export node e4b09f3c3b1242ba4e786d74396977f94498e2de -f svg -o wallet-success.svg

# Exportar todas las ilustraciones (script)
node src/index.js run /tmp/export-illustrations.js
```

---

## Notas importantes

- Las ilustraciones de Figma son **vectoriales** — exportar siempre como SVG para web
- Tamaño recomendado: 160-220px para pantallas full, 80-120px para estados vacíos en listas
- Las ilustraciones son **decorativas** — siempre usar `aria-hidden="true"` y poner el texto en el title/description
- Pantallas de éxito: **opcionales y breves** — Revolut style: no demorar al usuario
