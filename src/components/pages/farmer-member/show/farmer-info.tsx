import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { GMAP_LIBRARIES } from "@static/location";
import React from "react";

import FarmerShowPanel from "./panel";

export default function FarmerInfo({ farmer }) {
  const basicInfoHeader = [
    {
      name: "ID",
      selector: farmer["farmerId"],
    },
    {
      name: "Farmer Name",
      selector: farmer["personalDetails"]["farmer_name"],
    },
    {
      name: "Gender",
      selector: farmer["personalDetails"]["gender"],
    },
    {
      name: "Date of Birth",
      selector: farmer["personalDetails"]["date_of_birth"],
    },
    {
      name: "Contact Number",
      selector: farmer["personalDetails"]["contact_number"] || "N/A",
    },
    {
      name: "Date of Birth",
      selector: farmer["personalDetails"]["date_of_birth"],
    },
    {
      name: "National Identity Number",
      selector: farmer["personalDetails"]["national_identity_number"] || "N/A",
    },
    {
      name: "No of Dependents",
      selector: farmer["personalDetails"]["no_of_dependents"],
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
      selector: farmer["farmDetails"]["land_acreage"],
    },
    {
      name: "Coffee Acreage",
      selector: farmer["farmDetails"]["coffee_acrage"],
    },
    {
      name: "No. of Coffee Trees",
      selector: farmer["farmDetails"]["no_of_coffee_trees"],
    },
    {
      name: "Other Farm Enterprises",
      selector: farmer["farmDetails"]["other_farm_enterprises"].join(", ") || "N/A",
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

  const mapContainerStyle = {
    height: "380px",
    width: "100%",
  };

  const center = {
    lat: farmer["location"]["coordinates"][0],
    lng: farmer["location"]["coordinates"][1],
  };

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
      <Flex gap={2} mt={2}>
        <img src="https://placehold.co/550x380" alt="farmers land picture" />

        <LoadScriptNext
          id="observation-create-map-script-loader"
          googleMapsApiKey={SITE_CONFIG.TOKENS.GMAP}
          region={SITE_CONFIG.MAP.COUNTRY}
          libraries={GMAP_LIBRARIES}
        >
          <GoogleMap id="observation-create-map" mapContainerStyle={mapContainerStyle}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScriptNext>
      </Flex>
    </FarmerShowPanel>
  );
}
