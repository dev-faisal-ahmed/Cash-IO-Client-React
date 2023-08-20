type InputType = {
  title: string;
  id: string;
  name: string;
  placeholder?: string;
  type: string;
};

export function Input({ title, id, name, type, placeholder }: InputType) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='font-semibold' htmlFor={id}>
        {title}
      </label>
      <input
        className='w-full rounded-md border border-gray-400 px-3 py-2 outline-none'
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
