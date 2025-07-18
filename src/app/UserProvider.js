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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
