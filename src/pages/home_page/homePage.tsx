import { useSelector } from 'react-redux';
import { Summary } from './summary/summary';
import { StoreType } from '../../utils/types';
import { useEffect } from 'react';
import { GraphChart } from './graph/graphChart';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { LoadingSpinner } from '../../components/loadingSpinner';
import { Transaction } from '../../components/transaction/transaction';
import { useGetWallets } from '../../hooks/useGetWallets';

export function HomePage() {
  const { email } = useSelector((state: StoreType) => state.user);
  const { fetchWallets, loading, wallets } = useGetWallets(email as string);

  const {
    transactions,
    fetchTransactions,
    isLoading: transactionLoading,
  } = useGetTransaction(email as string);

  useEffect(() => {
    fetchTransactions();
    fetchWallets();
  }, []);

  if (loading || transactionLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className='t-5'>
      {/* summary */}
      <Summary wallets={wallets} />
      {/* charts */}
      <GraphChart />
      <section className='mt-10 '>
        <h1 className='mb-4 font-semibold'>Latest Transactions</h1>
        {/* transactions */}
        <div className='page-grid'>
          {transactions
            ?.slice(0, 9)
            .map((transaction, index) => (
              <Transaction
                key={index}
                amount={transaction.amount}
                category={transaction.category}
                date={transaction.date}
                type={transaction.type}
                _id={transaction._id}
                description={transaction.description}
                wallet={transaction.wallet}
              />
            ))}
        </div>
      </section>
    </section>
  );
}
