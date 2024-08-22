import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => {
    setToken(token);
    // Save token to local storage or secure storage if needed
  };

  const logout = () => {
    setToken(null);
    // Clear token from local storage or secure storage if needed
  };

  return <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout, token }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
