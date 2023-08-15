import { ReactNode } from 'react';

type LoginInputType = {
  title: string;
  type: string;
  icon?: ReactNode;
  name: string;
};

export function LoginInput({ title, type, icon, name }: LoginInputType) {
  return (
    <div className='center-y gap-3 border-b-2 border-gray-300 pb-2 px-1'>
      <label className='cursor-pointer' htmlFor={name}>
        {icon}
      </label>
      <input
        className='outline-none bg-transparent'
        id={name}
        name={name}
        placeholder={title}
        type={type}
      />
    </div>
  );
}
