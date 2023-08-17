import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebaseInit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../utils/stores/userReducer';
import { serverAddress } from '../../utils/serverAddress';
import { postReq } from '../../utils/serverReq';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../loadingSpinner';

export function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function handleGoogleLogin() {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        if (!result || !result.user || !result.user.email) {
          setLoading(false);
          return;
        }
        // after a successful login into firebase
        const user = result.user;
        const url = `${serverAddress}/google-login`;
        const userInfo = { name: user.displayName, email: user.email };
        fetch(url, postReq(userInfo))
          // checking if user exists or not, if user does not exist create a new one to the database
          .then((res) => res.json())
          .then((res) => {
            if (!res || !res.okay) {
              setLoading(false);
              toast.error(res.msg);
              return;
            }
            toast.success(res.msg);
            const payLoad = {
              name: user.displayName,
              email: user.email,
              imageUrl: user.photoURL,
            };
            dispatch(login(payLoad));
            setLoading(false);
            navigate('/');
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(JSON.stringify(err));
      });
  }

  return (
    <div className='center-xy animation cursor-pointer gap-3 rounded-md bg-gray-300 px-5 py-2 font-semibold hover:bg-gray-400 '>
      {loading ? (
        <div className='h-10 py-1'>
          <LoadingSpinner />
        </div>
      ) : (
        <div
          className='flex items-center justify-center gap-3'
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={25} /> Use Google
        </div>
      )}
    </div>
  );
}
