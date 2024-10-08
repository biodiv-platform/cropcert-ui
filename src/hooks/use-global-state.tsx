import { axGetTree } from "@services/pages.service";
import { ROLES } from "@static/constants";
import React, { createContext, useContext, useMemo, useState } from "react";

interface GlobalStateContextProps {
  pages;
  setPages;
  getPageTree;

  user;
  setUser;

  isLoggedIn;
  authorizedRoles;

  languageId;

  union;
  setUnion;
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
  const [union, setUnion] = useState(null);

  const isLoggedIn = useMemo(() => !!user.id, [user]);

  const authorizedRoles = useMemo(() => {
    const allRoles = user?.roles?.map((_role) => _role.authority);
    return allRoles?.length ? allRoles : [ROLES.UNAUTHORIZED];
  }, [user]);

  const getPageTree = async () => {
    try {
      const { data } = await axGetTree({ userGroupId: null, languageId: props.languageId });
      setPages(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        authorizedRoles,

        pages,
        setPages,
        getPageTree,

        languageId: props.languageId,

        union,
        setUnion,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default function useGlobalState() {
  return useContext(GlobalStateContext);
}
