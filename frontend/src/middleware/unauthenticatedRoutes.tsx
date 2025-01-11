import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';

export const UnauthenticatedRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return <Outlet />;
};
