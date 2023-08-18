type ComplexInputType = {
  title: string;
  id: string;
  name: string;
  placeholder: string;
  options: string[];
};

export function ComplexInput({
  title,
  id,
  name,
  placeholder,
  options,
}: ComplexInputType) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='font-semibold' htmlFor={id}>
        {title}
      </label>
      <input
        className='w-full rounded-md border border-gray-400 px-3 py-2 outline-none'
        type='text'
        list='list'
        name={name}
        id={id}
        placeholder={placeholder}
        required
      />
      <datalist className='appearance-none bg-white' id='list'>
        {options.map((optionData, index) => (
          <option key={index} className='bg-white' value={optionData}></option>
        ))}
      </datalist>
    </div>
  );
}
