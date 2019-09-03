import { axGetBatchesByLotId } from "@services/lot.service";
import { BATCH_TYPE } from "@utils/constants";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { columnsDry, columnsWetExpand } from "./batch.columns";

export default function BatchlistExpanded(data) {
  const [rows, setRows] = useState([] as any);

  useEffect(() => {
    axGetBatchesByLotId(data.data.id).then(props => {
      setRows(props.data);
    });
  }, [data]);

  return (
    <DataTable
      className="eco--table-expanded p-3"
      keyField="batchId"
      columns={
        data.data.type === BATCH_TYPE.WET ? columnsWetExpand : columnsDry
      }
      noHeader={true}
      data={rows}
    />
  );
}
