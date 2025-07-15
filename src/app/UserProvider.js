"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ user: initialUser, children }) => {
  const [user, setUser] = useState(initialUser);

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me/current");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  useEffect(() => {
    const onLogin = () => location.reload();
    const onLogout = () => setUser(null);

    window.addEventListener("auth:login", onLogin);
    window.addEventListener("auth:logout", onLogout);

    const bc = new BroadcastChannel("user-updates");
    bc.onmessage = (event) => {
      if (event.data?.type === "update-user" && event.data?.user) {
        setUser(event.data.user);
      }
    };

    return () => {
      window.removeEventListener("auth:login", onLogin);
      window.removeEventListener("auth:logout", onLogout);
      bc.close();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
