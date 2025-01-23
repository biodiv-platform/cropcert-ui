import { Box, Button, Flex, Heading, Image as ChakraImage, Stack, Table } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { axUpdateFarmerById } from "@services/farmer.service";
import { ENDPOINT } from "@static/constants";
import { hasAccess } from "@utils/auth";
import { capitalizeFirstLetter } from "@utils/basic";
import notification, { NotificationType } from "@utils/notification";
import { bindPropertiesToGeoJSON } from "@utils/traceability";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import { Alert } from "@/components/ui/alert";

import LocationEditAndVerifyForm from "./locationEditAndVerifyForm";
import FarmerShowPanel from "./panel";

const FarmerMap = dynamic(() => import("../map/geoJson-featureCollection-map"), { ssr: false });

export default function FarmerInfo({ farmer }) {
  const { t } = useTranslation();
  const [locationUpdated, setLocationUpdated] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [isLocationVerified, setIsLocationVerified] = useState(farmer.isLocationVerified);
  const { user } = useGlobalState();

  const hasLocationEditAccess = hasAccess(["ROLE_LOCATION_EDITOR"], user);

  const farmerDob = new Date(farmer["dateOfBirth"]);
  const dateOfSurvey = farmer["dateOfSurvey"]
    ? new Date(farmer["dateOfSurvey"]).toLocaleDateString()
    : "N/A";

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
      selector: farmer["gender"] !== null && capitalizeFirstLetter(farmer["gender"]),
    },
    {
      name: "Date of Birth",
      selector: farmerDob.toLocaleDateString(),
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
      selector:
        farmer["levelOfEducation"] !== null && capitalizeFirstLetter(farmer["levelOfEducation"]),
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
      name: "Year of First Plantation",
      selector: farmer["yearOfFirstPlanting"] || "N/A",
    },
    {
      name: "No. of Farm Plots",
      selector: farmer["noOfFarmPlots"],
    },
    {
      name: "Date of Survey",
      selector: dateOfSurvey,
    },
    {
      name: "Enumerator Comment",
      selector: farmer["enumeratorComment"] || "N/A",
    },
    {
      name: "Location Verified",
      selector: farmer["isLocationVerified"] ? "Yes" : "No",
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

  const properties = {
    name: farmer.farmerName,
    _id: farmer._id,
    farmerId: farmer.farmerId,
    CC: farmer.cc,
    noOfFarmPlots: farmer.noOfFarmPlots,
  };

  const geoJsonWithProperties = bindPropertiesToGeoJSON(farmer.location, properties);

  const [originalGeojson, setOriginalGeojson] = useState(geoJsonWithProperties);
  const [geojson, setGeojson] = useState(geoJsonWithProperties);

  // TODO: hardcoded keys, add new keys if new union is added or modified
  const UNION_NAME_TO_PROJECT_DETAILS = {
    6: {
      projectId: 4,
      xmlFormId: "NorthernUganda-Union-Farmer-Registraion",
    },
    5: {
      projectId: 2,
      xmlFormId: "Buzaaya-Union-Farmer-Registraion",
    },
  };

  const prepareImageUrl = (unionName) =>
    `${ENDPOINT.ODK_IMAGES}v1/projects/${unionName.projectId}/forms/${unionName.xmlFormId}/submissions/${farmer.instanceID}/attachments/${farmer.photoOfFarm}`;

  const handleUpdatedGeoJson = (geo) => {
    setLocationUpdated(true);
    setGeojson(geo);
  };

  const handleCancelSaveLocation = () => {
    setMode("view");
    setGeojson(originalGeojson); // Reset to original state
  };

  const handleLocationVerifiedChange = (isVerified) => {
    setIsLocationVerified(isVerified);
    setLocationUpdated(true);
  };

  const enterEditMode = () => {
    setOriginalGeojson(geojson); // Store current state before editing
    setMode("edit");
  };

  const processFarmerLocationEdit = async () => {
    try {
      if (locationUpdated) {
        const updatedValues: {
          isLocationVerified?;
          location?;
        } = {};

        if (isLocationVerified !== farmer.isLocationVerified) {
          updatedValues.isLocationVerified = isLocationVerified;
        }

        if (JSON.stringify(geojson) !== JSON.stringify(originalGeojson)) {
          updatedValues.location = geojson;
        }

        const { success } = await axUpdateFarmerById(farmer._id, updatedValues);

        if (success) {
          notification(t("traceability:farmer.update_farmer_success"), NotificationType.Success);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      notification(t("traceability:farmer.update_farmer_error"), NotificationType.Error);
    } finally {
      setMode("view");
    }
  };

  return (
    <FarmerShowPanel icon="ℹ️" title="Information" isOpen={true}>
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
                <Table.Cell textAlign="left">{item.selector}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      {!isLocationVerified ? (
        <Alert
          status="warning"
          mt={2}
          title={t("traceability:location.farmer_location_not_verified")}
        ></Alert>
      ) : (
        <Alert
          status="success"
          mt={2}
          title={t("traceability:location.farmer_location_verified")}
        ></Alert>
      )}
      <Flex
        gap={2}
        mt={2}
        p={2}
        direction={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
        minHeight={"400px"}
      >
        {farmer.photoOfFarm && (
          <Stack direction={"column"} gap={2}>
            <Heading size="md">Farm Image :</Heading>
            <ChakraImage
              objectFit="cover"
              boxSize={{ base: "400px", sm: "full", md: "400px" }}
              align="center"
              src={prepareImageUrl(UNION_NAME_TO_PROJECT_DETAILS[farmer.unionCode])}
              alt="farmers land picture"
              rounded="md"
              boxShadow="md"
              loading="lazy"
            />
          </Stack>
        )}
        <Stack direction={"column"} gap={2} width={"full"}>
          <Box display={"flex"} justifyContent={"space-between"} alignContent={"center"}>
            <Heading size="md">Location :</Heading>
            {hasLocationEditAccess && (
              <Box>
                {mode === "view" ? (
                  <Button
                    onClick={enterEditMode}
                    size={"sm"}
                    variant={"outline"}
                    colorPalette={"green"}
                  >
                    Edit Location
                  </Button>
                ) : (
                  <Box>
                    <Button onClick={handleCancelSaveLocation} size={"sm"} variant={"ghost"} mx={1}>
                      Cancel
                    </Button>
                    <Button
                      onClick={processFarmerLocationEdit}
                      size={"sm"}
                      variant={"solid"}
                      mx={1}
                      colorPalette="red"
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
          {hasLocationEditAccess && mode === "edit" && (
            <LocationEditAndVerifyForm
              isLocationVerified={isLocationVerified}
              setIsLocationVerified={handleLocationVerifiedChange}
            />
          )}

          <Box
            rounded="md"
            border={4}
            borderColor={"gray.400"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <FarmerMap geojson={geojson} setGeojson={handleUpdatedGeoJson} mode={mode} />
          </Box>
        </Stack>
      </Flex>
    </FarmerShowPanel>
  );
}
