import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from 'recharts';

export function AreaGraph() {
  const data = [
    { name: 'January', value: 500 },
    { name: 'February', value: 800 },
    { name: 'March', value: 300 },
  ];

  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#2563eb' stopOpacity={0.4} />
            <stop offset='75%' stopColor='#2563eb' stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' tickLine={false} tickCount={5} axisLine={false} />
        <YAxis axisLine={false} tickLine={false} tickCount={10} />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='value'
          stroke='#60a5fa'
          fillOpacity={1}
          fill='url(#colorUv)'
        />
        <CartesianGrid opacity={0.15} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
