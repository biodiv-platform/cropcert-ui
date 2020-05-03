import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import { axListBatchByLotId } from "@services/lot.service";
import React, { useEffect, useState } from "react";

import LotShowPanel from "./panel";

export default function LotBatches({ lotId, batchType }) {
  const batchColumns = [
    {
      name: "#",
      selector: "id",
      maxWidth: "100px",
      sortable: true,
      cell: (row) => `B-${row.id}`,
    },
    {
      name: "Name",
      selector: "batchName",
      width: "280px",
    },
    {
      name: "Type",
      selector: "type",
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: "quantity",
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Last Updated",
      selector: "date",
      maxWidth: "150px",
      cell: (row) => timeCell(row.date),
      sortable: true,
    },
    {
      name: "Perchment Quantity",
      selector: "perchmentQuantity",
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Lot Name",
      selector: "lotId",
    },
    {
      name: "Lot Status",
      selector: "lotId",
    },
  ];

  const [rows, setRows] = useState([] as any);

  useEffect(() => {
    axListBatchByLotId(lotId).then((props) => {
      setRows(props.data);
    });
  }, [lotId]);

  return (
    <LotShowPanel icon="🧺" title="Batch(s)" count={rows.length}>
      <DataTable keyField="batchId" columns={batchColumns} noHeader={true} data={rows} />
    </LotShowPanel>
  );
}
