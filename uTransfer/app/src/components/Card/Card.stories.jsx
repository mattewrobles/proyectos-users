import { Card, CardLarge } from './Card'
import { Badge } from '../Badge/Badge'

export default {
  title: 'DS / Card',
  component: Card,
  parameters: {
    docs: { description: { component: 'Card. Figma "Card" — 164×178, radius=16, px/py=16, gap=26.' } },
  },
  argTypes: {
    dark: { control: 'boolean' },
  },
}

// Mini sparkline SVG de muestra
const Sparkline = ({ color = '#02bbb5' }) => (
  <svg width="132" height="37" viewBox="0 0 132 37" fill="none">
    <path
      d="M0 28 C20 28, 30 10, 44 12 C58 14, 68 30, 80 22 C92 14, 102 8, 132 6"
      stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
    />
  </svg>
)

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" />
    <path d="M12 7H7.5C6.1 7 5 5.9 5 4.5S6.1 2 7.5 2 10 3.1 10 4.5V7" strokeLinecap="round"/>
    <path d="M12 7h4.5C17.9 7 19 5.9 19 4.5S17.9 2 16.5 2 14 3.1 14 4.5V7" strokeLinecap="round"/>
  </svg>
)
const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const Playground = {
  args: { title: 'USDT', subtitle: 'Tether', amount: '$3,200.08', delta: '+0.66%', dark: true },
}

export const AssetCards = {
  name: 'Asset Cards',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Card
        title="USDT" subtitle="Tether"
        amount="$3,200.08" delta="+0.66%"
        icon={<WalletIcon />}
        chart={<Sparkline />}
      />
      <Card
        title="USD" subtitle="Dólares"
        amount="$850.00" delta="-1.2%"
        icon={<TrendIcon />}
        chart={<Sparkline color="#e42131" />}
      />
      <Card
        title="EUR" subtitle="Euros"
        amount="€420.50" delta="+2.1%"
        icon={<WalletIcon />}
        chart={<Sparkline color="#3b82f6" />}
        dark={false}
      />
    </div>
  ),
}

export const LargeCard = {
  name: 'CardLarge — Balance total',
  render: () => (
    <div className="max-w-sm">
      <CardLarge
        title="Saldo total"
        amount="$4,050.08"
        badge={<Badge label="Verificado" variant="success" />}
      >
        <div className="flex gap-2 pt-2">
          <Badge label="USDT ×2" variant="secondary" />
          <Badge label="USD" variant="default" />
        </div>
      </CardLarge>
    </div>
  ),
}

export const DarkVsLight = {
  name: 'Dark vs Light',
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Card
        title="USDT" subtitle="Tether"
        amount="$3,200.08" delta="+0.66%"
        icon={<WalletIcon />}
        chart={<Sparkline />}
        dark
      />
      <div className="p-4 rounded-2xl bg-[#f5f5f7]">
        <Card
          title="USDT" subtitle="Tether"
          amount="$3,200.08" delta="+0.66%"
          icon={<WalletIcon />}
          chart={<Sparkline />}
          dark={false}
        />
      </div>
    </div>
  ),
}
