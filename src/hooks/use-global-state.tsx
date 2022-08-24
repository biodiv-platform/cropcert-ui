import { ROLES } from "@static/constants";
import React, { createContext, useContext, useMemo, useState } from "react";

interface GlobalStateContextProps {
  pages;
  setPages;

  user;
  setUser;

  isLoggedIn;
  authorizedRoles;

  languageId;
}

interface GlobalStateProviderProps {
  user;
  languageId;
  pages;
  children;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({} as GlobalStateContextProps);

export const GlobalStateProvider = (props: GlobalStateProviderProps) => {
  const [user, setUser] = useState<any>(props.user || {});
  const [pages, setPages] = useState(props.pages);

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

        pages,
        setPages,

        languageId: props.languageId,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default function useGlobalState() {
  return useContext(GlobalStateContext);
}
