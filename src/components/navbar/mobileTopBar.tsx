import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoWallet } from 'react-icons/io5';
import { NavMenu } from './navMenu';
import { AdderModal } from './adderModal';

export function MobileTopBar() {
  const [showAdder, setShowAdder] = useState<boolean>(false);

  return (
    <section className='flex items-center justify-between px-5 py-3 sm:hidden'>
      <h3 className='title center-y cursor-pointer gap-3 text-3xl text-blue-600'>
        <IoWallet />
        Cash-IO
      </h3>
      <div className='flex items-center gap-5'>
        <button
          onClick={() => setShowAdder(true)}
          className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white'
        >
          <AiOutlinePlus size={20} />
        </button>
        <NavMenu />
      </div>
      <AdderModal state={showAdder} setState={setShowAdder} />
    </section>
  );
}
