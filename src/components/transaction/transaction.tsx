import { useState } from 'react';
import { TransactionType } from '../../utils/types';
import { IoIosWallet } from 'react-icons/io';
import { GiWallet } from 'react-icons/gi';
import TransactionModal from './transactionModal';
import { BiSolidWallet } from 'react-icons/bi';

export function Transaction(transaction: TransactionType) {
  const { amount, category, date, type, _id, description, wallet } =
    transaction;
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className='flex items-center gap-5 rounded-md bg-white p-5'>
      <div
        className={`rounded-md p-3 ${
          type === 'revenue' && 'bg-green-100 text-green-600'
        } ${type === 'expense' && 'bg-red-100 text-red-600'} ${
          type === 'transfer' && 'bg-orange-100 text-orange-600'
        }`}
      >
        {type === 'revenue' && <GiWallet size={30} />}
        {type === 'expense' && <IoIosWallet size={30} />}
        {type === 'transfer' && <BiSolidWallet size={30} />}
      </div>
      <div className='w-full'>
        <h3 className='mb-1 truncate text-sm font-semibold'>{category}</h3>
        <p className='text-xs text-gray-500'>
          {JSON.stringify(date).slice(1, 11)}
        </p>
      </div>
      <div>
        <div className='flex flex-col items-end justify-between gap-3'>
          <h2
            className={`ml-auto font-semibold ${
              type === 'revenue' && 'text-green-600'
            } ${type === 'expense' && 'text-red-600'} ${
              type === 'transfer' && 'text-orange-600'
            }`}
          >
            {type === 'revenue' && '+'}
            {type === 'expense' && '-'}

            {amount}
          </h2>
          <button
            onClick={() => setOpenModal(true)}
            className='animation w-fit rounded bg-blue-500 p-1 text-xs text-white hover:bg-blue-600'
          >
            Detail
          </button>
        </div>
      </div>
      <TransactionModal
        _id={_id}
        amount={amount}
        category={category}
        date={date}
        type={type}
        state={openModal}
        description={description}
        setState={setOpenModal}
        wallet={wallet}
      />
    </div>
  );
}
