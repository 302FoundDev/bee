import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    window.location.replace('/signin')
    return null;
  }

  return <Outlet />;

}
