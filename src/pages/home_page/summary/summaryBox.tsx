import { ReactNode } from 'react';

type SummaryBoxType = {
  icon: ReactNode;
  value: number;
  title: string;
};

export default function SummaryBox({ icon, value, title }: SummaryBoxType) {
  return (
    <div className='flex gap-5 rounded-lg bg-white p-8 shadow'>
      <div className='rounded-lg bg-blue-100 p-3 text-blue-500'>{icon}</div>
      <div>
        <h3 className='mb-1 text-2xl font-semibold text-blue-900'>
          {value} &#2547;
        </h3>
        <p className='text-gray-500'>{title}</p>
      </div>
    </div>
  );
}
