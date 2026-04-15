import '../src/index.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  // Decorator global — fondo dark en todos los stories
  decorators: [
    (Story, context) => {
      const bg = context.globals?.backgrounds?.value ?? '#0d0d12'
      return (
        <div style={{ background: bg, minHeight: '100vh', padding: '24px' }}>
          <Story />
        </div>
      )
    },
  ],

  globalTypes: {
    backgrounds: {
      defaultValue: { name: 'dark', value: '#0d0d12' },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',  value: '#0d0d12' },
        { name: 'light', value: '#f5f5f7' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
