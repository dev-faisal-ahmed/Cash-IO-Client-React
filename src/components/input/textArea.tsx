type FormTextAreaType = {
  title: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  required?: boolean;
};

export function TextArea({
  title,
  name,
  placeholder,
  defaultValue,
  required,
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
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
}
