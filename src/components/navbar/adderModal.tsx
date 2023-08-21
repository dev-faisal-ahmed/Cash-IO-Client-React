import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from '../modal/modal';
import { AddTransaction } from '../transaction/addTransaction';

type AdderModalType = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export function AdderModal({ state, setState }: AdderModalType) {
  const [show, setShow] = useState<'Transaction' | 'Lend/Borrow'>(
    'Transaction',
  );
  return (
    <Modal openModal={state} setOpenModal={setState} title='Transaction Detail'>
      <div className='mx-auto mb-5 grid w-fit grid-cols-2 rounded-md border'>
        <button
          onClick={() => setShow('Transaction')}
          className={`rounded px-5 py-2 ${
            show === 'Transaction'
              ? 'bg-blue-500 text-white shadow'
              : 'text-gray-500'
          }`}
        >
          Add Transaction
        </button>
        <button
          onClick={() => setShow('Lend/Borrow')}
          className={`rounded px-5 py-2 ${
            show === 'Lend/Borrow'
              ? 'bg-blue-500 text-white shadow'
              : 'text-gray-500'
          }`}
        >
          Lend / Borrow
        </button>
      </div>
      {show === 'Transaction' && <AddTransaction setState={setState} />}
    </Modal>
  );
}
