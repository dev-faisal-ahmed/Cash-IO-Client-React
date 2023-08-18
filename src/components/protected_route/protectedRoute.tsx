import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../utils/types';
import { Navigate } from 'react-router-dom';

type ProtectedRouteType = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteType) {
  const { login } = useSelector((state: StoreType) => state.user);

  if (!login) return <Navigate to={'/login'} />;
  return <>{children}</>;
}
