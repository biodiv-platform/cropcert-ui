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
      name: "Created On",
      selector: (row) => row["createdOn"],
      cell: (row) => timeCell(row.createdOn),
    },
    {
      name: "GRN",
      selector: (row) => row["grnNumber"],
      cell: (row) => tooltipCell(row.grnNumber),
    },
    {
      name: "Note",
      selector: (row) => row["note"],
      cell: (row) => tooltipCell(row.note),
    },
  ];

  return (
    <LotShowPanel icon="ℹ️" title="Information" isOpen={true}>
      <DataTable keyField="id" columns={basicInfoHeader} noHeader={true} data={[lot]} />
    </LotShowPanel>
  );
}
