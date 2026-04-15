import { Avatar } from './Avatar'

export default {
  title: 'DS / Avatar',
  component: Avatar,
  parameters: {
    docs: { description: { component: 'Avatar. Figma `40006034:14091`. 6 sizes × 3 radius × 3 variants.' } },
  },
  argTypes: {
    size:   { control: 'select', options: [18,24,32,40,48,64] },
    radius: { control: 'select', options: ['circular','rounded','off'] },
  },
}

export const Playground = { args: { initials: 'MA', size: 48, radius: 'circular' } }

export const AllSizes = {
  name: 'All Sizes — Initials',
  render: () => (
    <div className="flex items-end gap-4">
      {[18,24,32,40,48,64].map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar initials="MA" size={size} />
          <span className="text-[#484848] text-[10px]">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllRadius = {
  name: 'Radius variants — 48px',
  render: () => (
    <div className="flex gap-6 items-center">
      {[
        { radius: 'circular', label: 'Circular' },
        { radius: 'rounded',  label: 'Rounded' },
        { radius: 'off',      label: 'Off' },
      ].map(({ radius, label }) => (
        <div key={radius} className="flex flex-col items-center gap-2">
          <Avatar initials="MA" size={48} radius={radius} />
          <span className="text-[#484848] text-xs">{label}</span>
        </div>
      ))}
    </div>
  ),
}

export const Colors = {
  name: 'Custom colors',
  render: () => (
    <div className="flex gap-3 flex-wrap">
      {[
        { initials: 'MA', bg: '#2b1c45' },
        { initials: 'GB', bg: '#d9016c' },
        { initials: 'NH', bg: '#34c759' },
        { initials: 'JD', bg: '#3b82f6' },
        { initials: 'BE', bg: '#e42131' },
        { initials: 'CR', bg: '#f59e0b' },
      ].map(({ initials, bg }) => (
        <Avatar key={initials} initials={initials} size={48} bg={bg} />
      ))}
    </div>
  ),
}

export const InContext = {
  name: 'In context — lista de contactos',
  render: () => (
    <div className="flex flex-col gap-1 max-w-xs">
      {[
        { initials: 'MA', name: 'Mau',  amount: '$50.00', bg: '#2b1c45' },
        { initials: 'GB', name: 'Gaby', amount: '$25.00', bg: '#d9016c' },
        { initials: 'NH', name: 'Naho', amount: '$100.00', bg: '#34c759' },
      ].map(({ initials, name, amount, bg }) => (
        <div key={name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#191b1e] transition-colors">
          <Avatar initials={initials} size={40} bg={bg} />
          <span className="flex-1 text-[#f9fafb] text-sm font-medium">{name}</span>
          <span className="text-[#7c8287] text-sm">{amount}</span>
        </div>
      ))}
    </div>
  ),
}
