import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  Bar,
  Tooltip,
  YAxis,
  LabelList,
} from 'recharts';
import { ChartType } from '../../../utils/types';

export default function BarGraph({ data }: ChartType) {
  return (
    <ResponsiveContainer height={300} width={'100%'}>
      <BarChart data={Object.values(data).reverse()}>
        <YAxis domain={[0, `dataMax + 100`]} tickCount={5} />
        <XAxis dataKey={'date'} tickLine={false} axisLine={false} />
        <Tooltip cursor={{ fill: 'transparent' }} />

        <Bar
          maxBarSize={25}
          dataKey={'expense'}
          fill='#ef4444'
          radius={[5, 5, 0, 0]}
        >
          <LabelList dataKey={'expense'} position={'top'} />
        </Bar>
        <Bar
          maxBarSize={25}
          dataKey={'revenue'}
          fill='#65a30d'
          radius={[5, 5, 0, 0]}
        >
          <LabelList dataKey={'expense'} position={'top'} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
