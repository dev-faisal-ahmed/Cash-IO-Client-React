import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransactionModalFormType, StoreType } from '../../utils/types';
import { serverAddress } from '../../utils/serverAddress';
import { postReq } from '../../utils/serverReq';
import { toast } from 'react-hot-toast';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { FormInput } from '../input/formInput';
import { useForm } from 'react-hook-form';
import { FormOptionInput } from '../input/formOptionInput';
import { FormComplexInput } from '../input/formComplexInput';
import { FormTextArea } from '../input/formTextArea';
import { useGetCategory } from '../../hooks/useGetCategory';
import { useGetWallets } from '../../hooks/useGetWallets';
import { getWalletName } from '../../utils/helper';

type AddTransactionType = {
  setState: Dispatch<SetStateAction<boolean>>;
};
export function AddTransaction({ setState }: AddTransactionType) {
  const { email } = useSelector((state: StoreType) => state.user);
  const { fetchWallets, wallets } = useGetWallets(email as string);
  const { fetchTransactions } = useGetTransaction(email as string);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<TransactionModalFormType>();
  const { categories } = useGetCategory();

  //  transaction handler
  async function handleAddTransaction(fromData: TransactionModalFormType) {
    setLoading(true);
    const toastId = toast.loading('Adding Transaction ...');
    const { amount, category, date, description, type, wallet } = fromData;

    const transactionInfo = {
      email: email,
      amount: parseInt(amount),
      date: new Date(date),
      category,
      type,
      description,
      wallet,
    };

    const url = `${serverAddress}/transaction/add`;

    const data = await fetch(url, postReq(transactionInfo))
      .then((res) => res.json())
      .catch((err) => toast.error(JSON.stringify(err)));

    if (data?.okay) {
      toast.success(data?.msg);
      fetchWallets();
      fetchTransactions();
    } else toast.error(data?.msg);

    setLoading(false);
    toast.dismiss(toastId);
    reset();
    setState(false);
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddTransaction)}
      className='mt-5 flex flex-col gap-4'
    >
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
        <FormInput
          title='Amount'
          name='amount'
          register={register}
          type='number'
          placeholder='Enter Amount'
        />

        <FormInput title='Date' name='date' register={register} type='date' />
      </div>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
        <FormOptionInput
          title='Transaction Type'
          name='type'
          options={['expense', 'revenue']}
          register={register}
        />
        <FormOptionInput
          title='Wallet'
          name='wallet'
          options={getWalletName(wallets)}
          register={register}
        />
      </div>
      <FormComplexInput
        title='Category'
        name='category'
        options={categories as string[]}
        placeholder='Select Category'
        register={register}
      />
      <FormTextArea
        title='Description'
        name='description'
        placeholder='Write a short description'
        register={register}
      />
      <hr />
      <button
        disabled={loading}
        className='rounded-md border-2 border-blue-500 bg-blue-500 px-5 py-2 font-semibold text-white hover:bg-transparent hover:text-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300'
      >
        + Add
      </button>
    </form>
  );
}
