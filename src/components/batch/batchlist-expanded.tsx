import { axGetBatchesByLotId } from "@services/lot.service";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component-tmp";

import { columnsDry } from "./batch.columns";

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
      columns={columnsDry}
      noHeader={true}
      data={rows}
    />
  );
}
