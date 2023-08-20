import { Dispatch, SetStateAction, useState } from 'react';
import { TransactionType } from '../../utils/types';
import { Modal } from '../modal/modal';
import { TransactionModalDetail } from './transactionModalDetail';
import { TransactionModalForm } from './transactionModalForm';

type TransactionModalType = TransactionType & {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export default function TransactionModal({
  _id,
  state,
  setState,
  amount,
  category,
  date,
  type,
  description,
}: TransactionModalType) {
  const [show, setShow] = useState<'detail' | 'edit'>('detail');

  return (
    <Modal openModal={state} setOpenModal={setState} title='Transaction Detail'>
      <div className='mx-auto grid w-fit grid-cols-2 rounded-md border'>
        <button
          onClick={() => setShow('detail')}
          className={`rounded px-5 py-2 ${
            show === 'detail'
              ? 'bg-blue-500 text-white shadow'
              : 'text-gray-500'
          }`}
        >
          Detail
        </button>
        <button
          onClick={() => setShow('edit')}
          className={`rounded px-5 py-2 ${
            show === 'edit' ? 'bg-blue-500 text-white shadow' : 'text-gray-500'
          }`}
        >
          Edit
        </button>
      </div>
      {show === 'detail' && (
        <TransactionModalDetail
          amount={amount}
          category={category}
          date={date}
          type={type}
          description={description}
        />
      )}
      {show === 'edit' && (
        <TransactionModalForm
          setModalState={setState}
          amount={amount}
          category={category}
          date={date}
          type={type}
          description={description}
          _id={_id}
        />
      )}
    </Modal>
  );
}
