import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/input/formInput';
import { FromType, StoreType } from '../../utils/types';
import { FormOptionInput } from '../../components/input/formOptionInput';
import { useGetWallets } from '../../hooks/useGetWallets';
import { useSelector } from 'react-redux';
import { getWalletName } from '../../utils/helper';
import { toast } from 'react-hot-toast';
import { serverAddress } from '../../utils/serverAddress';
import { serverReq } from '../../utils/serverReq';
import { Dispatch, SetStateAction, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TransferWalletType = {
  balance: number;
  fromWalletName: string;
  setModalState: Dispatch<SetStateAction<boolean>>;
};

export function TransferWallet({
  balance,
  fromWalletName,
  setModalState,
}: TransferWalletType) {
  const { email } = useSelector((store: StoreType) => store.user);
  const { wallets, fetchWallets } = useGetWallets(email as string);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FromType>();

  function handleTransfer(data: FromType) {
    const { amount, wallet } = data;
    if (balance < parseInt(amount))
      return toast.error('Not sufficient balance');

    const toastId = toast.loading('Transferring Money ...');
    setLoading(true);

    fetch(
      `${serverAddress}/transfer`,
      serverReq('POST', {
        amount: parseInt(amount),
        from: fromWalletName,
        to: wallet,
        email,
      }),
    )
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        toast.dismiss(toastId);
        setModalState(false);

        if (res.okay) {
          toast.success(res.msg, { duration: 1000 });
          fetchWallets();
        }
      })
      .catch(() => {
        toast.error('Something went wrong', { duration: 1000 });
        setLoading(false);
        toast.dismiss(toastId);
      });
  }

  return (
    <form onSubmit={handleSubmit(handleTransfer)}>
      <div className='center-y gap-5'>
        <FormOptionInput
          title='Wallet'
          name='wallet'
          register={register}
          options={getWalletName(wallets).filter(
            (wallet) => wallet !== fromWalletName,
          )}
        />
        <FormInput
          title='Amount'
          type='number'
          placeholder='Enter Amount'
          name='amount'
          register={register}
        />
      </div>
      <hr className='my-5' />
      <button
        disabled={loading}
        className={twMerge(
          'button-primary button.disabled mx-auto mt-5 block w-full',
        )}
      >
        Transfer
      </button>
    </form>
  );
}
