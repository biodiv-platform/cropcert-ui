import { axGetTree } from "@services/pages.service";
import { ROLES } from "@static/constants";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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

  previousPath;
  setPreviousPath;
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
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState("");

  const isLoggedIn = useMemo(() => !!user.id, [user]);

  const authorizedRoles = useMemo(() => {
    const allRoles = user?.roles?.map((_role) => _role.authority);
    return allRoles?.length ? allRoles : [ROLES.UNAUTHORIZED];
  }, [user]);

  useEffect(() => {
    // Store the previous path when the route changes
    const handleRouteChange = () => {
      setPreviousPath(router.asPath);
    };

    // Listen to route changes
    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup the event listener
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

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

        previousPath,
        setPreviousPath,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default function useGlobalState() {
  return useContext(GlobalStateContext);
}
