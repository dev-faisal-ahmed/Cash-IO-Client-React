import { UseFormRegister } from 'react-hook-form';
import { TransactionModalFormType } from '../../utils/types';

type FromInputOptionType = {
  title: string;
  name: string;
  options: string[];
  register: UseFormRegister<TransactionModalFormType>;
  defaultValue?: string;
};

export function FormOptionInput({
  title,
  name,
  options,
  register,
  defaultValue,
}: FromInputOptionType) {
  return (
    <div className='flex w-full flex-col gap-1 '>
      <label className='font-semibold' htmlFor={name}>
        {title}
      </label>
      <div className='w-full rounded-md border-gray-400 bg-gray-200 px-2'>
        <select
          required
          className='w-full bg-transparent px-3 py-2 outline-none'
          id={name}
          defaultValue={defaultValue}
          {...register(name as 'type')}
        >
          {options.map((optionData, index) => (
            <option key={index} value={optionData}>
              {optionData}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
