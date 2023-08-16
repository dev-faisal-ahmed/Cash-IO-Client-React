type ProfileIconType = {
  imageUrl?: string | null;
  userName?: string | null;
  size?: number;
  fontSize?: number;
};

export function ProfileIcon({
  imageUrl,
  size = 40,
  userName,
  fontSize = 20,
}: ProfileIconType) {
  return (
    <div className='cursor-pointer'>
      <div
        style={{ height: size, width: size }}
        className='flex items-center justify-center overflow-hidden rounded-full border-2 bg-blue-500'
      >
        {imageUrl ? (
          <img src={imageUrl} />
        ) : (
          <h3 className='text-white' style={{ fontSize: fontSize }}>
            {userName?.[0]}
          </h3>
        )}
      </div>
    </div>
  );
}
