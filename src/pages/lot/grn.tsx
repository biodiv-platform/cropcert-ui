import Container from "@components/@core/container";
import LotGRN from "@components/lot/grn";
import { ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React from "react";

const MillingListPage = () => {
  return (
    <Container roles={[ROLES.FACTORY, ROLES.UNION]}>
      <LotGRN />
    </Container>
  );
};

export default observer(MillingListPage);
