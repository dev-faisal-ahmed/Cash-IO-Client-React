import { UseFormRegister } from 'react-hook-form';
import { TransactionModalFormType } from '../../utils/types';

type FormComplexInputType = {
  title: string;
  name: string;
  placeholder: string;
  options: string[];
  defaultValue?: string;
  register: UseFormRegister<TransactionModalFormType>;
};

export function FormComplexInput({
  name,
  title,
  placeholder,
  options,
  defaultValue,
  register,
}: FormComplexInputType) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='font-semibold' htmlFor={name}>
        {title}
      </label>
      <div className='w-full rounded-md border-gray-400 bg-gray-200'>
        <input
          className='w-full bg-transparent px-3 py-2 outline-none'
          type='text'
          list='list'
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name as 'category')}
          required
        />
        <datalist className='appearance-none bg-white' id='list'>
          {options.map((optionData, index) => (
            <option
              key={index}
              className='bg-white'
              value={optionData}
            ></option>
          ))}
        </datalist>
      </div>
    </div>
  );
}
