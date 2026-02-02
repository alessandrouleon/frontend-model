import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { signOut } from "./Auth";

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: string | null;
  roles: string[];
  hasRole: (role: string) => boolean;
  isAdmin: () => boolean;
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
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const storaged = localStorage.getItem("@auth:api");
  
  useEffect(() => {
    if (storaged) {
      const [, payload] = storaged.split(".");
      const decoded = JSON.parse(atob(payload)) as JwtPayload;
      
      const timeNow = new Date().getTime();

      if (decoded && decoded.exp * 1000 > timeNow) {
        api.defaults.headers.Authorization = `Bearer ${storaged}`;
        setUser(decoded.username);
        setRoles(decoded.roles ?? []);
      } else {
        signOut();
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const hasRole = (role: string) => roles.includes(role);
  const isAdmin = () => roles.includes("ADMIN");
  

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        roles,
        hasRole,
        isAdmin,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
