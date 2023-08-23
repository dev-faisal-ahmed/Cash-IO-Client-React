type MiniBox = {
  name: string;
  value: number;
};

export function MiniBox({ name, value }: MiniBox) {
  return (
    <p className='flex items-center justify-between'>
      <span>{name}</span>
      <span>{value} &#2547;</span>
    </p>
  );
}
