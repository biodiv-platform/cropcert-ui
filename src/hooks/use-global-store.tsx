import { ROLES } from "@static/constants";
import React, { createContext, useContext, useMemo, useState } from "react";
import { User } from "types/user";

interface GlobalStateContextProps {
  pages;
  user: User;
  setUser;
  isLoggedIn;
  role;
}

interface GlobalStateProviderProps {
  user;
  pages;
  children;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({} as GlobalStateContextProps);

export const GlobalStateProvider = (props: GlobalStateProviderProps) => {
  const [user, setUser] = useState<any>(props.user || {});

  const isLoggedIn = useMemo(() => !!user.id, [user]);
  const role = useMemo(() => user?.role || ROLES.UNAUTHORIZED, [user]);

  return (
    <GlobalStateContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        role,

        pages: props.pages,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default function useGlobalState() {
  return useContext(GlobalStateContext);
}
