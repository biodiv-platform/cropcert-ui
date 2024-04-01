import { Badge } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import LotCell from "@components/@core/table/lot-cell";
import React from "react";

import LotShowPanel from "./panel";

export default function FarmerLots({ rows }) {
  const lotColumns = [
    {
      name: "#",
      selector: (row) => row["lotId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => <LotCell {...row} type="l" />,
    },
    {
      name: "Name",
      selector: (row) => row["lotName"],
      width: "280px",
    },
    {
      name: "Initial Quantity",
      selector: (row) => row["quantity"],
      maxWidth: "150px",
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
  ];

  return (
    <LotShowPanel icon="📦" title="Lot(s)" count={rows.length}>
      <DataTable keyField="LotId" columns={lotColumns} noHeader={true} data={rows} />
    </LotShowPanel>
  );
}
