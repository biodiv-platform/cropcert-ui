import Container from "@components/@core/container";
import ListWet from "@components/batch/list-wet";
import CCStore from "@stores/cc.store";
import { hierarchicalRoles } from "@utils/auth.util";
import { ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";

const ListWetPage = () => {
  const ccStore = useContext(CCStore);

  useEffect(() => {
    ccStore.listCCAccessible();
  }, []);

  return (
    <Container roles={hierarchicalRoles(ROLES.COLLECTION_CENTER)}>
      {ccStore.CCAccessible.length > 0 && <ListWet />}
    </Container>
  );
};

export default observer(ListWetPage);
