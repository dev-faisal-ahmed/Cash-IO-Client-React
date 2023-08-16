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
        `hover:bg-background-800 animation rounded-md py-2 hover:text-white ${
          currentPath === url
            ? 'bg-blue-100 px-5 font-semibold text-blue-500'
            : 'text-gray-500'
        }`,
      )}
    >
      <span>{title}</span>
    </Link>
  );
}
