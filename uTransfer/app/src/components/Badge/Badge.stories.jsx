import { Badge } from './Badge'

export default {
  title: 'DS / Badge',
  component: Badge,
  parameters: {
    docs: { description: { component: 'Badge. Figma `40006033:12034`. h=22, radius=10, px=10.' } },
  },
  argTypes: {
    variant: { control: 'select', options: ['default','secondary','destructive','success','outline','warning'] },
    dot:     { control: 'boolean' },
    label:   { control: 'text' },
  },
}

export const Playground = { args: { label: 'Badge', variant: 'default' } }

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge label="Default"     variant="default" />
      <Badge label="Secondary"   variant="secondary" />
      <Badge label="Destructive" variant="destructive" />
      <Badge label="Success"     variant="success" />
      <Badge label="Warning"     variant="warning" />
      <Badge label="Outline"     variant="outline" />
    </div>
  ),
}

export const Dots = {
  name: 'Dot variant',
  render: () => (
    <div className="flex gap-3 items-center">
      <Badge dot variant="default" />
      <Badge dot variant="destructive" />
      <Badge dot variant="success" />
      <Badge dot variant="warning" />
      <Badge dot variant="secondary" />
    </div>
  ),
}

export const InContext = {
  name: 'In context',
  render: () => (
    <div className="flex flex-col gap-4 max-w-xs">
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#191b1e]">
        <span className="text-[#f9fafb] text-sm">Notificaciones</span>
        <Badge label="3" variant="destructive" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#f9fafb] text-sm">Estado KYC</span>
        <Badge label="Verificado" variant="success" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#f9fafb] text-sm">Upoints</span>
        <Badge label="1,240 pts" variant="default" />
      </div>
    </div>
  ),
}
