type LoadingSpinnerType = {
  size?: string;
  innerBg?: string;
  outerBg?: string;
};

export function LoadingSpinner({
  size = 'h-10 w-10',
  innerBg = 'border-gray-400',
  outerBg = 'border-blue-500',
}: LoadingSpinnerType) {
  return (
    <div className='mx-auto w-fit'>
      <div className={`relative ${size}`}>
        <div
          className={`absolute ${size} rounded-full border-4 border-dashed ${innerBg}`}
        ></div>
        <div
          className={`absolute ${size} animate-spin rounded-full border-4 border-dashed ${outerBg} border-t-transparent`}
        ></div>
      </div>
    </div>
  );
}
