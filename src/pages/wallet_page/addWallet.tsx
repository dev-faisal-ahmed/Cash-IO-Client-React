import { useState, Dispatch, SetStateAction, FormEvent } from 'react';
import { StoreType } from '../../utils/types';
import { twMerge } from 'tailwind-merge';
import { serverAddress } from '../../utils/serverAddress';
import { serverReq } from '../../utils/serverReq';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useGetWallets } from '../../hooks/useGetWallets';
import { Input } from '../../components/input/input';

type AddWalletType = {
  setState: Dispatch<SetStateAction<boolean>>;
};

export const AddWallet = ({ setState }: AddWalletType) => {
  const { email } = useSelector((store: StoreType) => store.user);
  const { fetchWallets } = useGetWallets(email as string);
  const [loading, setLoading] = useState<boolean>(false);

  async function onAddWallet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Adding Wallet ...');
    const form = event.target as HTMLFormElement & {
      amount: { value: string };
      wallet: { value: string };
    };

    const amount = form.amount.value;
    const wallet = form.wallet.value.trim();

    fetch(
      `${serverAddress}/add-wallet`,
      serverReq('POST', { revenue: parseInt(amount), name: wallet, email }),
    )
      .then((res) => res.json())
      .then((res) => {
        toast.dismiss(toastId);
        setLoading(false);
        if (res.okay) {
          fetchWallets();
          setState(false);
        }
      })
      .catch(() => {
        toast.error('Something went wrong', { duration: 1000 });
        toast.dismiss(toastId);
        setLoading(false);
      });
  }

  return (
    <section>
      <form onSubmit={onAddWallet} className='flex-down gap-5'>
        <div className='center-y gap-5'>
          <Input
            name='wallet'
            title='Wallet Name'
            type='string'
            placeholder='Enter the name of the wallet'
          />

          <Input
            name='amount'
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
