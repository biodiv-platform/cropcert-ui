import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import { axListBatchByLotId } from "@services/lot.service";
import React, { useEffect, useState } from "react";

import LotShowPanel from "./panel";

export default function LotBatches({ lotId }) {
  const batchColumns = [
    {
      name: "#",
      selector: (row) => row["id"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => `B-${row.id}`,
    },
    {
      name: "Name",
      selector: (row) => row["batchName"],
      width: "280px",
    },
    {
      name: "Type",
      selector: (row) => row["type"],
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Last Updated",
      selector: (row) => row["date"],
      maxWidth: "150px",
      cell: (row) => timeCell(row.date),
      sortable: true,
    },
    {
      name: "Perchment Quantity",
      selector: (row) => row["perchmentQuantity"],
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Lot Name",
      selector: (row) => row["lotId"],
    },
    {
      name: "Lot Status",
      selector: (row) => row["lotId"],
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
