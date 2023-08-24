import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/input/formInput';
import { FromType, StoreType } from '../../utils/types';
import { twMerge } from 'tailwind-merge';
import { serverAddress } from '../../utils/serverAddress';
import { serverReq } from '../../utils/serverReq';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useGetWallets } from '../../hooks/useGetWallets';

export const AddWallet = () => {
  const { register, handleSubmit, reset } = useForm<FromType>();
  const { email } = useSelector((store: StoreType) => store.user);
  const { fetchWallets } = useGetWallets(email as string);
  const [loading, setLoading] = useState<boolean>(false);

  async function onAddWallet(data: FromType) {
    setLoading(true);
    const toastId = toast.loading('Adding Wallet ...');
    const { amount, wallet } = data;
    try {
      const response = await fetch(
        `${serverAddress}/add-wallet`,
        serverReq('POST', { revenue: parseInt(amount), name: wallet, email }),
      ).then((res) => res.json());
      if (response.okay) {
        toast.success(response.msg, { duration: 1000 });
        fetchWallets();
      } else toast.error(response.msg, { duration: 1000 });
    } catch (err) {
      toast.error(JSON.stringify(err), { duration: 1000 });
    }

    toast.dismiss(toastId);
    setLoading(false);
    reset();
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onAddWallet)} className='flex-down gap-5'>
        <div className='center-y gap-5'>
          <FormInput
            name='wallet'
            register={register}
            title='Wallet Name'
            type='string'
            placeholder='Enter the name of the wallet'
          />

          <FormInput
            name='amount'
            register={register}
            title='Initial Balance'
            type='number'
            placeholder='Enter initial balance'
          />
        </div>
        <hr />
        <button
          disabled={loading}
          className={twMerge(
            'button-primary py-1 disabled:cursor-not-allowed disabled:bg-gray-400',
          )}
        >
          Submit
        </button>
      </form>
    </section>
  );
};
