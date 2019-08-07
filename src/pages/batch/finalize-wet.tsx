import Container from "@components/@core/container";
import FinalizeWetBatch from "@components/batch/finalize-wet";
import { isBrowser, ROLES } from "@utils/constants";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const FinalizeWetBatchPage = () => {
  const [rows, setRows] = useState([] as any);

  useEffect(() => {
    if (isBrowser) {
      setRows(window.history.state.rows || []);
    }
  }, []);

  return (
    <Container roles={[ROLES.COOPERATIVE]}>
      <FinalizeWetBatch batches={rows} />
    </Container>
  );
};

export default observer(FinalizeWetBatchPage);
