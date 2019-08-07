import Container from "@components/@core/container";
import LotList from "@components/lot/list";
import { ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React from "react";

const FinalizeWetBatchPage = () => {
  return (
    <Container roles={[ROLES.COOPERATIVE]}>
      <LotList />
    </Container>
  );
};

export default observer(FinalizeWetBatchPage);
