import Container from "@components/@core/container";
import ListBatch from "@components/batch/list";
import CCStore from "@stores/cc.store";
import { hierarchicalRoles } from "@utils/auth.util";
import { ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";

const ListWetPage = () => {
  return (
    <Container roles={hierarchicalRoles(ROLES.COOPERATIVE)}>
      <ListBatch />
    </Container>
  );
};

export default ListWetPage;
