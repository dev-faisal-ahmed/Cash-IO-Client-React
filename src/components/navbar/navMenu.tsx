import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileIcon } from '../profile_icon/profileIcon';
import { StoreType } from '../../utils/types';
import { logout } from '../../utils/stores/userReducer';
import { useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export function NavMenu() {
  const user = useSelector((store: StoreType) => store.user);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useOutsideClick(() => setShowMenu(false));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <div className='relative'>
      {/* profile Icon */}
      {showMenu ? (
        <div onClick={() => setShowMenu(false)}>
          <ProfileIcon key={1} imageUrl={user.imageUrl} userName={user.name} />
        </div>
      ) : (
        <div onClick={() => setShowMenu(true)}>
          <ProfileIcon key={2} imageUrl={user.imageUrl} userName={user.name} />
        </div>
      )}

      {/* menu */}
      {showMenu && (
        <div
          ref={ref}
          className='absolute right-0 top-12 min-w-[180px] rounded-md bg-white p-4 shadow-md'
        >
          <p className='mb-3 font-semibold'>
            {user.name}
            <span className='block text-xs text-gray-500'>{user.email}</span>
          </p>
          <hr />
          <button
            onClick={handleLogout}
            className='animation mt-2 w-full rounded-md bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
