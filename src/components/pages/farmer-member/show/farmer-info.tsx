import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image as ChakraImage,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ENDPOINT } from "@static/constants";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import FarmerShowPanel from "./panel";

const FarmerMap = dynamic(() => import("./farmer-map"), { ssr: false });

export default function FarmerInfo({ farmer, hasEditDeleteAccess }) {
  const basicInfoHeader = [
    {
      name: "ID",
      selector: farmer["farmerId"],
    },
    {
      name: "Farmer Name",
      selector: farmer["farmerName"],
    },
    {
      name: "Gender",
      selector: farmer["gender"],
    },
    {
      name: "Date of Birth",
      selector: farmer["dateOfBirth"],
    },
    {
      name: "Contact Number",
      selector: farmer["contactNumber"] || "N/A",
    },
    {
      name: "National Identity Number",
      selector: farmer["nationalIdentityNumber"] || "N/A",
    },
    {
      name: "Level of Education",
      selector: farmer["levelOfEducation"],
    },
    {
      name: "No of Dependents",
      selector: farmer["noOfDependents"],
    },
    {
      name: "Village",
      selector: farmer["village"],
    },
    {
      name: "Collection Center",
      selector: farmer["cc"],
    },
    {
      name: "Land Acreage",
      selector: farmer["landAcreage"],
    },
    {
      name: "Coffee Acreage",
      selector: farmer["coffeeAcreage"],
    },
    {
      name: "No. of Coffee Trees",
      selector: farmer["noOfCoffeeTrees"],
    },
    {
      name: "Other Farm Enterprises",
      selector: farmer["otherFarmEnterprises"].join(", ") || "N/A",
    },
    {
      name: "Agroforestry",
      selector: farmer["agroforestry"] ? "Yes" : "No", //TODO: ask question related to this!!
    },
    {
      name: "ODK Instance ID",
      selector: farmer["instanceID"].split(":")[1],
    },
    {
      name: "Created At",
      selector: new Date(farmer["createdAt"]).toLocaleString(),
    },
    {
      name: "Form Version",
      selector: farmer["formVersion"],
    },
  ];

  const farmerInfo = {
    lat: farmer.location.coordinates[1],
    long: farmer.location.coordinates[0],
    name: farmer.farmerName,
    farmerId: farmer.farmerId,
    cc: farmer.cc,
  };

  const [isDraggable, setIsDraggable] = useState(false);

  // ODK image constants
  const projectId = 2;
  const xmlFormId = "Buzaaya-Union-Farmer-Registraion";

  return (
    <FarmerShowPanel icon="ℹ️" title="Information" isOpen={true}>
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
      <Flex
        gap={2}
        mt={2}
        p={2}
        direction={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
        minHeight={"400px"}
      >
        {farmer.photoOfFarm && (
          <Stack direction={"column"} spacing={2}>
            <Heading size="md">Farm Image :</Heading>
            <ChakraImage
              objectFit="cover"
              boxSize={{ base: "400px", sm: "full", md: "400px" }}
              align="center"
              src={`${ENDPOINT.ODK_IMAGES}v1/projects/${projectId}/forms/${xmlFormId}/submissions/${farmer.instanceID}/attachments/${farmer.photoOfFarm}`}
              alt="farmers land picture"
              rounded="md"
              boxShadow="md"
              loading="lazy"
            />
          </Stack>
        )}
        <Stack direction={"column"} spacing={2} width={"full"}>
          <Heading size="md">Location :</Heading>
          <Box
            rounded="md"
            border={4}
            borderColor={"gray.400"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <FarmerMap farmerInfo={farmerInfo} isDraggable={isDraggable} />
          </Box>
        </Stack>
      </Flex>
    </FarmerShowPanel>
  );
}
