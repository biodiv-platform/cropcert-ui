import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

import FarmerProduceShowPanel from "./panel";

export default function farmerProducesProduceInfo({ farmerProduces }) {
  const dateOfCollection = farmerProduces["dateOfCollection"]
    ? new Date(farmerProduces["dateOfCollection"]).toLocaleDateString()
    : "N/A";
  const lastUpdatedAt = farmerProduces["lastUpdatedAt"]
    ? new Date(farmerProduces["lastUpdatedAt"]).toLocaleDateString()
    : "N/A";

  const basicInfoHeader = [
    {
      name: "Produce ID",
      selector: farmerProduces["farmerProduceId"],
    },
    {
      name: "Farmer Name",
      selector: farmerProduces["farmerName"],
    },
    {
      name: "Contact Number",
      selector: farmerProduces["contactNo"],
    },
    {
      name: "Produce Type",
      selector: farmerProduces["produceType"],
    },
    {
      name: "Quantity",
      selector: farmerProduces["quantity"],
    },
    {
      name: "No Of Bags",
      selector: farmerProduces["noOfBags"],
    },
    {
      name: "Deduction",
      selector: farmerProduces["deduction"],
    },
    {
      name: "Deduction Reason",
      selector: farmerProduces["deductionReason"],
    },
    {
      name: "Net Collection",
      selector: farmerProduces["netCollection"],
    },
    {
      name: "Price Per Kg",
      selector: farmerProduces["pricePerKg"],
    },
    {
      name: "Amount Paid",
      selector: farmerProduces["amountPaidCalculate"],
    },
    {
      name: "Milling Charge",
      selector: farmerProduces["millingCharge"],
    },
    {
      name: "Collector Name",
      selector: farmerProduces["collectorName"],
    },
    {
      name: "Collection Date",
      selector: dateOfCollection,
    },
    {
      name: "Grn",
      selector: farmerProduces["calculateGrn"],
    },
    {
      name: "Submitter Name",
      selector: farmerProduces["submitterName"],
    },
    {
      name: "Last Updated",
      selector: lastUpdatedAt,
    },
  ];

  return (
    <FarmerProduceShowPanel icon="🧑‍🌾" title={farmerProduces.farmerName} isOpen={true}>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th textAlign="left" backgroundColor="slategray" color="white">
              Key
            </Th>
            <Th textAlign="left" backgroundColor="slategray" color="white">
              Value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {basicInfoHeader &&
            basicInfoHeader.map((item, index) => (
              <Tr key={index} backgroundColor={index % 2 === 0 ? "gray.100" : "white"}>
                <Td textAlign="left">{item.name}</Td>
                <Td textAlign="left">{item.selector}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </FarmerProduceShowPanel>
  );
}
