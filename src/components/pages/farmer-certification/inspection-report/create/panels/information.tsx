import Table from "@components/@core/table";
import LotShowPanel from "@components/pages/lot/show/panel";
import { formattedDate } from "@utils/basic.util";
import React from "react";

export default function FarmerInformation({ farmer }) {
  const basicInfoHeader = [
    {
      name: "Farmer Name",
      selector: "firstName",
    },
    {
      name: "Farmer Code",
      selector: "farmerCode",
    },
    {
      name: "No of Coffee Fields",
      selector: "numCoffeePlots",
    },
    {
      name: "Collection Center Code",
      selector: "ccCode",
    },
    {
      name: "Sub Country",
      selector: "subCountry",
    },
    {
      name: "Village",
      selector: "village",
    },
    {
      name: "Inspector",
      selector: "fieldCoOrdinator",
    },
    {
      name: "Last version",
      selector: "version",
      cell: ({ version, subVersion }) => `${version || 0}.${subVersion || 0}`,
    },
    {
      name: "Last Report Date",
      selector: "inspection.date",
      cell: ({ inspection }) => formattedDate(inspection.date),
    },
  ];

  return (
    <LotShowPanel title="Information" icon="ℹ️" isOpen={true}>
      <Table keyField="id" columns={basicInfoHeader} noHeader={true} data={[farmer]} />
    </LotShowPanel>
  );
}
