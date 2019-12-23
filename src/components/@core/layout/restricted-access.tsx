import { ROLES, TOKEN } from "@static/constants";
import { hasAccess, hierarchicalRoles } from "@utils/auth.util";
import useNookies from "next-nookies-persist";
import React from "react";

function RestrictedAccess({ to = ROLES.COLLECTION_CENTER, children }) {
  const { nookies } = useNookies();
  const toHierarchical = hierarchicalRoles(to);

  return <>{hasAccess(toHierarchical, nookies[TOKEN.USER]) && children}</>;
}

export default RestrictedAccess;
