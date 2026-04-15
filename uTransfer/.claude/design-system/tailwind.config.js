/**
 * uTransfer Design System — Tailwind CSS Config
 *
 * Consume las CSS custom properties definidas en globals.css.
 * Requiere <html class="dark"> para activar el tema oscuro (dark-first).
 *
 * Tokens fuente: Figma > Utransfer_D_S
 * Valores primitivos: verificados via figma-ds-cli (237 variables extraídas)
 *
 * USO: copiar este archivo a la raíz del proyecto web de uTransfer.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // siempre activo via <html class="dark">
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {

      // ─── COLORES — tokens semánticos (consumen CSS vars de globals.css) ──────
      colors: {

        // Texto
        text: {
          primary:   'var(--text-primary)',
          normal:    'var(--text-primary-normal)',
          secondary: 'var(--text-secondary)',
          contrast:  'var(--text-contrast)',
          invert:    'var(--text-invert)',
          branding:  'var(--text-branding)',
          brand:     'var(--text-brand)',
          opacity: {
            secondary:   'var(--text-opacity-secondary)',
            tertiary:    'var(--text-opacity-tertiary)',
            quaternary:  'var(--text-opacity-quaternary)',
          },
          vibrant: {
            primary:   'var(--text-vibrant-primary)',
            secondary: 'var(--text-vibrant-secondary)',
            tertiary:  'var(--text-vibrant-tertiary)',
          },
        },

        // Fondos
        bg: {
          base:              'var(--bg-base)',
          background:        'var(--bg-background)',
          normal:            'var(--bg-normal)',
          foreground:        'var(--bg-foreground)',
          'primary-elevated':'var(--bg-primary-elevated)',
          'secondary-elevated':'var(--bg-secondary-elevated)',
          'tertiary-elevated':'var(--bg-tertiary-elevated)',
          tertiary:          'var(--bg-tertiary)',
          glass:             'var(--bg-glass)',
          'glass-2':         'var(--bg-glass-2)',
        },

        // Bordes
        border: {
          primary:    'var(--border-primary)',
          secondary:  'var(--border-secondary)',
          neutral:    'var(--border-neutral)',
          brand:      'var(--border-brand)',
          invert:     'var(--border-invert)',
          vibrant:    'var(--border-vibrant)',
          'non-opaque':'var(--border-non-opaque)',
          opaque:     'var(--border-opaque)',
        },

        // Iconos
        icon: {
          primary:  'var(--icon-primary)',
          positive: 'var(--icon-positive)',
          invert:   'var(--icon-invert)',
          brand:    'var(--icon-brand)',
        },

        // Cards / Fills
        card: {
          DEFAULT:    'var(--card)',
          foreground: 'var(--card-foreground)',
          normal: {
            primary:   'var(--card-normal-primary)',
            secondary: 'var(--card-normal-secondary)',
            tertiary:  'var(--card-normal-tertiary)',
            quaternary:'var(--card-normal-quaternary)',
          },
          vibrant: {
            primary:  'var(--card-vibrant-primary)',
            tertiary: 'var(--card-vibrant-tertiary)',
          },
        },

        // Generales
        general: {
          primary: 'var(--general-primary)',
          input:   'var(--general-input)',
        },

        // Botones
        btn: {
          primary:        'var(--btn-primary-bg)',
          'primary-hover':'var(--btn-primary-bg-hover)',
          'primary-text': 'var(--btn-primary-text)',
          secondary:      'var(--btn-secondary-bg)',
          disabled:       'var(--btn-disabled-bg)',
          'disabled-text':'var(--btn-disabled-text)',
          outline:        'var(--btn-outline-border)',
        },

        // Primitivos — Brand (uso directo en casos especiales)
        brand: {
          rose:        '#d9016c',
          'rose-800':  '#df2b85',
          'rose-700':  '#e6569d',
          'rose-400':  '#ec80b5',
          'rose-100':  '#f7cce2',
          'rose-50':   '#ffeef7',
          aqua:        '#02bbb5',
          'aqua-800':  '#2acabf',
          'aqua-700':  '#55d4cc',
          'aqua-400':  '#80dfd8',
          'aqua-100':  '#ccf2f0',
          purple:      '#2b1c45',
          yellow:      '#ffa400',
          'yellow-800':'#ffb32a',
          'yellow-700':'#ffc255',
        },

        // Neutrales — primitivos
        neutral: {
          0:    '#ffffff',
          20:   '#f9fafb',
          50:   '#f5f6f7',
          100:  '#e1e4e8',
          200:  '#d4d8dd',
          300:  '#c2c7ca',
          400:  '#abb1b5',
          500:  '#7c8287',
          600:  '#525252',
          700:  '#404040',
          800:  '#262626',
          900:  '#28292a',
          1000: '#121213',
        },

        // Semánticos de estado
        success: '#34c759',  // green-500
        error:   '#e42131',  // red-500
        warning: '#fbbf24',  // yellow-600
        info:    '#007aff',  // blue-500
      },

      // ─── SPACING (Spacing-0 a Spacing-20) ────────────────────────────────────
      spacing: {
        's-0':  '0px',
        's-1':  '2px',
        's-2':  '4px',
        's-3':  '8px',
        's-4':  '12px',
        's-5':  '16px',
        's-6':  '20px',
        's-7':  '24px',
        's-8':  '28px',
        's-9':  '32px',
        's-10': '40px',
        's-11': '44px',  // touch target mínimo ≥44px
        's-12': '48px',
        's-13': '56px',
        's-14': '64px',
        's-15': '72px',
        's-16': '80px',
        's-17': '96px',
        's-18': '112px',
        's-19': '120px',
        's-20': '128px',
        // Mobile frame
        'frame-w': '393px',
        'frame-h': '852px',
      },

      // ─── BORDER RADIUS (Radius-none a Radius-full) ───────────────────────────
      borderRadius: {
        'none': '0px',      // Radius-none
        'xs':   '4px',      // Radius-xs
        'sm':   '8px',      // Radius-sm
        'md':   '12px',     // Radius-md   → inputs
        'lg':   '16px',     // Radius-lg
        'xl':   '20px',     // Radius-xl   → cards
        '2xl':  '24px',     // Radius-2xl  → cards grandes, modales
        '3xl':  '32px',     // Radius-3xl
        '4xl':  '40px',     // Radius-4xl
        'full': '9999px',   // Radius-full → botones pill
      },

      // ─── TIPOGRAFÍA ──────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        // Text styles del DS (nombre Figma → tamaño px / line-height)
        'display':     ['48px', { lineHeight: '1.1',  fontWeight: '700' }], // Display hero
        'h1':          ['36px', { lineHeight: '1.15', fontWeight: '600' }],
        'h2':          ['32px', { lineHeight: '1.2',  fontWeight: '600' }],
        'h3':          ['28px', { lineHeight: '1.25', fontWeight: '600' }], // Headers/H3
        'h4':          ['24px', { lineHeight: '1.3',  fontWeight: '600' }],
        'h5':          ['20px', { lineHeight: '1.35', fontWeight: '500' }], // Headers/H5
        'subtitle-m':  ['16px', { lineHeight: '1.5',  fontWeight: '500' }], // Subtitle/Subtitle M
        'body-md':     ['14px', { lineHeight: '1.5',  fontWeight: '400' }],
        'body-sm':     ['12px', { lineHeight: '1.5',  fontWeight: '400' }], // Body/Body SM
        'caption':     ['12px', { lineHeight: '1.4',  fontWeight: '400' }], // Caption/Caption 1
        'caption-sm':  ['10px', { lineHeight: '1.4',  fontWeight: '400' }],
      },

      // ─── SOMBRAS / GLASS EFFECTS ─────────────────────────────────────────────
      boxShadow: {
        'card':    '0 1px 2px rgba(0,0,0,0.20), 0 0 0 1px rgba(255,255,255,0.04)',
        'button':  '0 2px 8px rgba(0,0,0,0.30)',
        'dialog':  '0 8px 32px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.06)',
        'modal':   '0 24px 64px rgba(0,0,0,0.60)',
        'none':    'none',
      },

      // ─── BLUR (glass effects) ────────────────────────────────────────────────
      backdropBlur: {
        'glass':  '20px',
        'modal':  '40px',
        'xs':     '4px',
        'sm':     '8px',
      },

      // ─── ANIMACIÓN ───────────────────────────────────────────────────────────
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ─── MOBILE FRAME ────────────────────────────────────────────────────────
      screens: {
        'mobile': '393px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },

  plugins: [
    // Plugin helper para glass morphism
    function({ addUtilities }) {
      addUtilities({
        '.glass-nav': {
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.08)',
        },
        '.glass-modal': {
          background: 'var(--bg-glass-2)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.06)',
        },
        '.glass-button': {
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        },
        // Mobile safe area
        '.safe-top':    { paddingTop: 'env(safe-area-inset-top)' },
        '.safe-bottom': { paddingBottom: 'env(safe-area-inset-bottom)' },
      });
    },
  ],
};
