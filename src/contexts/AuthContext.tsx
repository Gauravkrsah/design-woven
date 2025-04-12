
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if there's an existing auth session on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = (username: string, password: string): boolean => {
    // For demo purposes, hardcode the credentials
    // In production, this would check against a backend
    if (username === 'admin' && password === 'password123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };
  
  const value = {
    isAuthenticated,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
