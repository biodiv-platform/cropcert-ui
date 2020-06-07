import { Accordion } from "@chakra-ui/core";
import Table from "@components/@core/table";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

const basicInfoDummy = {
  farmerName: "John Doe",
  farmerCode: "#1234",
  noOfCoffeeFields: 10,
  ccName: "TBA",
  district: "TBA",
  village: "TBA",
  coordinator: "TBA",
};

export default function FarmerInformation() {
  const basicInfoHeader = [
    {
      name: "Farmer Name",
      selector: "farmerName",
    },
    {
      name: "Farmer Code",
      selector: "farmerCode",
    },
    {
      name: "No of Coffee Fields",
      selector: "noOfCoffeeFields",
    },
    {
      name: "CollectionCenter",
      selector: "ccName",
    },
    {
      name: "District",
      selector: "district",
    },
    {
      name: "Village",
      selector: "village",
    },
    {
      name: "Coordinator",
      selector: "coordinator",
    },
  ];

  return (
    <LotShowPanel title="Information" icon="ℹ️" isOpen={true}>
      <Table keyField="id" columns={basicInfoHeader} noHeader={true} data={[basicInfoDummy]} />
    </LotShowPanel>
  );
}
