type TextAreaType = {
  title: string;
  id: string;
  name: string;
  placeholder: string;
};

export function TextArea({ title, id, name, placeholder }: TextAreaType) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='font-semibold' htmlFor={id}>
        {title}
      </label>
      <textarea
        rows={3}
        className='w-full rounded-md border border-gray-400 px-3 py-2 outline-none'
        name={name}
        id={id}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
