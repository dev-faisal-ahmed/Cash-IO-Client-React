type InputOptionType = {
  title: string;
  id: string;
  name: string;
  placeholder: string;
  options: string[];
};

export function InputOption({ title, id, name, options }: InputOptionType) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='font-semibold' htmlFor={id}>
        {title}
      </label>
      <select
        required
        className='w-full appearance-none rounded-md border border-gray-400 px-3 py-2 outline-none'
        name={name}
        id={id}
      >
        {options.map((optionData, index) => (
          <option key={index} value={optionData}>
            {optionData}
          </option>
        ))}
      </select>
    </div>
  );
}
