import { Box, Flex, Heading, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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
      selector: `FP-${farmerProduces["farmerProduceId"]}`,
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
  ];

  const FarmerProduceMap = dynamic(() => import("../map/geoJson-point-map"), {
    ssr: false,
  });

  return (
    <FarmerProduceShowPanel icon="🚜" title="Produce Information" isOpen={true}>
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
      {farmerProduces?.location && (
        <Flex
          gap={2}
          mt={2}
          p={2}
          direction={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
          minHeight={"400px"}
        >
          <Stack direction={"column"} spacing={2} width={"full"}>
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
