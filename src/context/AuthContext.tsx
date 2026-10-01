import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  creci: string;
  avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email?: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

const AUTH_KEY = 'marina_azevedo_auth_session';

const DEFAULT_USER: UserProfile = {
  name: 'Marina Azevedo',
  email: 'marina@azevedoimoveis.com.br',
  role: 'Corretora de Alto Padrão',
  creci: 'BA-24.891',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true' ? DEFAULT_USER : null;
    } catch {
      return null;
    }
  });

  const login = async (email?: string, _password?: string): Promise<boolean> => {
    // Simulação com pequeno delay para animação de loading realista
    await new Promise((resolve) => setTimeout(resolve, 500));
    const activeUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
    };
    setUser(activeUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch {}
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
