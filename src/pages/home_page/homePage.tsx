import { useSelector } from 'react-redux';
import { Summary } from './summary/summary';
import { StoreType } from '../../utils/types';
import { useGetSummary } from '../../hooks/useGetSummary';
import { useEffect } from 'react';

export function HomePage() {
  const user = useSelector((state: StoreType) => state.user);
  const { balance, expense, revenue, fetchSummary } = useGetSummary(
    user.email as string,
  );

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <section className='mt-5'>
      <Summary balance={balance} expense={expense} revenue={revenue} />
    </section>
  );
}
