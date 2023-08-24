import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/input/formInput';
import { FromType, StoreType } from '../../utils/types';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-hot-toast';
import { serverAddress } from '../../utils/serverAddress';
import { useSelector } from 'react-redux';
import { serverReq } from '../../utils/serverReq';
import { useGetWallets } from '../../hooks/useGetWallets';

type EditWalletType = {
  name: string;
  setModalState: Dispatch<SetStateAction<boolean>>;
};

export function EditWallet({ name, setModalState }: EditWalletType) {
  const { register, handleSubmit, reset } = useForm<FromType>();
  const { email } = useSelector((store: StoreType) => store.user);
  const { fetchWallets } = useGetWallets(email as string);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleEditWallet(data: FromType) {
    const { wallet } = data;
    if (wallet === name)
      return toast.error('Change the wallet name first', { duration: 1000 });
    const toastId = toast.loading('Editing Wallet ...');
    setLoading(true);

    try {
      const response = await fetch(
        `${serverAddress}/update-wallet`,
        serverReq('PATCH', { name: wallet, email, pervName: name }),
      ).then((res) => res.json());

      if (response.okay) {
        toast.success(response.msg);
        fetchWallets();
      } else toast.error(response.msg);

      setLoading(false);
      toast.dismiss(toastId);
      setModalState(false);
      reset();
    } catch (err) {
      toast.error('Something went wrong');
      setLoading(false);
      toast.dismiss(toastId);
      setModalState(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleEditWallet)}>
      <FormInput
        title='Wallet Name'
        name='wallet'
        register={register}
        type='string'
        defaultValue={name}
      />

      <button
        disabled={loading}
        className={twMerge(
          `button-primary button-disabled ml-auto mt-5 block py-1`,
        )}
      >
        Confirm
      </button>
    </form>
  );
}
