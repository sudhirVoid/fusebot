import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PageLoading } from '../components';
const PrivateRoute= () => {
  const { isAuthenticated , isLoading} = useAuth();
  if (isLoading){
    return <PageLoading/>
  }

  return isAuthenticated ? (
    <Outlet />
    
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
