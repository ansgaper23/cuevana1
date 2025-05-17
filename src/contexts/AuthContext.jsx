import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('movieAdminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); 
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        if (email === 'jorge968122@gmail.com' && password === '123456') {
          const userData = { email, name: 'Jorge Admin' };
          localStorage.setItem('movieAdminUser', JSON.stringify(userData));
          setUser(userData);
          setIsLoading(false);
          resolve(userData);
        } else {
          setIsLoading(false);
          reject(new Error('Credenciales incorrectas'));
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('movieAdminUser');
    setUser(null);
    navigate('/admin/login');
  };
  
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading, isAdminRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);