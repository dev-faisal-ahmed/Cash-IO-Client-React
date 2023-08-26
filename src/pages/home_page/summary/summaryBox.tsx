import { BiSolidWallet } from 'react-icons/bi';
import { GiWallet } from 'react-icons/gi';
import { HiMiniWallet } from 'react-icons/hi2';

type SummaryBoxType = {
  value: number;
  title: 'Balance' | 'Earnings' | 'Expenses';
};

export function SummaryBox({ title, value }: SummaryBoxType) {
  return (
    <div className='flex gap-5 rounded-lg bg-white p-6'>
      <div
        className={`center-xy rounded-md  p-3 ${
          title === 'Balance' && 'bg-blue-100 text-blue-600'
        } ${title === 'Earnings' && 'bg-green-100 text-green-600'} ${
          title === 'Expenses' && 'bg-red-100 text-red-600'
        }`}
      >
        {title === 'Balance' && <BiSolidWallet size={40} />}
        {title === 'Earnings' && <GiWallet size={40} />}
        {title === 'Expenses' && <HiMiniWallet size={40} />}
      </div>
      <div>
        <h2 className='mb-1 text-2xl font-semibold text-blue-950'>
          {value} &#2547;
        </h2>
        <p className='text-sm text-gray-500'>{title}</p>
      </div>
    </div>
  );
}
