import DataTable from "@components/@core/table";
import React from "react";

import LotShowPanel from "./panel";

export default function FarmerLots({ rows }) {
  const lotColumns = [
    {
      name: "#",
      selector: (row) => row["lotId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => `B-${row.lotId}`,
    },
    {
      name: "Name",
      selector: (row) => row["lotName"],
      width: "280px",
    },
    {
      name: "Initial Quantity",
      selector: (row) => row["quantity"],
      maxWidth: "100px",
      sortable: true,
    },
    {
      name: "Lot Status",
      selector: (row) => row["lotStatus"],
      maxWidth: "100px",
      sortable: true,
    },
  ];

  return (
    <LotShowPanel icon="🧺" title="Lot(s)" count={rows.length}>
      <DataTable keyField="LotId" columns={lotColumns} noHeader={true} data={rows} />
    </LotShowPanel>
  );
}
