import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { HomePage } from '../pages/home_page/homePage';
import { LoginPage } from '../pages/login_page/loginPage';
import { SingUpPage } from '../pages/sign_up_page/singUpPage';

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
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SingUpPage />,
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
