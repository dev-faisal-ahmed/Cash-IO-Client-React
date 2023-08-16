import { ReactNode } from 'react';

type LoginInputType = {
  title: string;
  type: string;
  icon?: ReactNode;
  name: string;
};

export function LoginInput({ title, type, icon, name }: LoginInputType) {
  return (
    <div className='center-y gap-3 border-b-2 border-gray-300 px-1 pb-2'>
      <label className='cursor-pointer' htmlFor={name}>
        {icon}
      </label>
      <input
        className='w-full bg-transparent outline-none'
        id={name}
        name={name}
        placeholder={title}
        type={type}
        required
      />
    </div>
  );
}
