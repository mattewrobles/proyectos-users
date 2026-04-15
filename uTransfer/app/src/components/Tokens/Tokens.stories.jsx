/**
 * uTransfer Design System — Token Documentation
 *
 * Valores extraídos directamente de Figma:
 *   - Utransfer_D_S / Collections: 🧩 Tokens, ⊢⊣ Spacing, ⊙ Radius, 🤖 Primitives
 *
 * Cómo leer esta documentación:
 *   - Cada token tiene su nombre en Figma, el valor en light y dark mode
 *   - Los tokens semánticos (🧩 Tokens) son los únicos que debes usar en componentes
 *   - Nunca usar primitivos directamente ni valores hex fijos
 */

// ── Helpers ────────────────────────────────────────────────────────────────
function Swatch({ name, hex, dark, varName }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <div
      onClick={copy}
      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group"
      title={`Copiar ${hex}`}
    >
      <div
        className="w-8 h-8 rounded-lg shrink-0 ring-1 ring-white/10"
        style={{ background: hex }}
      />
      <div className="min-w-0">
        <p className="text-[#f9fafb] text-xs font-medium truncate">{name}</p>
        <p className="text-[#7c8287] text-[11px] font-mono">{hex}{dark && dark !== hex ? <span className="ml-2 text-[#484848]">dark: {dark}</span> : ''}</p>
        {varName && <p className="text-[#484848] text-[10px] font-mono truncate">{varName}</p>}
      </div>
      <span className="ml-auto text-[10px] text-[#484848] opacity-0 group-hover:opacity-100 shrink-0">
        {copied ? '✓' : 'copy'}
      </span>
    </div>
  )
}

function Section({ title, description, children }) {
  return (
    <div className="mb-10">
      <div className="mb-4">
        <h3 className="text-[#f9fafb] text-base font-semibold">{title}</h3>
        {description && <p className="text-[#7c8287] text-xs mt-1">{description}</p>}
      </div>
      {children}
    </div>
  )
}

function SpacingRow({ name, value }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <span className="text-[#7c8287] text-xs font-mono w-24 shrink-0">{name}</span>
      <div className="bg-[#2b1c45] h-4 rounded" style={{ width: `${Math.min(value, 128)}px` }} />
      <span className="text-[#f9fafb] text-xs font-mono">{value}px</span>
    </div>
  )
}

function RadiusBox({ name, value }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3">
      <div
        className="w-12 h-12 bg-[#2b1c45]"
        style={{ borderRadius: value === 9999 ? '9999px' : `${value}px` }}
      />
      <span className="text-[#f9fafb] text-[11px] font-medium">{name}</span>
      <span className="text-[#7c8287] text-[10px] font-mono">{value === 9999 ? '9999 (full)' : `${value}px`}</span>
    </div>
  )
}

import { useState } from 'react'

export default {
  title: 'DS / Tokens',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Tokens del Design System de uTransfer. Extraídos directamente de Figma — Utransfer_D_S.',
      },
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// COLOR TOKENS
// ─────────────────────────────────────────────────────────────────────────────

