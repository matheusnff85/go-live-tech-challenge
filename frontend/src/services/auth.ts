import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthTokenPayload {
  id: number;
  name: string;
  role: "leitor" | "editor" | "administrador";
  exp: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthTokenPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode<AuthTokenPayload>(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decodedToken);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { user, isLoading };
};
