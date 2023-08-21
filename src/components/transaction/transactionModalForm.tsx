import { useState, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  StoreType,
  TransactionModalFormType,
  TransactionType,
} from '../../utils/types';
import { FormInput } from '../input/formInput';
import { FormOptionInput } from '../input/formOptionInput';
import { FormComplexInput } from '../input/formComplexInput';
import { FormTextArea } from '../input/formTextArea';
import { toast } from 'react-hot-toast';
import { serverAddress } from '../../utils/serverAddress';
import { postReq } from '../../utils/serverReq';
import { useSelector } from 'react-redux';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { useGetSummary } from '../../hooks/useGetSummary';

type TransactionModalFormComponentType = TransactionType & {
  setModalState: Dispatch<SetStateAction<boolean>>;
};

export function TransactionModalForm({
  _id,
  amount,
  type,
  category,
  description,
  setModalState,
}: TransactionModalFormComponentType) {
  const { register, handleSubmit, reset } = useForm<TransactionModalFormType>();
  const { email } = useSelector((state: StoreType) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchTransactions } = useGetTransaction(email as string);
  const { fetchSummary } = useGetSummary(email as string);

  async function handleUpdateTransaction(data: TransactionModalFormType) {
    if (
      +data.amount === amount &&
      data.category === category &&
      data.type === type &&
      data.description.trim() === description
    ) {
      toast.error('Nothing to update', { duration: 500 });
      return;
    }
    const toastId = toast.loading('Updating transaction ...');
    setLoading(true);
    const formData = {
      _id,
      amount: +data.amount,
      category: data.category,
      type: data.type,
      description: data.description.trim(),
      email,
      prevType: type,
      prevAmount: amount,
    };
    try {
      const response = await fetch(
        `${serverAddress}/update-transaction`,
        postReq(formData),
      ).then((res) => res.json());

      if (response.okay) {
        toast.success(response.msg);
        fetchTransactions();
        fetchSummary();
      } else toast.error(response.msg);
    } catch (err) {
      toast.error('Something went wrong');
    }

    reset();
    setLoading(false);
    toast.dismiss(toastId);
    setModalState(false);
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateTransaction)}
      className='mt-8 flex flex-col gap-3'
    >
      <div className='flex items-center gap-5'>
        <FormInput
          name='amount'
          placeholder='Enter Amount'
          register={register}
          title={'Amount'}
          type='number'
          defaultValue={amount}
        />
        <FormOptionInput
          name='type'
          title='Transaction Type'
          register={register}
          defaultValue={type}
          options={['revenue', 'expense']}
        />
      </div>
      <FormComplexInput
        name='category'
        title='Category'
        placeholder='Enter Category'
        options={['Travel', 'Mobile Recharge']}
        register={register}
        defaultValue={category}
      />
      <FormTextArea
        name='description'
        title='Description'
        placeholder='Enter a short Description'
        register={register}
        defaultValue={description as string}
      />
      <button
        disabled={loading}
        className='rounded-md border-2 border-blue-500 bg-blue-500 px-5 py-2 font-semibold text-white hover:bg-transparent hover:text-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300'
      >
        Update
      </button>
    </form>
  );
}
