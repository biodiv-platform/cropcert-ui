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
  const [previousPath, setPreviousPath] = useState("");

  const isLoggedIn = useMemo(() => !!user.id, [user]);

  const authorizedRoles = useMemo(() => {
    const allRoles = user?.roles?.map((_role) => _role.authority);
    return allRoles?.length ? allRoles : [ROLES.UNAUTHORIZED];
  }, [user]);

  useEffect(() => {
    let lastPath = window.location.pathname + window.location.search;

    const updatePath = () => {
      const currentPath = window.location.pathname + window.location.search;

      if (
        currentPath !== lastPath &&
        (currentPath.includes("/traceability") || currentPath.includes("farmer/list"))
      ) {
        lastPath = currentPath;
        setPreviousPath(currentPath);
      }
    };

    const interceptHistoryMethod = (method: "pushState" | "replaceState") => {
      const original = window.history[method];
      return function (...args: Parameters<History["pushState"]>) {
        original.apply(this, args);
        updatePath();
      };
    };

    window.history.pushState = interceptHistoryMethod("pushState");
    window.history.replaceState = interceptHistoryMethod("replaceState");

    window.addEventListener("popstate", updatePath);

    updatePath();

    return () => {
      window.history.pushState = interceptHistoryMethod("pushState");
      window.history.replaceState = interceptHistoryMethod("replaceState");
      window.removeEventListener("popstate", updatePath);
    };
  }, []);

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
