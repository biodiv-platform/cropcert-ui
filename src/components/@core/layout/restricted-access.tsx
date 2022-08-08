import useGlobalState from "@hooks/use-global-store";
import { ROLES } from "@static/constants";
import { hasAccess, hierarchicalRoles } from "@utils/auth.util";
import React from "react";

function RestrictedAccess({ to = ROLES.COLLECTION_CENTER, children }) {
  const { user } = useGlobalState();
  const toHierarchical = hierarchicalRoles(to);

  return <>{hasAccess(toHierarchical, user) && children}</>;
}

export default RestrictedAccess;
