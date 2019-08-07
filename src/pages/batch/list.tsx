import Container from "@components/@core/container";
import ListBatch from "@components/batch/list";
import CCStore from "@stores/cc.store";
import { ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";

const ListWetPage = () => {
  const ccStore = useContext(CCStore);

  useEffect(() => {
    ccStore.listCCAccessible();
  }, []);

  return (
    <Container roles={[ROLES.COOPERATIVE]}>
      {ccStore.CCAccessible.length > 0 && (
        <ListBatch CCAccessible={ccStore.CCAccessible} />
      )}
    </Container>
  );
};

export default observer(ListWetPage);
