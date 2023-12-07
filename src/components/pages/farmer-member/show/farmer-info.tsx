import FARM_LAND_IMAGE from "@assets/farm-land-default.jpg";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
      selector: farmer["personalDetails"]["farmerName"],
    },
    {
      name: "Gender",
      selector: farmer["personalDetails"]["gender"],
    },
    {
      name: "Date of Birth",
      selector: farmer["personalDetails"]["dateOfBirth"],
    },
    {
      name: "Contact Number",
      selector: farmer["personalDetails"]["contactNumber"] || "N/A",
    },
    {
      name: "National Identity Number",
      selector: farmer["personalDetails"]["nationalIdentityNumber"] || "N/A",
    },
    {
      name: "No of Dependents",
      selector: farmer["personalDetails"]["noOfDependents"],
    },
    {
      name: "Village",
      selector: farmer["personalDetails"]["village"],
    },
    {
      name: "Collection Center",
      selector: farmer["personalDetails"]["cc"],
    },
    {
      name: "Land Acreage",
      selector: farmer["farmDetails"]["landAcreage"],
    },
    {
      name: "Coffee Acreage",
      selector: farmer["farmDetails"]["coffeeAcreage"],
    },
    {
      name: "No. of Coffee Trees",
      selector: farmer["farmDetails"]["noOfCoffeeTrees"],
    },
    {
      name: "Other Farm Enterprises",
      selector: farmer["farmDetails"]["otherFarmEnterprises"].join(", ") || "N/A",
    },
    {
      name: "Agroforestry",
      selector: farmer["farmDetails"]["agroforestry"] ? "Yes" : "No",
    },
    {
      name: "ODK Instance ID",
      selector: farmer["metaData"]["instanceID"].split(":")[1],
    },
    {
      name: "Created At",
      selector: new Date(farmer["createdAt"]).toLocaleString(),
    },
    {
      name: "Form Version",
      selector: farmer["metaData"]["formVersion"],
    },
  ];

  const farmerInfo = {
    lat: farmer.location.coordinates[1],
    long: farmer.location.coordinates[0],
    name: farmer.personalDetails.farmerName,
    farmerId: farmer.farmerId,
    cc: farmer.personalDetails.cc,
  };

  const [isDraggable, setIsDraggable] = useState(false);

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
      >
        {/* TODO: Implement checks when no farm image exist */}
        <Stack direction={"column"} spacing={2}>
          <Heading size="md">Farm Image :</Heading>
          <Image
            objectFit="cover"
            boxSize={{ base: "400px", sm: "full", md: "400px" }}
            align="center"
            src={FARM_LAND_IMAGE.src}
            alt="farmers land picture"
            rounded="md"
            boxShadow="md"
          />
        </Stack>
        <Stack direction={"column"} spacing={2} width={"full"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size="md">Location :</Heading>
            {hasEditDeleteAccess &&
              (isDraggable ? (
                <Button
                  size={"xs"}
                  leftIcon={<CheckIcon />}
                  colorScheme="green"
                  onClick={() => setIsDraggable(false)}
                >
                  Save Location
                </Button>
              ) : (
                <Button
                  size={"xs"}
                  leftIcon={<EditIcon />}
                  colorScheme="yellow"
                  onClick={() => setIsDraggable(true)}
                >
                  Edit Location
                </Button>
              ))}
          </Flex>
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
