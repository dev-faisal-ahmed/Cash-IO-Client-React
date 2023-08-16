import { LoginInput } from '../../components/input/loginInput';
import { FiUser } from 'react-icons/fi';
import { MdOutlineMail } from 'react-icons/md';
import { BsKey } from 'react-icons/bs';
import { GoogleLogin } from '../../components/google_login/googleLogin';
import { useNavigate } from 'react-router-dom';

export function SingUpPage() {
  const router = useNavigate();

  return (
    <section className='min-h-screen bg-gray-200 center-xy p-5'>
      <div className='sm:bg-white bg-transparent sm:shadow-md sm:w-[450px] w-full px-5 py-10 sm:p-12 rounded-3xl'>
        <div className='text-center'>
          <h3 className='font-semibold text-2xl'>Create Account</h3>
          <p className='text-sm text-gray-500 mt-5'>
            Welcome Back Enter Your Detail
          </p>
        </div>

        <form className='sm:mt-10 mt-20'>
          <div className='flex flex-col gap-8'>
            <LoginInput
              name='userName'
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
          <button className='mt-10 button bg-blue-500 text-white hover:bg-blue-700 animation w-full rounded-md'>
            Sign Up
          </button>
          <div className='center-y w-full gap-3 my-3'>
            <div className='h-[1px] bg-gray-300 w-full'>&nbsp;</div> or
            <div className='h-[1px] bg-gray-300 w-full'>&nbsp;</div>
          </div>
          <GoogleLogin />
          <p className='text-sm text-center mt-8'>
            Already have an account?{' '}
            <span
              onClick={() => router('/login')}
              className='text-blue-500 underline cursor-pointer'
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
