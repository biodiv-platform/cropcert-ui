import React from "react";
import DataTable from "react-data-table-component-tmp";

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
      selector: "td",
    },
    {
      name: "GRN",
      selector: "td",
    },
  ];

  return (
    <LotShowPanel title="ℹ️ Information" isOpen={true}>
      <DataTable
        keyField="id"
        columns={basicInfoHeader}
        noHeader={true}
        data={[{ ...lot, td: "TBA" }]}
      />
    </LotShowPanel>
  );
}
