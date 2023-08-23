import { useState, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { StoreType, FromType, TransactionType } from '../../utils/types';
import { FormInput } from '../input/formInput';
import { FormOptionInput } from '../input/formOptionInput';
import { FormComplexInput } from '../input/formComplexInput';
import { FormTextArea } from '../input/formTextArea';
import { toast } from 'react-hot-toast';
import { serverAddress } from '../../utils/serverAddress';
import { postReq } from '../../utils/serverReq';
import { useSelector } from 'react-redux';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { useGetWallets } from '../../hooks/useGetWallets';
import { getWalletName } from '../../utils/helper';
import { useGetCategory } from '../../hooks/useGetCategory';

type TransactionModalFormComponentType = TransactionType & {
  setModalState: Dispatch<SetStateAction<boolean>>;
};

export function TransactionModalForm({
  _id,
  amount,
  type,
  category,
  description,
  wallet,
  setModalState,
}: TransactionModalFormComponentType) {
  const { register, handleSubmit, reset } = useForm<FromType>();
  const { email } = useSelector((state: StoreType) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchTransactions } = useGetTransaction(email as string);
  const { fetchWallets, wallets } = useGetWallets(email as string);
  const { categories } = useGetCategory();

  async function handleUpdateTransaction(data: FromType) {
    if (
      +data.amount === amount &&
      data.category === category &&
      data.type === type &&
      data.description.trim() === description &&
      wallet === data.wallet
    ) {
      toast.error('Nothing to update', { duration: 500 });
      return;
    }
    const toastId = toast.loading('Updating transaction ...');
    setLoading(true);
    const formData = {
      _id,
      email,
      amount: +data.amount,
      prevAmount: amount,
      type: data.type,
      prevType: type,
      wallet: data.wallet,
      prevWallet: wallet,
      category: data.category,
      description: data.description.trim(),
    };
    try {
      const response = await fetch(
        `${serverAddress}/update-transaction`,
        postReq(formData),
      ).then((res) => res.json());

      if (response.okay) {
        toast.success(response.msg);
        fetchTransactions();
        fetchWallets();
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
      <div className='flex items-center gap-5'>
        <FormOptionInput
          name='wallet'
          title='Wallet'
          register={register}
          defaultValue={wallet}
          options={getWalletName(wallets)}
        />
        <FormComplexInput
          name='category'
          title='Category'
          placeholder='Enter Category'
          options={categories as string[]}
          register={register}
          defaultValue={category}
        />
      </div>
      <FormTextArea
        name='description'
        title='Description'
        placeholder='Enter a short Description'
        register={register}
        defaultValue={description as string}
      />
      <button disabled={loading} className='button-primary'>
        Update
      </button>
    </form>
  );
}
