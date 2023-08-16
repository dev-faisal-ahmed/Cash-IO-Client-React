import { IoWallet } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import { NavLink } from './navLink';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { NavMenu } from './navMenu';

export function DesktopNavbar() {
  const router = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store: StoreType) => store.user);

  console.log(user);

  return (
    <nav className='between-y sticky top-0 bg-gray-200 py-3'>
      {/* -------- logo -------- */}
      <h3
        onClick={() => navigate('/')}
        className='title center-y cursor-pointer gap-3 text-3xl text-blue-600'
      >
        <IoWallet />
        Cash-IO
      </h3>
      {/* -------- Nav Links -------- */}

      <ul className='center-y gap-8'>
        {navLinks.map((navLink, index) => (
          <NavLink
            key={index}
            title={navLink.title}
            url={navLink.path}
            currentPath={router.pathname}
          />
        ))}
        {user.login ? (
          <NavMenu />
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='button animation rounded-md bg-blue-600 text-white hover:bg-blue-800'
          >
            Login
          </button>
        )}
      </ul>
    </nav>
  );
}
