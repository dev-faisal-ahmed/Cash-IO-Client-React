import { BarChart, ResponsiveContainer, XAxis, Bar, Tooltip } from 'recharts';
import { ChartType } from '../../../utils/types';

export default function BarGraph({ data }: ChartType) {
  return (
    <ResponsiveContainer height={300} width={'100%'}>
      <BarChart data={Object.values(data).reverse()}>
        <XAxis
          dataKey={'date'}
          tickLine={false}
          axisLine={false}
          gradientTransform=''
        />
        <Tooltip />

        <Bar
          maxBarSize={25}
          dataKey={'expense'}
          fill='#ef4444'
          background={true}
        />
        <Bar
          maxBarSize={25}
          dataKey={'revenue'}
          fill='#65a30d'
          background={true}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
