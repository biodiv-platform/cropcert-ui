import DataTable from "@components/@core/table";
import timeCell from "@components/@core/table/time-cell";
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
