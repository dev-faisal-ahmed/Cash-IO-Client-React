import { TransactionType } from '../../utils/types';
import { IoIosWallet } from 'react-icons/io';
import { GiWallet } from 'react-icons/gi';

export function Transaction(transaction: TransactionType) {
  const { amount, category, date, type } = transaction;
  return (
    <div className='flex items-center gap-5 rounded-md bg-white p-5'>
      <div
        className={`rounded-md p-3 ${
          type === 'revenue' && 'bg-green-100 text-green-600'
        } ${type === 'expense' && 'bg-red-100 text-red-600'}`}
      >
        {type === 'revenue' && <GiWallet size={30} />}
        {type === 'expense' && <IoIosWallet size={30} />}
      </div>
      <div className='w-full'>
        <h3 className='mb-1 truncate text-sm font-semibold'>{category}</h3>
        <p className='text-xs text-gray-500'>
          {JSON.stringify(date).slice(1, 11)}
        </p>
      </div>
      <div>
        <h2
          className={`ml-auto font-semibold ${
            type === 'revenue' && 'text-green-600'
          } ${type === 'expense' && 'text-red-600'}`}
        >
          {type === 'revenue' && '+'}
          {type === 'expense' && '-'}
          {amount}
        </h2>
      </div>
    </div>
  );
}
