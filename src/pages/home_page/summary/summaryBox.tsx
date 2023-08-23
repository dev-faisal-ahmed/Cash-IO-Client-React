import { MiniBox } from './miniBox';

type SummaryBoxType = {
  data: {
    name: string;
    revenue: number;
    expense: number;
  }[];
  title: 'Balance' | 'Earnings' | 'Expenses';
};

export function SummaryBox({ title, data }: SummaryBoxType) {
  let total = 0;
  return (
    <div
      className={`gap-5 rounded-lg p-8 text-white shadow-md ${
        title === 'Balance' && 'bg-blue-600'
      } ${title === 'Earnings' && 'bg-green-600'} ${
        title === 'Expenses' && 'bg-red-600'
      }`}
    >
      <h2 className='mb-2 text-xl font-semibold'>{title}</h2>
      <div className='flex flex-col gap-1 text-gray-100'>
        {data.map((info, index) => {
          total +=
            title === 'Balance'
              ? info.revenue - info.expense
              : title === 'Earnings'
              ? info.revenue
              : title === 'Expenses'
              ? info.expense
              : 0;
          return (
            <MiniBox
              key={index}
              name={info.name}
              value={
                title === 'Balance'
                  ? (info.revenue | 0) - (info.expense | 0)
                  : title === 'Expenses'
                  ? info.expense
                  : title === 'Earnings'
                  ? info.revenue
                  : 0
              }
            />
          );
        })}
        <MiniBox name={'Total'} value={total} />
      </div>
    </div>
  );
}
