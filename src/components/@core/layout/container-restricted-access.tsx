import { Flex } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { ROLES } from "@static/constants";
import { hasAccess, hierarchicalRoles } from "@utils/auth";
import useTranslation from "next-translate/useTranslation";
import React from "react";

function ContainerRestrictedAccess({ to = ROLES.COLLECTION_CENTER, children }) {
  const { user, union } = useGlobalState();
  const toHierarchical = hierarchicalRoles(to);
  const { t } = useTranslation();
  const hasPermission = hasAccess(toHierarchical, user) && union.hasContainer;

  return hasPermission ? (
    children
  ) : (
    <Flex m={4} justifyContent={"center"} mt={8}>
      <p>{t("traceability:container.restricted_access")}.</p>
    </Flex>
  );
}

export default ContainerRestrictedAccess;
