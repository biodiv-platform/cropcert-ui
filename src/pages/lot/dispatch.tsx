import Container from "@components/@core/container";
import DispatchLot from "@components/lot/dispatch";
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
    <Container roles={[ROLES.COOPERATIVE, ROLES.UNION]}>
      <DispatchLot {...state} />
    </Container>
  );
};

export default observer(FinalizeWetBatchPage);
