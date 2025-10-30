import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🧠 Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('bookit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 Save user to localStorage when logged in
  const signIn = (userData: User) => {
    setUser(userData);
    localStorage.setItem('bookit_user', JSON.stringify(userData));
  };

  // 🚪 Clear user on sign out
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('bookit_user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
