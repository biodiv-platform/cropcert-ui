import { columnsDry, columnsWet } from "@components/batch/batch.columns";
import { axGetBatchesByLotId } from "@services/lot.service";
import { BATCH_TYPE } from "@utils/constants";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component-tmp";

import LotShowPanel from "./panel";

export default function LotBatches({ lotId, batchType }) {
  const [rows, setRows] = useState([] as any);

  useEffect(() => {
    axGetBatchesByLotId(lotId).then(props => {
      setRows(props.data);
    });
  }, [lotId]);

  return (
    <LotShowPanel title={`📦 Batches (${rows.length})`}>
      <DataTable
        keyField="batchId"
        columns={batchType === BATCH_TYPE.WET ? columnsWet : columnsDry}
        noHeader={true}
        data={rows}
      />
    </LotShowPanel>
  );
}
