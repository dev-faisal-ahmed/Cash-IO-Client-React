import { IoWallet } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import { NavLink } from './navLink';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { NavMenu } from './navMenu';
import { useState } from 'react';
import { AdderModal } from './adderModal';

export function DesktopNavbar() {
  const router = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store: StoreType) => store.user);
  const [showAdder, setShowAdder] = useState(false);

  return (
    <nav className='container hidden bg-gray-200 py-3 sm:flex sm:items-center sm:justify-between'>
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

        {/* -------- Add Transaction -------- */}

        <button
          onClick={() => setShowAdder(true)}
          className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white'
        >
          <AiOutlinePlus size={20} />
        </button>

        {/* -------- Profile / Login Button -------- */}

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
      {/* -------- Add Transaction Modal -------- */}
      <AdderModal state={showAdder} setState={setShowAdder} />
    </nav>
  );
}
