import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          const stored = localStorage.getItem("user");
          setUser({
            id: decoded.id,
            role: decoded.role,
            ...(stored ? JSON.parse(stored) : {}),
          });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
    setReady(true);
  }, []);

  const loginWithToken = (token, profile = {}) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    const u = { id: decoded.id, role: decoded.role, ...profile };
    localStorage.setItem("user", JSON.stringify(profile));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
