import { UseFormRegister } from 'react-hook-form';
import { TransactionModalFormType } from '../../utils/types';

type FormComponentType = {
  name: string;
  title: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  register: UseFormRegister<TransactionModalFormType>;
};

export function FormInput({
  title,
  type,
  name,
  placeholder,
  register,
  defaultValue,
}: FormComponentType) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='font-semibold' htmlFor={name}>
        {title}
      </label>
      <input
        className='w-full rounded-md border border-gray-400 px-3 py-2 outline-none'
        type={type}
        defaultValue={defaultValue}
        id={name}
        placeholder={placeholder}
        {...register(name as 'type' | 'amount' | 'description' | 'category')}
        required
      />
    </div>
  );
}