export const ColorTokens = {
  name: '🎨 Color Tokens',
  render: () => (
    <div className="p-8 bg-[#0d0d12] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[#f9fafb] text-2xl font-semibold mb-2">Color Tokens</h2>
        <p className="text-[#7c8287] text-sm mb-8">
          Colección <code className="text-[#2b1c45] bg-[#191b1e] px-1 rounded">🧩 Tokens</code> —
          Usar SIEMPRE estos tokens en componentes. Nunca primitivos ni hex fijo.
          Estos valores son los resueltos en <strong>dark mode</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Backgrounds */}
          <Section title="Backgrounds" description="Fondos de pantallas y superficies">
            {[
              { name: 'Backgrounds/Background',          hex: '#111111', dark: '#111111' },
              { name: 'Backgrounds/Foreground',          hex: '#191919', dark: '#191919', note: 'Pantallas principales' },
              { name: 'Backgrounds/BG-Normal',           hex: '#222222', dark: '#222222' },
              { name: 'Backgrounds/Bg-glass',            hex: '#151516', dark: '#151516', note: 'Nav flotante' },
              { name: 'Backgrounds/Bg-glass-modal',      hex: '#151516', dark: '#151516', note: 'Modales' },
              { name: 'Backgrounds/Primary - Elevated',  hex: '#1c1c24', dark: '#1c1c24' },
              { name: 'Backgrounds/Secondary - Elevated',hex: '#26262f', dark: '#26262f' },
            ].map(t => <Swatch key={t.name} {...t} />)}
          </Section>

          {/* Cards */}
          <Section title="Cards & Fills" description="Fondos de tarjetas, ítems y listas">
            {[
              { name: 'Cards-Fills/Card',              hex: '#1c1c24', dark: '#1c1c24', note: 'Card principal' },
              { name: 'Cards-Fills/Normal/Primary',    hex: '#787880', dark: '#787880' },
              { name: 'Cards-Fills/Normal/Secondary',  hex: '#787880', dark: '#787880' },
              { name: 'Cards-Fills/Normal/Tertiary',   hex: '#767680', dark: '#767680' },
              { name: 'Cards-Fills/Vibrant/Primary',   hex: '#333333', dark: '#333333' },
              { name: 'Cards-Fills/Vibrant/Tertiary',  hex: '#121212', dark: '#121212' },
            ].map(t => <Swatch key={t.name} {...t} />)}
          </Section>

          {/* Text */}
          <Section title="Text" description="Tokens para color de texto únicamente">
            {[
              { name: 'Text/Primary',       hex: '#eeeeee', dark: '#eeeeee', note: 'Heading, body principal' },
              { name: 'Text/secondary',     hex: '#b4b4b4', dark: '#b4b4b4' },
              { name: 'Text/disabled',      hex: '#7c8287', dark: '#7c8287', note: 'Placeholder, helper' },
              { name: 'Text/Invert',        hex: '#eeeeee', dark: '#eeeeee' },
              { name: 'Text/on-tint',       hex: '#eeeeee', dark: '#eeeeee', note: 'Siempre oscuro (sobre status bg)' },
              { name: 'Text/On-brand',      hex: '#ffffff', dark: '#ffffff' },
              { name: 'Text/Brand',         hex: '#2b1c45', dark: '#2b1c45' },
              { name: 'Text/contrast',      hex: '#606060', dark: '#606060' },
            ].map(t => <Swatch key={t.name} {...t} />)}
          </Section>

          {/* Icons */}
          <Section title="Icons" description="Tokens para fill y stroke de iconos">
            {[
              { name: 'Icon/Primary',    hex: '#7b7b7b', dark: '#7b7b7b' },
              { name: 'Icon/secondary',  hex: '#606060', dark: '#606060' },
              { name: 'Icon/disabled',   hex: '#606060', dark: '#606060' },
              { name: 'Icon/Invert',     hex: '#ffffff', dark: '#ffffff' },
              { name: 'Icon/Brand',      hex: '#2a2a2a', dark: '#2a2a2a' },
              { name: 'Icon/Positive',   hex: '#2b1c45', dark: '#2b1c45' },
              { name: 'Icon/on-dark',    hex: '#ffffff', dark: '#ffffff' },
              { name: 'Icon/on-light',   hex: '#eeeeee', dark: '#eeeeee' },
            ].map(t => <Swatch key={t.name} {...t} />)}
          </Section>

          {/* Borders */}
          <Section title="Borders" description="Solo para strokes y bordes">
            {[
              { name: 'Border/Primary',   hex: '#3a3a3a', dark: '#3a3a3a', note: 'Hover state' },
              { name: 'Border/Secondary', hex: '#313131', dark: '#313131', note: 'Default' },
              { name: 'Border/Divider',   hex: '#2a2a2a', dark: '#2a2a2a', note: 'Entre ítems' },
              { name: 'Border/focus',     hex: '#2b1c45', dark: '#2b1c45', note: 'Focus state — azul brand' },
              { name: 'Border/Brand',     hex: '#2b1c45', dark: '#2b1c45' },
              { name: 'Border/Invert',    hex: '#ffffff', dark: '#ffffff' },
              { name: 'Border/Vibrant',   hex: '#1a1a1a', dark: '#1a1a1a' },
            ].map(t => <Swatch key={t.name} {...t} />)}
          </Section>

          {/* Status */}
          <Section title="Status" description="Estados semánticos de éxito, error, warning, info">
            {[
              { name: 'status/success',       hex: '#34c759', dark: '#34c759' },
              { name: 'status/success/text',  hex: '#34c759', dark: '#34c759' },
              { name: 'status/success/bg',    hex: '#1a3d25', dark: '#1a3d25' },
              { name: 'status/danger',        hex: '#e42131', dark: '#e42131' },
              { name: 'status/danger/text',   hex: '#ff8892', dark: '#ff8892' },
              { name: 'status/danger/bg',     hex: '#3b1219', dark: '#3b1219' },
              { name: 'status/warning',       hex: '#f59e0b', dark: '#f59e0b' },
              { name: 'status/warning/text',  hex: '#ffdd54', dark: '#ffdd54' },
              { name: 'status/warning/bg',    hex: '#2e2000', dark: '#2e2000' },
              { name: 'status/info',          hex: '#3b82f6', dark: '#3b82f6' },
              { name: 'status/info/text',     hex: '#60a5fa', dark: '#60a5fa' },
              { name: 'status/info/bg',       hex: '#0f1e3b', dark: '#0f1e3b' },
            ].map(t => <Swatch key={t.name} {...t} />)}
          </Section>

          {/* Button component tokens */}
          <Section title="Components / Button" description="Tokens específicos para botones">
            {[
              { name: '↳ Button/↳ Primary/Primary',           hex: '#2b1c45', dark: '#2b1c45' },
              { name: '↳ Button/↳ Primary/Button-Text',       hex: '#ffffff', dark: '#ffffff' },
              { name: '↳ Button/↳ Primary/Primary-hover',     hex: '#121213', dark: '#121213' },
              { name: '↳ Button/↳ Primary/Secondary',         hex: '#d9016c', dark: '#d9016c' },
              { name: '↳ Button/↳ Outline/Outline - Outline', hex: '#d9016c', dark: '#d9016c' },
              { name: '↳ Button/↳ Disabled/Disabled - Bg',    hex: '#525252', dark: '#525252' },
              { name: '↳ Button/↳ Disabled/Disabled - Text',  hex: '#7c8287', dark: '#7c8287' },
            ].map(t => <Swatch key={t.name} {...t} />)}
          </Section>

          {/* Generals */}
          <Section title="Generals" description="Tokens generales de marca">
            {[
              { name: 'Generals/Primary',  hex: '#2b1c45', dark: '#2b1c45', note: 'Color de marca' },
              { name: 'Generals/Rose',     hex: '#d9016c', dark: '#d9016c' },
              { name: 'Generals/Input',    hex: '#191b1e', dark: '#191b1e', note: 'Fondo de inputs' },
            ].map(t => <Swatch key={t.name} {...t} />)}
          </Section>

        </div>
      </div>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// SPACING TOKENS
// ─────────────────────────────────────────────────────────────────────────────

export const SpacingTokens = {
  name: '↔ Spacing Tokens',
  render: () => {
    // Valores extraídos de Figma — ⊢⊣ Spacing collection
    const spacing = [
      { name: 'Spacing-0',   value: 0   },
      { name: 'Spacing-1',   value: 2   },
      { name: 'Spacing-2',   value: 4   },
      { name: 'Spacing-3',   value: 8   },
      { name: 'Spacing-4',   value: 12  },
      { name: 'Spacing-5',   value: 16  },
      { name: 'Spacing-6',   value: 20  },
      { name: 'Spacing-7',   value: 24  },
      { name: 'Spacing-8',   value: 28  },
      { name: 'Spacing-9',   value: 32  },
      { name: 'Spacing-10',  value: 40  },
      { name: 'Spacing-11',  value: 44  },
      { name: 'Spacing-12',  value: 48  },
      { name: 'Spacing-13',  value: 56  },
      { name: 'Spacing-14',  value: 64  },
      { name: 'Spacing-15',  value: 72  },
      { name: 'Spacing-16',  value: 80  },
      { name: 'Spacing-17',  value: 96  },
      { name: 'Spacing-18',  value: 112 },
      { name: 'Spacing-19',  value: 120 },
      { name: 'Spacing-20',  value: 128 },
    ]

    return (
      <div className="p-8 bg-[#0d0d12] min-h-screen">
        <div className="max-w-xl">
          <h2 className="text-[#f9fafb] text-2xl font-semibold mb-2">Spacing</h2>
          <p className="text-[#7c8287] text-sm mb-8">
            Colección <code className="text-[#2b1c45] bg-[#191b1e] px-1 rounded">⊢⊣ Spacing</code> —
            21 niveles (Spacing-0 a Spacing-20). Usar en <code>itemSpacing</code>, <code>padding</code> y gaps.
          </p>
          <div className="bg-[#191919] rounded-2xl p-5 divide-y divide-[#222222]">
            {spacing.map(({ name, value }) => (
              <SpacingRow key={name} name={name} value={value} />
            ))}
          </div>
        </div>
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// RADIUS TOKENS
// ─────────────────────────────────────────────────────────────────────────────

export const RadiusTokens = {
  name: '⬜ Radius Tokens',
  render: () => {
    // Valores extraídos de Figma — ⊙ Radius collection
    const radii = [
      { name: 'Radius-none', value: 0    },
      { name: 'Radius-xs',   value: 4    },
      { name: 'Radius-sm',   value: 8    },
      { name: 'Radius-md',   value: 12   },
      { name: 'Radius-lg',   value: 16   },
      { name: 'Radius-xl',   value: 20   },
      { name: 'Radius-2xl',  value: 24   },
      { name: 'Radius-3xl',  value: 32   },
      { name: 'Radius-4xl',  value: 40   },
      { name: 'Radius-full', value: 9999 },
    ]

    const usage = {
      'Radius-none': '—',
      'Radius-xs':   'Badges, chips pequeños',
      'Radius-sm':   'Tooltips',
      'Radius-md':   'Inputs',
      'Radius-lg':   'Selectors',
      'Radius-xl':   'Botones, inputs (cornerRadius en Figma)',
      'Radius-2xl':  'Cards',
      'Radius-3xl':  'Modales',
      'Radius-4xl':  'Sheets grandes',
      'Radius-full': 'Avatars, botones pill',
    }

    return (
      <div className="p-8 bg-[#0d0d12] min-h-screen">
        <div className="max-w-2xl">
          <h2 className="text-[#f9fafb] text-2xl font-semibold mb-2">Border Radius</h2>
          <p className="text-[#7c8287] text-sm mb-8">
            Colección <code className="text-[#2b1c45] bg-[#191b1e] px-1 rounded">⊙ Radius</code> —
            10 niveles. En Figma los botones y inputs usan <strong>Radius-xl (20px)</strong>, las cards <strong>Radius-2xl (24px)</strong>.
          </p>

          {/* Visual grid */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {radii.map(({ name, value }) => (
              <RadiusBox key={name} name={name} value={value} />
            ))}
          </div>

          {/* Table with usage */}
          <div className="bg-[#191919] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#222222]">
                  <th className="text-left text-[#7c8287] text-xs py-3 px-4 font-medium">Token</th>
                  <th className="text-left text-[#7c8287] text-xs py-3 px-4 font-medium">Valor</th>
                  <th className="text-left text-[#7c8287] text-xs py-3 px-4 font-medium">Uso</th>
                </tr>
              </thead>
              <tbody>
                {radii.map(({ name, value }, i) => (
                  <tr key={name} className={i % 2 === 0 ? 'bg-transparent' : 'bg-[#222222]/30'}>
                    <td className="text-[#f9fafb] text-xs font-mono py-2.5 px-4">{name}</td>
                    <td className="text-[#7c8287] text-xs font-mono py-2.5 px-4">
                      {value === 9999 ? '9999px' : `${value}px`}
                    </td>
                    <td className="text-[#7c8287] text-xs py-2.5 px-4">{usage[name]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY TOKENS
// ─────────────────────────────────────────────────────────────────────────────

export const TypographyTokens = {
  name: '✍ Typography',
  render: () => {
    const styles = [
      { name: 'Headers/H1',        size: '40px', weight: '600', style: 'font-semibold text-[40px]', sample: 'Envía dinero hoy' },
      { name: 'Headers/H2',        size: '32px', weight: '600', style: 'font-semibold text-[32px]', sample: 'Envía dinero hoy' },
      { name: 'Headers/H3',        size: '28px', weight: '600', style: 'font-semibold text-[28px]', sample: 'Envía dinero hoy' },
      { name: 'Headers/H4',        size: '24px', weight: '600', style: 'font-semibold text-[24px]', sample: 'Envía dinero hoy' },
      { name: 'Headers/H5',        size: '20px', weight: '500', style: 'font-medium text-[20px]',   sample: 'Envía dinero hoy' },
      { name: 'Headers/H6',        size: '18px', weight: '500', style: 'font-medium text-[18px]',   sample: 'Envía dinero hoy' },
      { name: 'Subtitle/Subtitle M', size: '16px', weight: '500', style: 'font-medium text-base', sample: 'Subtítulo de pantalla' },
      { name: 'Body/Body',         size: '16px', weight: '400', style: 'font-normal text-base', sample: 'Texto de cuerpo principal' },
      { name: 'Body/Body SM',      size: '14px', weight: '400', style: 'font-normal text-sm',   sample: 'Texto de cuerpo secundario' },
      { name: 'Caption/Caption 1', size: '12px', weight: '400', style: 'font-normal text-xs',   sample: 'Caption y helper text' },
    ]

    return (
      <div className="p-8 bg-[#0d0d12] min-h-screen">
        <div className="max-w-2xl">
          <h2 className="text-[#f9fafb] text-2xl font-semibold mb-2">Typography</h2>
          <p className="text-[#7c8287] text-sm mb-8">
            Fuente: <strong className="text-[#f9fafb]">Inter</strong> — todos los estilos.
            Usar <code className="text-[#2b1c45] bg-[#191b1e] px-1 rounded">setTextStyleIdAsync()</code> en Figma.
          </p>

          <div className="flex flex-col divide-y divide-[#222222]">
            {styles.map(({ name, size, weight, style, sample }) => (
              <div key={name} className="py-5 flex items-baseline gap-6">
                <div className="w-40 shrink-0">
                  <p className="text-[#7c8287] text-xs font-mono">{name}</p>
                  <p className="text-[#484848] text-[10px]">{size} / {weight}</p>
                </div>
                <p className={`text-[#f9fafb] ${style} leading-tight`}>{sample}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// DS OVERVIEW — todo en un vistazo
// ─────────────────────────────────────────────────────────────────────────────

export const Overview = {
  name: '📋 DS Overview',
  render: () => (
    <div className="p-8 bg-[#0d0d12] min-h-screen">
      <div className="max-w-3xl">
        <h2 className="text-[#f9fafb] text-2xl font-semibold mb-1">uTransfer Design System</h2>
        <p className="text-[#7c8287] text-sm mb-8">Tokens extraídos de Figma — Utransfer_D_S</p>

        {/* Collections summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: '🧩', name: 'Tokens',    count: '88+', desc: 'Semánticos de color' },
            { icon: '🤖', name: 'Primitives', count: '125+', desc: 'Colores base' },
            { icon: '⊢⊣', name: 'Spacing',   count: '21',  desc: 'Spacing-0 → 20' },
            { icon: '⊙',  name: 'Radius',    count: '10',  desc: 'none → full' },
          ].map(({ icon, name, count, desc }) => (
            <div key={name} className="bg-[#191919] rounded-2xl p-4">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-[#f9fafb] text-sm font-medium">{name}</p>
              <p className="text-[#2b1c45] text-xl font-semibold">{count}</p>
              <p className="text-[#7c8287] text-xs">{desc}</p>
            </div>
          ))}
        </div>

        {/* Reglas críticas */}
        <div className="bg-[#191919] rounded-2xl p-6 mb-8">
          <h3 className="text-[#f9fafb] text-sm font-semibold mb-4">⚠ Reglas críticas del DS</h3>
          <div className="flex flex-col gap-3">
            {[
              { rule: 'Tokens semánticos SIEMPRE', detail: 'Usar 🧩 Tokens en componentes. Nunca primitivos directos, nunca hex fijo.' },
              { rule: 'Variables bindeadas', detail: 'fills, radius y spacing con setBoundVariable, no valores manuales.' },
              { rule: 'FILL después de appendChild', detail: 'layoutSizingHorizontal = "FILL" solo tras agregar al padre.' },
              { rule: 'Limpiar al inicio de cada script', detail: 'Borrar nodos con el mismo nombre antes de crear nuevos.' },
              { rule: 'Importar TODO antes de crear frames', detail: 'Fuentes, variables y componentes primero; nodos después.' },
            ].map(({ rule, detail }) => (
              <div key={rule} className="flex gap-3">
                <span className="text-[#2b1c45] mt-0.5 shrink-0">●</span>
                <div>
                  <p className="text-[#f9fafb] text-xs font-medium">{rule}</p>
                  <p className="text-[#7c8287] text-xs">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#191919] rounded-2xl p-5">
            <h3 className="text-[#f9fafb] text-sm font-semibold mb-3">Elementos más usados</h3>
            <table className="w-full text-xs">
              <tbody>
                {[
                  { elem: 'Pantalla',       fill: 'Backgrounds/Foreground', radius: '—' },
                  { elem: 'Card',           fill: 'Cards-Fills/Card',       radius: 'Radius-xl / 2xl' },
                  { elem: 'Input',          fill: 'Generals/Input',         radius: 'Radius-xl (20px)' },
                  { elem: 'Botón primary',  fill: 'Components/Button/Primary', radius: 'Radius-full' },
                  { elem: 'Modal / Dialog', fill: 'Backgrounds/Bg-glass-modal', radius: 'Radius-2xl' },
                ].map(({ elem, fill, radius }) => (
                  <tr key={elem} className="border-b border-[#222222]">
                    <td className="text-[#f9fafb] py-2 pr-3 font-medium">{elem}</td>
                    <td className="text-[#7c8287] py-2 pr-3 font-mono text-[11px]">{fill}</td>
                    <td className="text-[#7c8287] py-2 font-mono text-[11px]">{radius}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#191919] rounded-2xl p-5">
            <h3 className="text-[#f9fafb] text-sm font-semibold mb-3">Auditoría DS — 2026-04-14</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#2b1c45] flex items-center justify-center">
                <span className="text-white text-lg font-bold">B</span>
              </div>
              <div>
                <p className="text-[#f9fafb] text-sm font-medium">79 / 100</p>
                <p className="text-[#7c8287] text-xs">Calificación global</p>
              </div>
            </div>
            {[
              { label: 'Tokens semánticos', score: 95, color: '#34c759' },
              { label: 'Scopes configurados', score: 90, color: '#34c759' },
              { label: 'Variable bindings', score: 80, color: '#f59e0b' },
              { label: 'Naming conventions', score: 75, color: '#f59e0b' },
              { label: 'Propiedades ES/EN', score: 60, color: '#e42131' },
            ].map(({ label, score, color }) => (
              <div key={label} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-[#b4b4b4] text-xs">{label}</span>
                  <span className="text-[#7c8287] text-xs">{score}%</span>
                </div>
                <div className="h-1.5 bg-[#2a2a2a] rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
}
