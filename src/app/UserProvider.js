"use client";
import { createContext, useContext, useState, useEffect } from "react";
const UserContext = createContext(null);
export const UserProvider = ({ user: initialUser, children }) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const onLogin = () => location.reload();
    const onLogout = () => setUser(null);

    window.addEventListener("auth:login", onLogin);
    window.addEventListener("auth:logout", onLogout);

    return () => {
      window.removeEventListener("auth:login", onLogin);
      window.removeEventListener("auth:logout", onLogout);
    };
  }, []);

  return (
    <UserContext.Provider value={user}> 
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
