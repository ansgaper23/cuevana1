
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  const { toast } = useToast();

  if (!isAuthenticated) {
    toast({
      title: "Acceso Denegado",
      description: "Debes iniciar sesión para acceder a esta página.",
      variant: "destructive",
    });
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
  