import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { HomePage } from '../pages/home_page/homePage';
import { LoginPage } from '../pages/login_page/loginPage';
import { SingUpPage } from '../pages/sign_up_page/singUpPage';
import LoginProtector from '../components/protected_route/loginProtector';
import { TransactionPage } from '../pages/transaction_page/transactionPage';

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
    path: '/transactions',
    element: (
      <Layout>
        <TransactionPage />
      </Layout>
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
    path: '*',
    element: <Navigate to='/' />,
  },
]);
