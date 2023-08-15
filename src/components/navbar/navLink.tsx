import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type NavLinkType = {
  title: string;
  url: string;
  currentPath: string;
};

export function NavLink({ title, url, currentPath }: NavLinkType) {
  return (
    <Link
      to={url}
      className={twMerge(
        `py-2 rounded-md hover:bg-background-800 animation hover:text-white ${
          currentPath === url
            ? 'bg-blue-100 text-blue-500 font-semibold px-5'
            : 'text-gray-500'
        }`
      )}
    >
      <span>{title}</span>
    </Link>
  );
}
