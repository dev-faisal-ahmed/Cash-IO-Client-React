import { Dispatch, SetStateAction } from 'react';
import { Modal } from './modal';
import { Input } from '../input/input';
import { InputOption } from '../input/inputOption';
import ComplexInput from '../input/complexInput';
import { TextArea } from '../input/textArea';

type AddTransactionType = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};
export function AddTransaction({ state, setState }: AddTransactionType) {
  return (
    <Modal title='Add Transaction' openModal={state} setOpenModal={setState}>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
          <Input
            title='Amount'
            type='number'
            id='amount'
            name='amount'
            placeholder='Enter Amount'
          />
          <Input title='Date' id='date' name='date' type='date' />
        </div>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
          <InputOption
            title='Transaction Type'
            id='type'
            name='type'
            options={['expense', 'revenue']}
            placeholder='Select What type of transaction'
          />
          <ComplexInput
            title='Category'
            id='category'
            name='category'
            options={['Travel', 'Transport', 'Snacks']}
            placeholder='Select Category'
          />
        </div>
        <TextArea
          title='Description'
          id='description'
          name='description'
          placeholder='Write a short description'
        />
        <hr />
        <button className='rounded-md border-2 border-blue-500 bg-blue-500 px-5 py-2 font-semibold text-white hover:bg-transparent hover:text-blue-500'>
          + Add
        </button>
      </form>
    </Modal>
  );
}
