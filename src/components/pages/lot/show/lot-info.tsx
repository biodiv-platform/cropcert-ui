import { Badge } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import tooltipCell from "@components/@core/table/tooltip-cell";
import React from "react";

import LotShowPanel from "./panel";

export default function LotInfo({ lot }) {
  const basicInfoHeader = [
    {
      name: "Type",
      selector: (row) => row["type"],
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
    },
    {
      name: "Created At",
      selector: (row) => row["createdAt"],
      cell: (row) => timeCell(row.createdAt),
    },
    {
      name: "Lot Status",
      selector: (row) => row["lotStatus"],
      cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
    },
    {
      name: "Note",
      selector: (row) => row["note"],
      cell: (row) => tooltipCell(row.note),
    },
  ];

  return (
    <LotShowPanel icon="ℹ️" title="Information" isOpen={true}>
      <DataTable keyField="_id" columns={basicInfoHeader} noHeader={true} data={[lot]} />
    </LotShowPanel>
  );
}
