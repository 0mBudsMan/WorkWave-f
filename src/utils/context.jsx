// MyContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context object
const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [data, setData] = useState('block');
  const changeData = newData => {
    setData(newData);
  }
  return (
    <MyContext.Provider value={{ data, changeData }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to consume the context
export const useMyContext = () => {
  return useContext(MyContext);
};
