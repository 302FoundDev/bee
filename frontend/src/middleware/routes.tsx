import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    window.location.href = '/signin';
    return null;
  }

  return <Outlet />;
}
