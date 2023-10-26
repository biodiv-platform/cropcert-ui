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
      width: "210px",
    },
    {
      name: "Collection Date",
      selector: (row) => row["collectionDate"],
      maxWidth: "150px",
      cell: (row) => timeCell(row.collectionDate),
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
      maxWidth: "100px",
      sortable: true,
    },

    {
      name: "Collection Center",
      selector: (row) => row["collectionCenter"],
      maxWidth: "250px",
      sortable: true,
    },
    {
      name: "Farmer ID",
      selector: (row) => row["farmerId"],
      maxWidth: "100px",
    },
    {
      name: "Batch ID",
      selector: (row) => row["batchId"],
      maxWidth: "100px",
    },
  ];

  return (
    <LotShowPanel icon="🚜" title="Farmer Produce" count={rows.length}>
      <DataTable keyField="batchId" columns={farmerProduceColumns} noHeader={true} data={rows} />
    </LotShowPanel>
  );
}
