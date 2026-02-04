import { jwtDecode } from "jwt-decode";
import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { UserToken } from "../services/localStorage";
import { signOut } from "./Auth";
import { ROLES, type Roles } from "./hooks/roles";

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: string | null;
  roles: string[];
  hasRole: (role: string) => boolean;
  isAdmin: () => boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

interface JwtPayload {
  username: string;
  roles: string[];
  exp: number;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.exp * 1000 > new Date().getTime()) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(decoded.username);
        setRoles(decoded.roles ?? []);

        UserToken.setLocalStorageName(decoded.username);
        return true;
      } else {
        signOut();
        localStorage.clear();
        return false;
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      signOut();
      localStorage.clear();
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("@auth:api");

    if (!token) {
      setLoading(false);
      return;
    }

    loadUserFromToken(token);
    setLoading(false);
  }, []);

  const handleSignIn = (token: string) => {
    localStorage.setItem("@auth:api", token);
    loadUserFromToken(token);
  };

  const hasRole = (role: Roles) => roles.includes(role);
  const isAdmin = () => hasRole(ROLES.ADMIN);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        roles,
        hasRole,
        isAdmin,
        signIn: handleSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
