import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AreaGraph } from './areaGraph';
import { StoreType } from '../../../utils/types';
import { getDailyTransactions } from '../../../utils/helper';
// import BarGraph from './barGraph';

export function GraphChart() {
  const { transactions } = useSelector((state: StoreType) => state.api);
  const [selectedOption, setSelectedOption] = useState<
    'daily' | 'monthly' | 'category'
  >('daily');

  return (
    <section className='mt-10 rounded-md bg-white p-3 shadow-md sm:p-8'>
      <div className='mb-10 flex items-center justify-between '>
        <h2 className='font-semibold'>Transactions Analysis</h2>
        <div className='flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1'>
          <select
            onChange={(e) =>
              setSelectedOption(
                e.target.value as 'daily' | 'monthly' | 'category',
              )
            }
            className='cursor-pointer bg-transparent px-2 accent-blue-500 outline-none'
            id='options'
          >
            <option value='daily'>Daily</option>
            <option value='monthly'>Monthly</option>
            <option value='category'>Category</option>
          </select>
        </div>
      </div>
      {selectedOption === 'monthly' && (
        <AreaGraph data={getDailyTransactions(transactions, 30)} />
      )}
      {selectedOption === 'daily' && (
        <AreaGraph data={getDailyTransactions(transactions, 7)} />
        // <BarGraph data={getDailyTransactions(transactions, 15)} />
      )}
    </section>
  );
}
