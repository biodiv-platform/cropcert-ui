import { ROLES } from "@static/constants";
import React, { createContext, useContext, useMemo, useState } from "react";

interface GlobalStateContextProps {
  pages;
  user;
  setUser;
  isLoggedIn;
  authorizedRoles;
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

  const authorizedRoles = useMemo(() => {
    const allRoles = user?.roles?.map((_role) => _role.authority);
    return allRoles?.length ? allRoles : [ROLES.UNAUTHORIZED];
  }, [user]);

  return (
    <GlobalStateContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        authorizedRoles,

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
