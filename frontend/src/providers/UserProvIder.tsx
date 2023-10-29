import React, { createContext, useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";


interface IUserContextContext {
    userId?: string,
    changeUserId?: Function
    userTime?: number
    changeUserTime?: Function
}

const  UserContext = createContext<IUserContextContext>({});

interface IUserProviderProps {
    children: React.ReactNode
}

const  UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState(uuidv4().slice(0, 8));
  const [userTime, setUserTime] = useState(0);

  const changeUserId = (id: string) => {
    setUserId(id);
  };
  const changeUserTime = (timeSecond: number) => {
    setUserTime(timeSecond);
  };
  return (
    <UserContext.Provider value={{ userId, changeUserId, userTime, changeUserTime}}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserContext, UserProvider, useUser };
