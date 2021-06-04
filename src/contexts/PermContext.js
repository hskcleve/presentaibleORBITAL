import React from "react";

//This has the context for permissions

const PermContext = React.createContext();

export const PermProvider = ({ children }) => {
  return (
    <PermContext.Provider value={undefined}>{children}</PermContext.Provider>
  );
};
