import { useSelector } from 'react-redux';
import { Summary } from './summary/summary';
import { StoreType } from '../../utils/types';
import { useGetSummary } from '../../hooks/useGetSummary';
import { useEffect } from 'react';
import { GraphChart } from './graph/graphChart';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { LoadingSpinner } from '../../components/loadingSpinner';
import { Transaction } from '../../components/transaction/transaction';

export function HomePage() {
  const user = useSelector((state: StoreType) => state.user);
  const { balance, expense, revenue, fetchSummary, isLoading } = useGetSummary(
    user.email as string,
  );
  const {
    transactions,
    fetchTransactions,
    isLoading: transactionLoading,
  } = useGetTransaction(user.email as string);

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
  }, [fetchSummary, fetchTransactions]);

  if (isLoading || transactionLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className='mt-5'>
      <Summary balance={balance} expense={expense} revenue={revenue} />
      <GraphChart />
      <section className='mt-10 '>
        <h1 className='mb-3 font-semibold'>Latest Transactions</h1>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
          {transactions?.map((transaction, index) => (
            <Transaction
              key={index}
              amount={transaction.amount}
              category={transaction.category}
              date={transaction.date}
              type={transaction.type}
              email={transaction.email}
              _id={transaction._id}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
