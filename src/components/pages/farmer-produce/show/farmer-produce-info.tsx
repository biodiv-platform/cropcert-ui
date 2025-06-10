import { Box, Flex, Heading, Stack, Table } from "@chakra-ui/react";
import FarmerCell from "@components/@core/table/farmer-cell";
import dynamic from "next/dynamic";
import React from "react";

import FarmerProduceShowPanel from "./panel";

export default function farmerProducesProduceInfo({ farmerProduces }) {
  const dateOfCollection = farmerProduces["dateOfCollection"]
    ? new Date(farmerProduces["dateOfCollection"]).toLocaleDateString()
    : "N/A";

  const basicInfoHeader = [
    {
      name: "Farmer Produce ID",
      selector: `${farmerProduces["farmerProduceId"]}`,
    },
    {
      name: "Farmer ID",
      selector: farmerProduces["farmerId"],
    },
    {
      name: "Farmer Name",
      selector: farmerProduces["farmerName"],
    },
    {
      name: "Contact Number",
      selector: farmerProduces["contactNo"] || "N/A",
    },
    {
      name: "Produce Type",
      selector: farmerProduces["produceType"]?.toUpperCase() || "N/A",
    },
    {
      name: "Quantity",
      selector: farmerProduces["quantity"] || "N/A",
    },
    {
      name: "No Of Bags",
      selector: farmerProduces["noOfBags"] || "N/A",
    },
    {
      name: "Deduction",
      selector: farmerProduces["deduction"] || "N/A",
    },
    {
      name: "Deduction Reason",
      selector: farmerProduces["deductionReason"] || "N/A",
    },
    {
      name: "Net Collection",
      selector: farmerProduces["netCollection"] || "N/A",
    },
    {
      name: "Price Per Kg",
      selector: farmerProduces["pricePerKg"] || "N/A",
    },
    {
      name: "Amount Paid",
      selector: farmerProduces["amountPaidCalculate"] || "N/A",
    },
    {
      name: "Milling Charge",
      selector: farmerProduces["millingCharge"] || "N/A",
    },
    {
      name: "Collection Date",
      selector: dateOfCollection || "N/A",
    },
    {
      name: "Collector Name",
      selector: farmerProduces["collectorName"] || "N/A",
    },
    {
      name: "Collector Substr",
      selector: farmerProduces["collectorSubstr"] || "N/A",
    },
    {
      name: "Calculate GRN",
      selector: farmerProduces["calculateGrn"] || "N/A",
    },
    {
      name: "ODK Instance ID",
      selector: farmerProduces["instanceID"].split(":")[1] || "N/A",
    },

    {
      name: "Farmer Member ODK Instance ID",
      selector: farmerProduces["farmerEID"].split(":")[1] || "N/A",
    },
    {
      name: "Created At",
      selector: new Date(farmerProduces["createdAt"]).toLocaleString() || "N/A",
    },
    {
      name: "Form Version",
      selector: farmerProduces["formVersion"] || "N/A",
    },
  ];

  const FarmerProduceMap = dynamic(() => import("../map/geoJson-point-map"), {
    ssr: false,
  });

  return (
    <FarmerProduceShowPanel icon="🚜" title="Produce Information" isOpen={true}>
      <Table.Root size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign="left" backgroundColor="slategray" color="white">
              Key
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="left" backgroundColor="slategray" color="white">
              Value
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {basicInfoHeader &&
            basicInfoHeader.map((item, index) => (
              <Table.Row key={index} backgroundColor={index % 2 === 0 ? "gray.100" : "white"}>
                <Table.Cell textAlign="left">{item.name}</Table.Cell>
                {item.name === "Farmer ID" ? (
                  <Table.Cell textAlign="left">
                    <FarmerCell
                      {...{
                        farmerId: farmerProduces["farmerId"],
                        _id: farmerProduces["farmerEID"],
                      }}
                    />
                  </Table.Cell>
                ) : (
                  <Table.Cell textAlign="left">{item.selector}</Table.Cell>
                )}
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      {farmerProduces?.location && (
        <Flex
          gap={2}
          mt={2}
          p={2}
          direction={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
          minHeight={"400px"}
        >
          <Stack direction={"column"} gap={2} width={"full"}>
            <Box display={"flex"} justifyContent={"space-between"} alignContent={"center"}>
              <Heading size="md">Collection Location :</Heading>
            </Box>

            <Box
              rounded="md"
              border={4}
              borderColor={"gray.400"}
              width={{ base: "full" }}
              height={{ base: "400", md: "full", lg: "full", xl: "full" }}
              overflow={"hidden"}
              boxShadow="md"
            >
              <FarmerProduceMap geojson={farmerProduces?.location} />
            </Box>
          </Stack>
        </Flex>
      )}
    </FarmerProduceShowPanel>
  );
}
