import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileIcon } from '../profile_icon/profileIcon';
import { StoreType } from '../../utils/types';
import { logout } from '../../utils/stores/userReducer';
import { useNavigate } from 'react-router-dom';

export function NavMenu() {
  const user = useSelector((store: StoreType) => store.user);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <div className='relative'>
      {/* profile Icon */}
      <div onClick={() => setShowMenu(!showMenu)}>
        <ProfileIcon imageUrl={user.imageUrl} userName={user.name} />
      </div>
      {/* menu */}
      {showMenu && (
        <div className='absolute right-0 top-12 min-w-[180px] rounded-md bg-white p-4'>
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
