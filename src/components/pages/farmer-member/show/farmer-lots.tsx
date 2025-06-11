import { Badge } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import LotCell from "@components/@core/table/lot-cell";
import tooltipCell from "@components/@core/table/tooltip-cell";
import React from "react";

import FarmerShowPanel from "./panel";

export default function FarmerLots({ rows }) {
  const lotColumns = [
    {
      name: "#",
      selector: (row) => row["lotId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => <LotCell {...row} />,
    },
    {
      name: "Name",
      selector: (row) => row["lotName"],
      width: "280px",
    },
    {
      name: "Type",
      selector: (row) => row["type"]?.toUpperCase(),
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
      name: "Lot Status",
      selector: (row) => row["lotStatus"],
      cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
      maxWidth: "180px",
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row["createdAt"],
      cell: (row) => new Date(row.createdAt).toLocaleString(),
      maxWidth: "180px",
      sortable: true,
      sortFunction: (rowA, rowB) =>
        new Date(rowA.createdAt).getTime() - new Date(rowB.createdAt).getTime(),
    },
    {
      name: "Note",
      selector: (row) => row["note"],
      cell: (row) => (row.note ? tooltipCell(row.note) : "N/A"),
    },
  ];

  return (
    <FarmerShowPanel icon="📦" title="Lot(s)" count={rows.length}>
      <DataTable keyField="LotId" columns={lotColumns} noHeader={true} data={rows} />
    </FarmerShowPanel>
  );
}
