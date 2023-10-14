import { useState } from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { useOutsideClick } from '../../hooks/useOutsideClick';

type SelectProps = {
  options: string[];
  title: string;
  placeholder: string;
  selectedOption: string;
  onSelection: (option: string) => void;
};

export function Select({
  options,
  selectedOption,
  onSelection,
  placeholder,
  title,
}: SelectProps) {
  const [expand, setExpand] = useState(false);
  const overlayRef = useOutsideClick(() => setExpand(false));

  return (
    <div className='flex w-full flex-col gap-1'>
      <h1 className='font-semibold'>{title}</h1>
      <div
        ref={overlayRef}
        onClick={() => setExpand(!expand)}
        className='relative flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-400 px-3 py-2 '
      >
        {selectedOption ? (
          <p className='capitalize'>{selectedOption}</p>
        ) : (
          <p className='text-gray-400'>{placeholder}</p>
        )}
        <BiCaretDown />
        {expand ? (
          <ul className='absolute left-0 top-12 z-30 w-full rounded-md border bg-white py-2 shadow-md'>
            {options.map((option, index) => (
              <li
                onClick={() => onSelection(option)}
                className='px-2 py-1 capitalize text-gray-500 hover:bg-gray-200'
                key={index}
              >
                {option}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}