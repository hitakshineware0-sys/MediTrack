import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  updateProfile: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const userEmail = localStorage.getItem('userEmail');
    
    if (loggedIn === 'true' && userEmail) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = storedUsers.find((u: any) => u.email === userEmail);
      if (currentUser) {
        setUser({ email: currentUser.email, name: currentUser.name });
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = storedUsers.find((u: any) => u.email === email);
    if (currentUser) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userEmail', email);
      setUser({ email: currentUser.email, name: currentUser.name });
    }
  };

  const signup = (email: string, name: string) => {
    // This just sets the current user after signup logic is handled in the component
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userEmail', email);
    setUser({ email, name });
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const updateProfile = (newName: string) => {
    if (!user) return;
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = storedUsers.map((u: any) => 
      u.email === user.email ? { ...u, name: newName } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ ...user, name: newName });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
