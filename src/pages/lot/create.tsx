import Container from "@components/@core/container";
import CreateLot from "@components/lot/create";
import { isBrowser, ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const FinalizeWetBatchPage = () => {
  const defaultState: any = {
    batches: [],
    lotName: "",
    type: "",
    coCode: -1,
  };
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (isBrowser) {
      setState(window.history.state || defaultState);
    }
  }, []);

  return (
    <Container roles={[ROLES.COOPERATIVE]}>
      <CreateLot {...state} />
    </Container>
  );
};

export default observer(FinalizeWetBatchPage);
