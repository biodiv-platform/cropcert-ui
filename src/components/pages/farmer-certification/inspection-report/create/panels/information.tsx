import Table from "@components/@core/table";
import LotShowPanel from "@components/pages/lot/show/panel";
import { formattedDate } from "@utils/basic";
import React from "react";

export default function FarmerInformation({ farmer }) {
  const basicInfoHeader = [
    {
      name: "Farmer Name",
      selector: (row) => row.name,
    },
    {
      name: "Farmer Code",
      selector: (row) => row.farmerCode,
    },
    {
      name: "No of Coffee Fields",
      selector: (row) => row.numCoffeePlots,
    },
    {
      name: "Collection Center Code",
      selector: (row) => row.ccCode,
    },
    {
      name: "Inspector",
      selector: (row) => row.inspectorName,
    },
    {
      name: "Last version",
      selector: (row) => row.version,
      cell: ({ version, subVersion }) => `${version || 0}.${subVersion || 0}`,
    },
    {
      name: "Last Report Date",
      selector: (row) => row.inspection.date,
      cell: ({ inspection }) => (inspection?.date ? formattedDate(inspection?.date) : "NA"),
    },
  ];

  return (
    <LotShowPanel title="Information" icon="ℹ️" isOpen={true}>
      <Table keyField="id" columns={basicInfoHeader} noHeader={true} data={[farmer]} />
    </LotShowPanel>
  );
}
