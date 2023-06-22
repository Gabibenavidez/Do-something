import React, { createContext, useState } from 'react';

// Create the context
export const ActivityContext = createContext();

// Create the context provider component
export const ActivityProvider = ({ children }) => {
    
  // State for activities data
  const [activitiesToDo, setActivitiesToDo] = useState([]);
  const [randomActivity, setRandomActivity] = useState({});


  // Context value
  const contextValue = {
    activitiesToDo, 
    setActivitiesToDo, 
    randomActivity, 
    setRandomActivity
  };

  return (
    <ActivityContext.Provider value={contextValue}>{children}</ActivityContext.Provider>
  );
};
