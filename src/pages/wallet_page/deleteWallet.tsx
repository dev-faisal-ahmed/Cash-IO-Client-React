import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { serverAddress } from '../../utils/serverAddress';
import { serverReq } from '../../utils/serverReq';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { useGetWallets } from '../../hooks/useGetWallets';

type DeleteWalletType = {
  name: string;
  balance: number;
  setState: Dispatch<SetStateAction<boolean>>;
};

export function DeleteWallet({ name, balance, setState }: DeleteWalletType) {
  const { email } = useSelector((store: StoreType) => store.user);
  const { fetchWallets } = useGetWallets(email as string);
  const [loading, setLoading] = useState<boolean>(false);

  function handleDeleteWallet() {
    if (balance !== 0) {
      toast.error('Transfer your balance first!');
      setState(false);
      return;
    }

    const toastId = toast.loading('Deleting wallet...');
    setLoading(true);

    fetch(
      `${serverAddress}/delete-wallet`,
      serverReq('DELETE', { email, name }),
    )
      .then((res) => res.json())
      .then((res) => {
        toast.dismiss(toastId);
        setLoading(false);
        setState(false);
        if (res.okay) {
          toast.success(res.msg, { duration: 1000 });
          fetchWallets();
        }
      })
      .catch(() => {
        toast.error('Something went wrong', { duration: 1000 });
        toast.dismiss(toastId);
        setLoading(false);
        setState(false);
      });
  }

  return (
    <div className='center-y mt-3 justify-end gap-5'>
      <button
        onClick={() => setState(false)}
        className={twMerge(
          'button-primary border-red-500 bg-red-500 py-1 hover:text-red-500',
        )}
      >
        Cancel
      </button>
      <button
        disabled={loading}
        onClick={handleDeleteWallet}
        className={twMerge('button-primary py-1')}
      >
        Confirm
      </button>
    </div>
  );
}
