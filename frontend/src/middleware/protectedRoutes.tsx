import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/signin');
    return null;
  }

  return <Outlet />;
};
