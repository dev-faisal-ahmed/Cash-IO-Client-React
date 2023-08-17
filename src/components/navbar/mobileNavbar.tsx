import { useLocation } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import { MobileNavLink } from './mobileNavLink';

export function MobileNavbar() {
  const path = useLocation();
  return (
    <nav className='grid grid-cols-3 bg-white px-5 pb-1 pt-2 sm:hidden'>
      {navLinks.map((navLink, index) => (
        <MobileNavLink
          key={index}
          title={navLink.title}
          currentLink={path.pathname}
          path={navLink.path}
        />
      ))}
    </nav>
  );
}
