import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { HomePage } from '../pages/home_page/homePage';
import { LoginPage } from '../pages/login_page/loginPage';
import { SingUpPage } from '../pages/sign_up_page/singUpPage';
import LoginProtector from '../components/protected_route/loginProtector';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <LoginProtector>
        <LoginPage />
      </LoginProtector>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <LoginProtector>
        <SingUpPage />
      </LoginProtector>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <h1>Profile</h1>
      </Layout>
    ),
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);
