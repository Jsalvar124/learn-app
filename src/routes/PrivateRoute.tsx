// routes/PrivateRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsAuthSelector } from '../store/selectors';

const PrivateRoute = () => {
  const isAuth = useSelector(getIsAuthSelector);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;