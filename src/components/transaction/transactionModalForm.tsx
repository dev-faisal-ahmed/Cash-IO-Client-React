import { useState, Dispatch, SetStateAction, FormEvent } from 'react';
import { StoreType, TransactionType } from '../../utils/types';
import { toast } from 'react-hot-toast';
import { serverAddress } from '../../utils/serverAddress';
import { serverReq } from '../../utils/serverReq';
import { useSelector } from 'react-redux';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { useGetWallets } from '../../hooks/useGetWallets';
import { getWalletName } from '../../utils/helper';
import { Input } from '../input/input';
import { Select } from '../input/select';
import { ComplexSelect } from '../input/complexSelect';
import { categoriesData } from '../../data/categories';
import { TextArea } from '../input/textArea';

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
  const { email } = useSelector((state: StoreType) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchTransactions } = useGetTransaction(email as string);
  const { fetchWallets, wallets } = useGetWallets(email as string);
  const [selectedType, setSelectedType] = useState(type as string);
  const [selectedWallet, setSelectedWallet] = useState(wallet);
  const [selectedCategory, setSelectedCategory] = useState(category);

  async function handleUpdateTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      amount: { value: string };
      description: { value: string };
    };

    const formAmount = form.amount.value;
    const formDescription = form.description.value;

    if (
      +formAmount === amount &&
      selectedCategory === category &&
      selectedType === type &&
      formDescription.trim() === description &&
      selectedWallet === wallet
    ) {
      toast.error('Nothing to update', { duration: 500 });
      return;
    }
    const toastId = toast.loading('Updating transaction ...');
    setLoading(true);
    const formData = {
      _id,
      email,
      amount: parseInt(formAmount),
      prevAmount: amount,
      type: selectedType,
      prevType: type,
      wallet: selectedWallet,
      prevWallet: wallet,
      category: selectedCategory,
      description: formDescription.trim(),
    };
    try {
      const response = await fetch(
        `${serverAddress}/update-transaction`,
        serverReq('PATCH', formData),
      ).then((res) => res.json());

      if (response.okay) {
        toast.success(response.msg);
        fetchTransactions();
        fetchWallets();
      } else toast.error(response.msg);
    } catch (err) {
      toast.error('Something went wrong');
    }

    setLoading(false);
    toast.dismiss(toastId);
    setModalState(false);
  }

  return (
    <form
      onSubmit={handleUpdateTransaction}
      className='mt-8 flex flex-col gap-3'
    >
      <div className='flex items-center gap-5'>
        <Input
          name='amount'
          placeholder='Enter Amount'
          title={'Amount'}
          type='number'
          defaultValue={amount}
        />
        <Select
          title='Transaction Type'
          onSelection={(option: string) => setSelectedType(option)}
          placeholder='Select Any'
          selectedOption={selectedType}
          options={['revenue', 'expense']}
        />
      </div>
      <div className='flex items-center gap-5'>
        <Select
          title='Wallet'
          selectedOption={selectedWallet}
          onSelection={(option: string) => setSelectedWallet(option)}
          options={getWalletName(wallets)}
          placeholder='Select Any Wallet'
        />
        <ComplexSelect
          title='Category'
          onSelection={(option: string) => setSelectedCategory(option)}
          options={categoriesData.expense}
          placeholder='Select Category'
          selectedOption={selectedCategory}
        />
      </div>
      <TextArea
        name='description'
        title='Description'
        placeholder='Enter a short Description'
        defaultValue={description as string}
      />
      <button disabled={loading} className='button-primary'>
        Update
      </button>
    </form>
  );
}
