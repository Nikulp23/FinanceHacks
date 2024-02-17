import React, { createContext, useState, useContext } from 'react';

const SelectedItemContext = createContext();

export const useSelectedItem = () => useContext(SelectedItemContext);

export const SelectedItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState('welcome');

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedItemContext.Provider>
  );
};