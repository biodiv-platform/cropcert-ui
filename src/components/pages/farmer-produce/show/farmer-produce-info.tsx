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
      selector: farmerProduces["contactNo"],
    },
    {
      name: "Produce Type",
      selector: farmerProduces["produceType"].toUpperCase(),
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
      name: "Collection Date",
      selector: dateOfCollection,
    },
    {
      name: "Collector Name",
      selector: farmerProduces["collectorName"],
    },
    {
      name: "Collector Substr",
      selector: farmerProduces["collectorSubstr"],
    },
    {
      name: "Calculate GRN",
      selector: farmerProduces["calculateGrn"],
    },
    {
      name: "ODK Instance ID",
      selector: farmerProduces["instanceID"].split(":")[1],
    },

    {
      name: "Farmer Member ODK Instance ID",
      selector: farmerProduces["farmerEID"].split(":")[1],
    },
    {
      name: "Created At",
      selector: new Date(farmerProduces["createdAt"]).toLocaleString(),
    },
    {
      name: "Form Version",
      selector: farmerProduces["formVersion"],
    },
  ];

  const FarmerProduceMap = dynamic(() => import("../map/geoJson-point-map"), {
    ssr: false,
  });

  return (
    <FarmerProduceShowPanel icon="🚜" title="Produce Information" isOpen={true}>
      {/* variant="simple" */}
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
