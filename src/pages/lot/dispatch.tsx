import Container from "@components/@core/container";
import DispatchLot from "@components/lot/dispatch";
import { hierarchicalRoles } from "@utils/auth.util";
import { isBrowser, ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const FinalizeWetBatchPage = () => {
  const defaultState: any = {
    rows: [],
    to: "",
    timeKey: "",
  };
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (isBrowser) {
      setState(window.history.state || defaultState);
    }
  }, []);

  return (
    <Container roles={hierarchicalRoles(ROLES.COOPERATIVE)}>
      <DispatchLot {...state} />
    </Container>
  );
};

export default observer(FinalizeWetBatchPage);
