import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/myContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLogin } = useContext(AppContext);

  return isLogin ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
