import { useState } from 'react';
import { GiWallet } from 'react-icons/gi';
import { StoreType, TransactionType } from '../../utils/types';
import { IoIosWallet } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa6';
import { serverAddress } from '../../utils/serverAddress';
import { deleteReq } from '../../utils/serverReq';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { useGetWallets } from '../../hooks/useGetWallets';

// type
type TransactionDetailType = TransactionType & {
  setModalState: Dispatch<SetStateAction<boolean>>;
};

// component
export function TransactionModalDetail({
  _id,
  amount,
  category,
  date,
  type,
  description,
  setModalState,
  wallet,
}: TransactionDetailType) {
  const { email } = useSelector((state: StoreType) => state.user);
  const { fetchTransactions, transactions } = useGetTransaction(
    email as string,
  );
  const { fetchWallets } = useGetWallets(email as string);
  const [loading, setLoading] = useState<boolean>(false);

  // functions
  async function handleDeleteTransaction() {
    setLoading(true);
    const toastId = toast.loading('Deleting Transaction ...');
    try {
      const response = await fetch(
        `${serverAddress}/delete-transaction`,
        deleteReq({ _id, email, type, amount, wallet }),
      ).then((res) => res.json());

      if (response.okay) {
        toast.success(response.msg);
        fetchTransactions();
        console.log(transactions);
        fetchWallets();
      } else toast.error(response.msg);

      toast.dismiss(toastId);
    } catch (err) {
      toast.error(JSON.stringify(err));
    }
    toast.dismiss(toastId);
    setLoading(false);
    setModalState(false);
  }

  return (
    <div className='mt-8 flex gap-5 rounded-md border bg-white p-5'>
      <div
        className={`rounded-md p-3 ${
          type === 'revenue' && 'bg-green-100 text-green-600'
        } ${type === 'expense' && 'bg-red-100 text-red-600'}`}
      >
        {type === 'revenue' && <GiWallet size={60} />}
        {type === 'expense' && <IoIosWallet size={60} />}
      </div>
      <div className='w-full'>
        <h3 className='mb-1 truncate text-sm font-semibold'>{category}</h3>
        <p className='mb-2 text-sm text-gray-500'>{description}</p>
        <p className='text-xs text-gray-500'>
          {JSON.stringify(date).slice(1, 11)}
        </p>
      </div>
      <div>
        <div className='flex h-full flex-col items-end justify-between'>
          <h2
            className={`ml-auto font-semibold ${
              type === 'revenue' && 'text-green-600'
            } ${type === 'expense' && 'text-red-600'}`}
          >
            {type === 'revenue' && '+'}
            {type === 'expense' && '-'}
            {amount}
          </h2>
          {!loading && (
            <div
              onClick={handleDeleteTransaction}
              className='cursor-pointer rounded-md bg-red-100 p-2 text-red-600'
            >
              <FaTrash size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
