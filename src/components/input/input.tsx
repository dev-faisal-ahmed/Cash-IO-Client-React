type InputProps = {
  name: string;
  title: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
};

export function Input({
  name,
  title,
  type,
  placeholder,
  defaultValue,
  required,
}: InputProps) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='font-semibold' htmlFor={name}>
        {title}
      </label>
      <input
        className='w-full rounded-md border border-gray-400 px-3 py-2 outline-none'
        autoComplete='off'
        type={type}
        defaultValue={defaultValue}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
