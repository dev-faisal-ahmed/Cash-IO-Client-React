import { Dispatch, SetStateAction, useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { serverAddress } from '../../utils/serverAddress';
import { serverReq } from '../../utils/serverReq';
import { toast } from 'react-hot-toast';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { useGetWallets } from '../../hooks/useGetWallets';
import { getWalletName } from '../../utils/helper';
import { Input } from '../input/input';
import { Select } from '../input/select';
import { categoriesData } from '../../data/categories';
import { ComplexSelect } from '../input/complexSelect';
import { TextArea } from '../input/textArea';

type AddTransactionType = {
  setState: Dispatch<SetStateAction<boolean>>;
};
export function AddTransaction({ setState }: AddTransactionType) {
  const { email } = useSelector((state: StoreType) => state.user);
  const { fetchWallets, wallets } = useGetWallets(email as string);
  const { fetchTransactions } = useGetTransaction(email as string);
  // const { categories } = useGetCategory();
  const [transactionType, setTransactionType] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  function onTransactionTypeSelection(option: string) {
    setTransactionType(option);
  }
  function onWalletSelection(option: string) {
    setSelectedWallet(option);
  }
  function onCategorySelection(option: string) {
    setSelectedCategory(option);
  }

  //  transaction handler
  async function handleAddTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as typeof event.target & {
      amount: { value: string }; // this has to be a number
      date: { value: string }; // this has to be a date
      description: { value: string };
    };

    setLoading(true);

    const amount = form.amount.value;
    const date = form.date.value;
    const description = form.description.value;
    const type = transactionType;
    const wallet = selectedWallet;
    const category = selectedCategory;

    const toastId = toast.loading('Adding Transaction ...');

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

    const data = await fetch(url, serverReq('POST', transactionInfo))
      .then((res) => res.json())
      .catch((err) => toast.error(JSON.stringify(err)));

    if (data?.okay) {
      toast.success(data?.msg);
      fetchWallets();
      fetchTransactions();
    } else toast.error(data?.msg);

    setLoading(false);
    toast.dismiss(toastId);
    setState(false);
  }

  return (
    <form onSubmit={handleAddTransaction} className='mt-5 flex flex-col gap-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
        <Input
          title='Amount'
          name='amount'
          type='number'
          placeholder='Enter Amount'
          required
        />

        <Input title='Date' name='date' type='date' required />
      </div>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5'>
        <Select
          title='Transaction Type'
          options={['expense', 'revenue']}
          placeholder='Select Type'
          selectedOption={transactionType}
          onSelection={onTransactionTypeSelection}
        />

        <Select
          title='Wallet'
          options={getWalletName(wallets)}
          placeholder='Select Wallet'
          selectedOption={selectedWallet}
          onSelection={onWalletSelection}
        />
      </div>
      <ComplexSelect
        selectedOption={selectedCategory}
        onSelection={onCategorySelection}
        options={categoriesData.expense}
        placeholder={'Select Category'}
        title='Category'
      />
      <TextArea
        title='Description'
        name='description'
        placeholder='Write a short description'
        required
      />
      <hr />
      <button disabled={loading} className='button-primary'>
        + Add
      </button>
    </form>
  );
}
