import React, { createContext, useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";


interface IUserContextContext {
    userId?: string,
    changeUserId?: Function
}

const  UserContext = createContext<IUserContextContext>({});

interface IUserProviderProps {
    children: React.ReactNode
}

const  UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState(uuidv4().slice(0, 8));

  const changeUserId = (id: string) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, changeUserId }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserContext, UserProvider, useUser };
