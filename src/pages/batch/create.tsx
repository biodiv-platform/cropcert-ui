import Container from "@components/@core/container";
import BatchCreate from "@components/batch/create";
import CCStore from "@stores/cc.store";
import { ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";

const BatchCreatePage = () => {
  const ccStore = useContext(CCStore);

  useEffect(() => {
    ccStore.listCCAccessible();
  }, []);

  return (
    <Container roles={[ROLES.COOPERATIVE]}>
      <h1 className="eco--title">Create Batch</h1>
      {ccStore.CCAccessible.length > 0 && (
        <BatchCreate CCAccessible={ccStore.CCAccessible} />
      )}
    </Container>
  );
};

export default observer(BatchCreatePage);
