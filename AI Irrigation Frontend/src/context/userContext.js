// userContext.js
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `${tokenType} ${token}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_type");
    setUser(null);
    window.location.href = "/auth/login"; // redirect to login
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
