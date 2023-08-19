import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from 'recharts';
import { ChartType } from '../../../utils/types';

export function AreaGraph({ data }: ChartType) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={Object.values(data).reverse()}>
        <defs>
          <linearGradient id='colorExpense' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#fca5a5' stopOpacity={0.4} />
            <stop offset='75%' stopColor='#b91c1c' stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#bbf7d0' stopOpacity={0.4} />
            <stop offset='75%' stopColor='#65a30d' stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis dataKey='date' tickLine={false} tickCount={5} axisLine={false} />
        <YAxis axisLine={false} tickLine={false} tickCount={10} />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='expense'
          stroke='#ef4444'
          fillOpacity={1}
          fill='url(#colorExpense)'
        />
        <Area
          type='monotone'
          dataKey='revenue'
          stroke='#84cc16'
          fillOpacity={1}
          fill='url(#colorRevenue)'
        />
        <CartesianGrid opacity={0.15} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
