import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { Navigate } from 'react-router-dom';

type LoginProtectorType = {
  children: ReactNode;
};

export default function LoginProtector({ children }: LoginProtectorType) {
  const { login } = useSelector((state: StoreType) => state.user);
  if (login) return <Navigate to={'/'} />;

  return <>{children}</>;
}
