import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import React from "react";

import LotShowPanel from "./panel";

export default function FarmerProduce({ rows }) {
  const farmerProduceColumns = [
    {
      name: "#",
      selector: (row) => row["farmerProduceId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => `FP-${row.farmerProduceId}`,
    },
    {
      name: "Farmer Name",
      selector: (row) => row["farmerName"],
      maxWidth: "280px",
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
      maxWidth: "100px",
      sortable: true,
      right: true,
    },
    {
      name: "Type",
      selector: (row) => row["produceType"].toUpperCase(),
      maxWidth: "70px",
      sortable: true,
    },
    {
      name: "Collection Date",
      selector: (row) => timeCell(row.dateOfCollection),
      maxWidth: "150px",
      sortable: true,
    },
    {
      name: "GRN Number",
      selector: (row) => row["calculateGrn"],
      maxWidth: "150px",
      sortable: true,
    },
    {
      name: "Farmer ID",
      selector: (row) => row["farmerId"],
      maxWidth: "120px",
      sortable: true,
      cell: (row) => `${row.farmerId}`,
    },
    {
      name: "Batch ID",
      selector: (row) => row["batchId"],
      maxWidth: "100px",
      cell: (row) => (row?.batchId ? `B-${row.batchId}` : "N/A"),
    },
  ];

  return (
    <LotShowPanel icon="🚜" title="Farmer Produce" count={rows.length}>
      <DataTable keyField="batchId" columns={farmerProduceColumns} noHeader={true} data={rows} />
    </LotShowPanel>
  );
}
