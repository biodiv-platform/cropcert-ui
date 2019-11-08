import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
import tooltipCell from "@components/@core/table/tooltip-cell";
import React from "react";

import LotShowPanel from "./panel";

export default function BasicInfo({ lot }) {
  const basicInfoHeader = [
    {
      name: "Type",
      selector: "type",
    },
    {
      name: "Quantity",
      selector: "quantity",
    },
    {
      name: "Outturn",
      selector: "outTurn",
    },
    {
      name: "Created On",
      selector: "createdOn",
      cell: row => timeCell(row.createdOn),
    },
    {
      name: "GRN",
      selector: "grnNumber",
      cell: row => tooltipCell(row.grnNumber),
    },
    {
      name: "Note",
      selector: "note",
      cell: row => tooltipCell(row.note),
    },
  ];

  return (
    <LotShowPanel icon="ℹ" title="Information" isOpen={true}>
      <DataTable
        keyField="id"
        columns={basicInfoHeader}
        noHeader={true}
        data={[lot]}
      />
    </LotShowPanel>
  );
}
