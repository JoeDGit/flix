import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContexProvider = ({ children }) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};

export const useStateContex = () => useContext(StateContext);
