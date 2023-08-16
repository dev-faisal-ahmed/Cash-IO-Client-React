import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebaseInit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../utils/stores/userReducer';

export function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleGoogleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const payLoad = {
          userName: user.displayName,
          userEmail: user.email,
          imageUrl: user.photoURL,
        };
        dispatch(login(payLoad));

        navigate('/');
      })
      .catch((err) => console.error(err));
  }

  return (
    <div
      onClick={handleGoogleLogin}
      className='center-xy animation cursor-pointer gap-3 rounded-md bg-gray-300 px-5 py-2 font-semibold hover:bg-gray-400 '
    >
      <FcGoogle size={25} /> Use Google
    </div>
  );
}
