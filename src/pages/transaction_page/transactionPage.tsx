import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { Transaction } from '../../components/transaction/transaction';

export function TransactionPage() {
  const { email } = useSelector((state: StoreType) => state.user);
  const { fetchTransactions, transactions } = useGetTransaction(
    email as string,
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <section>
      <h1 className='mb-4 font-semibold'>All Transactions</h1>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
        {transactions
          ?.slice(0, 9)
          .map((transaction, index) => (
            <Transaction
              wallet={transaction.wallet}
              key={index}
              amount={transaction.amount}
              category={transaction.category}
              date={transaction.date}
              type={transaction.type}
              _id={transaction._id}
              description={transaction.description}
            />
          ))}
      </div>
    </section>
  );
}
