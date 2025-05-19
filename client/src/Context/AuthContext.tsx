import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
export interface User {
  userId: number;
  email: string;
  fullName: string;
  isAdmin: boolean;
  profilePicture: object;
  profilePictureType: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const verifyAuth = async (token?: string) => {
    try {
      const authToken = token || localStorage.getItem("AccessToken");
      console.log("Verifying auth token:", authToken);

      if (!authToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      localStorage.setItem("AccessToken", authToken);
      setUser(response.data.user);
    } catch (error) {
      console.error("Auth verification failed:", error);
      localStorage.removeItem("AccessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    localStorage.setItem("AccessToken", token);
    await verifyAuth(token);
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
    } catch (error) {
      console.warn("Server logout failed:", error);
    } finally {
      localStorage.removeItem("AccessToken");
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();

    const interceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("AccessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
