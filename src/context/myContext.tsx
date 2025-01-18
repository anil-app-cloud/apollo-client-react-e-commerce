import React, { createContext, useState, ReactNode } from 'react';

interface User {
  __typename: string,
  user_id: string;
  name: string;
  email: string;
  address: string;
 
}

interface AppContextType {
  isLogin: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUserOf: (user: User | null) => void;
}




export const AppContext = createContext<AppContextType | undefined>(undefined);


interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null)

 
  const setLogin: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
    setIsLogin(value);
  };

  const setUserOf = (value: User | null) => {
    setUser(value);
  };


  return (
    <AppContext.Provider value={{ isLogin, setLogin, user,  setUserOf}}>
      {children}
    </AppContext.Provider>
  );
};
