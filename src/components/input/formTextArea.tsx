import { UseFormRegister } from 'react-hook-form';
import { TransactionModalFormType } from '../../utils/types';

type FormTextAreaType = {
  title: string;
  name: string;
  placeholder: string;
  defaultValue: string;
  register: UseFormRegister<TransactionModalFormType>;
};

export function FormTextArea({
  title,
  name,
  placeholder,
  defaultValue,
  register,
}: FormTextAreaType) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='font-semibold' htmlFor={name}>
        {title}
      </label>
      <textarea
        rows={3}
        className='w-full rounded-md border border-gray-400 px-3 py-2 outline-none'
        id={name}
        placeholder={placeholder}
        {...register(name as 'amount' | 'description' | 'category' | 'type')}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}
