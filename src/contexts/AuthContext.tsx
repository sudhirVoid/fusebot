import { getAuth, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      setisLoading(false)
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);
  

  const login = () => {
    setIsAuthenticated(true);
    // Implement your login logic here (e.g., signInWithEmailAndPassword)
  };

  const logout = () => {
    signOut(auth).then(() => {
      setIsAuthenticated(false);
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout , isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
