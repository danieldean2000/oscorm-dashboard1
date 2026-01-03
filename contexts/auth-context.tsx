"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { post } from "@/app/utils/apiMethods";


export type UserRole = "admin" | "blog_user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { API_ENDPOINTS } from "@/lib/api-config";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);


  const login = async (email: string, password: string) => {
    const result = await post(
      // process.env.NEXT_PUBLIC_API_URL || '',
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password }
    );

    if (result.success && result.data) {
      const userData = {
        id: String(result.data.id),
        email: result.data.email,
        name: result.data.name,
        role: result.data.role,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }

    if (result.message) throw new Error(result.message);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

