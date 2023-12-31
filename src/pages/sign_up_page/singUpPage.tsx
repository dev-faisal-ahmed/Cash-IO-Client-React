import { useState } from 'react';
import { LoginInput } from '../../components/input/loginInput';
import { FiUser } from 'react-icons/fi';
import { MdOutlineMail } from 'react-icons/md';
import { BsKey } from 'react-icons/bs';
import { GoogleLogin } from '../../components/google_login/googleLogin';
import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { auth } from '../../utils/firebaseInit';
import { toast } from 'react-hot-toast';
import { serverAddress } from '../../utils/serverAddress';
import { serverReq } from '../../utils/serverReq';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

export function SingUpPage() {
  const router = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const toastId = toast.loading('Creating Your Account');
    setLoading(true);
    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const name = target.name.value.trim();
    const email = target.email.value.trim();
    const password = target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // user created successfully
        if (auth?.currentUser) {
          updateProfile(auth.currentUser, { displayName: name })
            // after updating user name
            .then(() => {
              const url = `${serverAddress}/sign-up`;
              fetch(url, serverReq('POST', { name, email }))
                .then((res) => res.json())
                .then((res) => {
                  setLoading(false);
                  if (res.okay) {
                    toast.success(res.msg);
                    signOut(auth);
                    toast.dismiss(toastId);
                    router('/login');
                  } else toast.error(res.msg);
                });
            })
            .catch((error) => {
              toast.dismiss(toastId);
              setLoading(false);
              toast.error(JSON.stringify(error.message));
            });
        }
      })
      .catch((err) => {
        toast.dismiss(toastId);
        setLoading(false);
        toast.error(JSON.stringify(err.message));
      });
  }

  return (
    <section className='center-xy min-h-screen bg-gray-200 p-5'>
      <div className='w-full rounded-3xl bg-transparent px-5 py-10 sm:w-[450px] sm:bg-white sm:p-12 sm:shadow-md'>
        <div className='text-center'>
          <h3 className='text-2xl font-semibold'>Create Account</h3>
          <p className='mt-5 text-sm text-gray-500'>
            Welcome Back Enter Your Detail
          </p>
        </div>

        <form onSubmit={handleSignUp} className='mt-20 sm:mt-10'>
          <div className='flex flex-col gap-8'>
            <LoginInput
              name='name'
              title='Name'
              type='text'
              icon={<FiUser size={20} />}
            />
            <LoginInput
              name='email'
              title='Email'
              type='email'
              icon={<MdOutlineMail size={20} />}
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
            className={`button animation mt-10 w-full rounded-md bg-blue-500 text-white hover:bg-blue-700 ${
              loading && 'cursor-not-allowed'
            }`}
          >
            Sign Up
          </button>
          <div className='center-y my-3 w-full gap-3'>
            <div className='h-[1px] w-full bg-gray-300'>&nbsp;</div> or
            <div className='h-[1px] w-full bg-gray-300'>&nbsp;</div>
          </div>
          <GoogleLogin />
          <p className='mt-8 text-center text-sm'>
            Already have an account?{' '}
            <span
              onClick={() => router('/login')}
              className='cursor-pointer text-blue-500 underline'
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
