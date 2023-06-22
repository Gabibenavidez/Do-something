import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const ErrorContext = createContext();

// Create the context provider component
export const ErrorProvider = ({ children }) => {
    
  // State for errors data
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState('');


  // Context value
  const contextValue = {
    error,
    setError,
    loading,
    setLoading,
    errorMessage,
    setErrorMessage
  };

  return (
    <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>
  );
};
