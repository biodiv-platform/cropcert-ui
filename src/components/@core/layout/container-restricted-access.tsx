import { Flex } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { ROLES } from "@static/constants";
import { hasAccess, hierarchicalRoles } from "@utils/auth";
import React from "react";

function ContainerRestrictedAccess({ to = ROLES.COLLECTION_CENTER, children }) {
  const { user } = useGlobalState();
  const toHierarchical = hierarchicalRoles(to);
  const hasPermission = hasAccess(toHierarchical, user) && user.unionCode === 5;

  return hasPermission ? (
    children
  ) : (
    <Flex m={4} justifyContent={"center"} mt={8}>
      <p>There was an error processing your request. Please contact admin for details.</p>
    </Flex>
  );
}

export default ContainerRestrictedAccess;
