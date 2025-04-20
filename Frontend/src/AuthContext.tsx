import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  loggedIn: boolean;
  username: string;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const checkSession = async () => {
    try {
      const response = await axios.get("http://localhost:5000/session", {
        withCredentials: true,
      });
      if (response.data.loggedIn) {
        setLoggedIn(true);
        setUsername(response.data.user.username);
      } else {
        setLoggedIn(false);
        setUsername("");
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setLoggedIn(false);
      setUsername("");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, username, checkSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};