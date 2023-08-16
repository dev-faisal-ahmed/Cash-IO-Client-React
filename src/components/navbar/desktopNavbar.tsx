import { IoWallet } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import { NavLink } from './navLink';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';

export function DesktopNavbar() {
  const router = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store: StoreType) => store.user);

  return (
    <nav className='between-y py-3 sticky top-0 bg-gray-200'>
      {/* -------- logo -------- */}
      <h3
        onClick={() => navigate('/')}
        className='title text-3xl center-y gap-3 text-blue-600 cursor-pointer'
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
        <button
          onClick={() => navigate('/login')}
          className='button bg-blue-600 text-white rounded-md animation hover:bg-blue-800'
        >
          {user.login ? 'Logout' : 'Login'}
        </button>
      </ul>
    </nav>
  );
}
