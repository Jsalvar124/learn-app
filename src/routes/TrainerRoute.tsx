// routes/TrainerRoute.tsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getIsAuthSelector, getUserRoleSelector } from '../store/selectors';

const TrainerRoute = () => {
  const isAuth = useSelector(getIsAuthSelector);
  const role = useSelector(getUserRoleSelector);
  const isWrongRole = isAuth && role !== 'TRAINER';

  useEffect(() => {
    if (isWrongRole) {
      toast.error("This page is only available to trainers.");
    }
  }, [isWrongRole]);

  if (!isAuth) return <Navigate to="/login" replace />;
  if (isWrongRole) return <Navigate to="/trainings" replace />;

  return <Outlet />;
};

export default TrainerRoute;