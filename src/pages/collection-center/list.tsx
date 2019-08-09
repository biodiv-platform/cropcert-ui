import Container from "@components/@core/container";
import CollectionCenterListPage from "@components/collection-center/list";
import { ROLES } from "@utils/constants";
import React from "react";

export default function CollectionCenterList() {
  return (
    <Container roles={[ROLES.UNAUTHORIZED]}>
      <CollectionCenterListPage />
    </Container>
  );
}
