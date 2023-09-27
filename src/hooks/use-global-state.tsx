import { axGetOdkProjectListBysUserIdForAppUser, axIsOdkWebUser } from "@services/odk.service";
import { axGetTree } from "@services/pages.service";
import { ROLES } from "@static/constants";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface GlobalStateContextProps {
  pages;
  setPages;
  getPageTree;

  user;
  setUser;

  isLoggedIn;
  authorizedRoles;

  userAppProjectList;
  isOdkWebUser;
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
  const [isOdkWebUser, setIsOdkWebUser] = useState<any>();
  const [userAppProjectList, setUserAppProjectList] = useState();

  const isLoggedIn = useMemo(() => !!user.id, [user]);

  const authorizedRoles = useMemo(() => {
    const allRoles = user?.roles?.map((_role) => _role.authority);
    return allRoles?.length ? allRoles : [ROLES.UNAUTHORIZED];
  }, [user]);

  useEffect(() => {
    axGetOdkProjectListBysUserIdForAppUser(user.id).then(setUserAppProjectList);
    axIsOdkWebUser(user.id).then(({ data }) => setIsOdkWebUser(data));
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
        userAppProjectList,
        isOdkWebUser,

        pages,
        setPages,
        getPageTree,

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
