import { FormEvent, useState } from 'react';
import { LoginInput } from '../../components/input/loginInput';
import { FiUser } from 'react-icons/fi';
import { BsKey } from 'react-icons/bs';
import { GoogleLogin } from '../../components/google_login/googleLogin';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebaseInit';
import { useDispatch } from 'react-redux';
import { login } from '../../utils/stores/userReducer';
import { toast } from 'react-hot-toast';

export function LoginPage() {
  const router = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Logging in ...');
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log(user);
          const payLoad = {
            name: user.displayName,
            email: user.email,
            imageUrl: user.photoURL,
          };
          dispatch(login(payLoad));
          toast.dismiss(toastId);
          router('/');
        }
      })
      .catch((err) => {
        toast.dismiss(toastId);
        setLoading(false);
        toast.error(JSON.stringify(err));
      });
  }

  return (
    <section className='center-xy min-h-screen bg-gray-200 p-5'>
      <div className='w-full rounded-3xl bg-transparent px-5 py-10 sm:w-[450px] sm:bg-white sm:p-12 sm:shadow-md'>
        <div className='text-center'>
          <h3 className='text-2xl font-semibold'>User Login</h3>
          <p className='mt-5 text-sm text-gray-500'>
            Welcome Back Enter Your Detail
          </p>
        </div>

        <form onSubmit={handleLogin} className='mt-20 sm:mt-10'>
          <div className='flex flex-col gap-8'>
            <LoginInput
              name='email'
              title='Email'
              type='email'
              icon={<FiUser size={20} />}
            />
            <LoginInput
              name='password'
              title='Password'
              type='password'
              icon={<BsKey size={20} />}
            />
          </div>
          <button
            disabled={loading}
            className={`button animation mt-10 w-full rounded-md bg-blue-500 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400`}
          >
            Login
          </button>
          <div className='center-y my-3 w-full gap-3'>
            <div className='h-[1px] w-full bg-gray-300'>&nbsp;</div> or
            <div className='h-[1px] w-full bg-gray-300'>&nbsp;</div>
          </div>
          <GoogleLogin />
          <p className='mt-8 text-center text-sm'>
            Don't have any account?{' '}
            <span
              onClick={() => router('/sign-up')}
              className='cursor-pointer text-blue-500 underline'
            >
              Sing Up
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
