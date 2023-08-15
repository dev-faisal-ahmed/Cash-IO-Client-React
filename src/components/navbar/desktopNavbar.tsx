import { IoWallet } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import { NavLink } from './navLink';

export function DesktopNavbar() {
  const router = useLocation();
  const navigate = useNavigate();
  return (
    <nav className='between-y py-3 sticky top-0 bg-background-300'>
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
        <button className='button bg-blue-600 text-white rounded-md animation hover:bg-blue-800'>
          Login
        </button>
      </ul>
    </nav>
  );
}
