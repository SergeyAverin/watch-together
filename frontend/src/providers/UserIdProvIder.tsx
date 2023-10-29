import React, { createContext, useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";


interface IUserIdContextContext {
    userId?: string,
    changeUserId?: Function
}

const  UserIdContext = createContext<IUserIdContextContext>({});

interface IUserIdProviderProps {
    children: React.ReactNode
}

const  UserIdProvider: React.FC<IUserIdProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState(uuidv4().slice(0, 8));

  const changeUserId = (id: string) => {
    setUserId(id);
  };

  return (
    <UserIdContext.Provider value={{ userId, changeUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

const useUserId = () => useContext(UserIdContext);

export { UserIdContext, UserIdProvider, useUserId };
