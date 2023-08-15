import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebaseInit';
import { useNavigate } from 'react-router-dom';

export function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  function handleGoogleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate('/');
      })
      .catch((err) => console.error(err));
  }

  return (
    <div
      onClick={handleGoogleLogin}
      className='center-xy gap-3 bg-gray-300 px-5 py-2 rounded-md cursor-pointer font-semibold animation hover:bg-gray-400 '
    >
      <FcGoogle size={25} /> Use Google
    </div>
  );
}
