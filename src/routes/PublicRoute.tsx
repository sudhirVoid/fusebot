import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PageLoading } from '../components';
const PublicRoute= () => {
  const { isAuthenticated , isLoading} = useAuth();
  if (isLoading){
    return <PageLoading/>
  }

  return isAuthenticated ? (
    <Navigate to="/home" replace />
    
  ) : (
    
    <Outlet />
  );
};

export default PublicRoute;
