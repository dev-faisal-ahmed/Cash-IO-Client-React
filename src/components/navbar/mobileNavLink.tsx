import { Link } from 'react-router-dom';
import { GoHomeFill } from 'react-icons/go';
import { FaUserSecret } from 'react-icons/fa6';
import { BiSolidWallet } from 'react-icons/bi';

type MobileNavLinkType = {
  path: string;
  title: 'Home' | 'Wallet' | 'Transactions';
  currentLink: string;
};

export const MobileNavLink = ({
  path,
  title,
  currentLink,
}: MobileNavLinkType) => {
  return (
    <Link
      className={`animation flex flex-col items-center gap-1 rounded-md px-3 py-2 hover:bg-gray-200 hover:text-black  ${
        currentLink === path ? ' text-blue-500' : 'text-gray-600'
      }`}
      to={path}
    >
      {title === 'Home' && <GoHomeFill size={25} />}
      {title === 'Wallet' && <FaUserSecret size={25} />}
      {title === 'Transactions' && <BiSolidWallet size={25} />}
      <span className='text-xs'>{title}</span>
    </Link>
  );
};
