import React, { createContext, useEffect, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the context provider component
export const UserProvider = ({ children }) => {
  // State for user data
  const [user, setUser] = useState(null);

  // global user logged state
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true" || false
  );

  // Load user state from localStorage on component mount
  useEffect(() => {
    const loggedStatus = localStorage.getItem("isLogged");
    if (loggedStatus) {
      setIsLogged(JSON.parse(loggedStatus));
    }
  }, []);

  // Update localStorage when isLogged state changes
  useEffect(() => {
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
  }, [isLogged]);

  // Update state when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedIsLogged = localStorage.getItem("isLogged") === "true";
      setIsLogged(storedIsLogged);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isLogged]);

  // Context value
  const contextValue = {
    user,
    setUser,
    isLogged,
    setIsLogged,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
