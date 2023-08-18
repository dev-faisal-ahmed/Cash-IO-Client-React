import { Dispatch, SetStateAction, FormEvent, useState } from 'react';
import { Modal } from './modal';
import { Input } from '../input/input';
import { InputOption } from '../input/inputOption';
import { ComplexInput } from '../input/complexInput';
import { TextArea } from '../input/textArea';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { serverAddress } from '../../utils/serverAddress';
import { postReq } from '../../utils/serverReq';
import { toast } from 'react-hot-toast';
import { useGetSummary } from '../../hooks/useGetSummary';

type AddTransactionType = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};
export function AddTransaction({ state, setState }: AddTransactionType) {
  const user = useSelector((state: StoreType) => state.user);
  const { fetchSummary } = useGetSummary(user.email as string);
  const [loading, setLoading] = useState<boolean>(false);

  //  transaction handler
  async function handleAddTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Adding Transaction ...');
    const target = event.target as typeof event.target & {
      amount: { value: number };
      date: { value: Date };
      type: { value: string };
      category: { value: string };
      description: { value: string };
    };

    const amount = +target.amount.value;
    const date = new Date(target.date.value);
    const category = target.category.value;
    const type = target.type.value;
    const description = target.description.value;

    const transactionInfo = {
      email: user.email,
      amount,
      date,
      category,
      type,
      description,
    };

    const url = `${serverAddress}/transaction/add`;

    const data = await fetch(url, postReq(transactionInfo))
      .then((res) => res.json())
      .catch((err) => toast.error(JSON.stringify(err)));

    if (data?.okay) {
      toast.success(data?.msg);
      fetchSummary();
    } else toast.error(data?.msg);

    setLoading(false);
    toast.dismiss(toastId);
    setState(false);
  }

  return (
    <Modal title='Add Transaction' openModal={state} setOpenModal={setState}>
      <form onSubmit={handleAddTransaction} className='flex flex-col gap-4'>
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
        <button
          disabled={loading}
          className='rounded-md border-2 border-blue-500 bg-blue-500 px-5 py-2 font-semibold text-white hover:bg-transparent hover:text-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300'
        >
          + Add
        </button>
      </form>
    </Modal>
  );
}
