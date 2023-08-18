// import { useState, ChangeEvent } from 'react';
import { AreaGraph } from './areaGraph';

export function GraphChart() {
  // const [selectedCategory, setSelectedCategory] = useState<string>('daily');

  // function handleOnChange(event: ChangeEvent<HTMLSelectElement>) {
  //   setSelectedCategory(event.target.value);
  // }

  return (
    <section className='mt-10 rounded-md bg-white p-8 shadow-md'>
      <div className='mb-10 flex items-center justify-between '>
        <h2 className='font-semibold'>Expenses</h2>
        <div className='flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1'>
          <select
            // onChange={handleOnChange}
            className='cursor-pointer bg-transparent px-2 accent-blue-500 outline-none'
            id='options'
          >
            <option value='daily'>Monthly</option>
            <option value='monthly'>Daily</option>
            <option value='weekly'>Monthly</option>
          </select>
        </div>
      </div>
      <AreaGraph />
    </section>
  );
}
