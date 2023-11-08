import { Badge } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import React from "react";

import LotShowPanel from "./panel";

export default function FarmerBatches({ rows }) {
  const batchColumns = [
    {
      name: "#",
      selector: (row) => row["batchId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => `B-${row.batchId}`,
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
      right: true,
    },
    {
      name: "Last Updated",
      selector: (row) => row["lastUpdatedOn"],
      maxWidth: "180px",
      cell: (row) => timeCell(row.lastUpdatedOn),
      sortable: true,
    },
    {
      name: "Lot ID",
      selector: (row) => row["lotId"],
      cell: (row) => `L-${row.lotId}`,
      maxWidth: "100px",
    },
    {
      name: "Lot Status",
      selector: (row) => row["lotStatus"],
      cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
    },
  ];

  return (
    <LotShowPanel icon="🧺" title="Batch(s)" count={rows.length}>
      <DataTable keyField="batchId" columns={batchColumns} noHeader={true} data={rows} />
    </LotShowPanel>
  );
}
