import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Alert, AlertIcon, Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { axUpdateFarmerById } from "@services/farmer.service";
import notification, { NotificationType } from "@utils/notification";
import { bindPropertiesToGeoJSON } from "@utils/traceability";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import FarmerEditForm from "./farmer-edit-form";
import LocationEditAndVerifyForm from "./locationEditAndVerifyForm";

const FarmerMap = dynamic(() => import("../map/geoJson-featureCollection-map"), { ssr: false });

export default function FarmerEditPageComponent({ edit }) {
  const [locationUpdated, setLocationUpdated] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const farmer = edit;

  const properties = {
    name: farmer.farmerName,
    _id: farmer._id,
    farmerId: farmer.farmerId,
    cc: farmer.cc,
    noOfFarmPlots: farmer.noOfFarmPlots,
  };

  const geoJsonWithProperties = bindPropertiesToGeoJSON(farmer.location, properties);

  const [geojson, setGeojson] = useState(geoJsonWithProperties);
  const [isLocationVerified, setIsLocationVerified] = useState(farmer.isLocationVerified);

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.back();
  };

  const ActionButtons = () => {
    return (
      <Button
        onClick={handleGoBack}
        leftIcon={<ArrowBackIcon />}
        variant="solid"
        rounded="md"
        colorScheme="gray"
      >
        {t("common:back")}
      </Button>
    );
  };

  const handleUpdatedGeoJson = (geo) => {
    setLocationUpdated(true);
    setGeojson(geo);
  };

  const handleSubmit = async (values) => {
    try {
      // get farmer map values.
      if (locationUpdated) {
        values.location = geojson;
      }

      // adding isLocationVerified field
      values.isLocationVerified = isLocationVerified;

      /*
       * Remove `dateOfSurvey` property from the `values` object.
       *
       * `dateOfSurvey` is initially assigned a placeholder value (`submittedOnODK`)
       * if it is null. This placeholder value is used only for display purposes
       * and is not intended to be sent to the server.
       *
       * To prevent sending unnecessary or misleading data to the server,
       * we delete the `dateOfSurvey` property from the `values` object
       * before submission.
       */
      delete values.dateOfSurvey;

      // get updated values.
      const updatedData = {};

      Object.keys(values).forEach((key) => {
        let valueChanged = false;

        switch (key) {
          case "location":
            valueChanged = locationUpdated;
            break;
          case "otherFarmEnterprises":
            valueChanged = !values[key].every((enterprise) => farmer[key].includes(enterprise));
            break;
          case "submittedOnODK":
            valueChanged = JSON.stringify(values[key]) !== JSON.stringify(new Date(farmer[key]));
            break;
          case "dateOfBirth":
            valueChanged = JSON.stringify(values[key]) !== JSON.stringify(new Date(farmer[key]));
            break;
          default:
            valueChanged = values[key] !== farmer[key];
        }

        if (valueChanged) {
          updatedData[key] = values[key];
        }
      });

      // if no changes, return.
      if (Object.keys(updatedData).length === 0) {
        router.push("/farmer/list");
        return;
      }

      const { success } = await axUpdateFarmerById(farmer._id, updatedData);

      if (success) {
        notification(t("traceability:farmer.update_farmer_success"), NotificationType.Success);
        router.push(`/farmer/show/${farmer._id}`);
      }
    } catch (error) {
      console.error(error);
      notification(t("traceability:farmer.update_farmer_error"), NotificationType.Error);
    }
  };

  const ref: any = React.useRef(null);

  return (
    <Container>
      <PageHeading actions={<ActionButtons />}>🧑‍🌾 Edit Farmer</PageHeading>
      <Accordion defaultIndex={[0]} allowMultiple>
        <FarmerEditForm initialData={farmer} handleSubmit={handleSubmit} ref={ref} />
        <Stack direction={"column"} spacing={2} width={"full"} height={"600px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size="md">{t("traceability:location.location_heading")}</Heading>
          </Flex>
          <LocationEditAndVerifyForm
            isLocationVerified={isLocationVerified}
            setIsLocationVerified={setIsLocationVerified}
          />
          {!isLocationVerified ? (
            <Alert status="warning" variant="left-accent">
              <AlertIcon />
              Location is yet to be verified!
            </Alert>
          ) : (
            <Alert status="success" variant="left-accent">
              <AlertIcon />
              Location is verified!
            </Alert>
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
            <FarmerMap geojson={geojson} setGeojson={handleUpdatedGeoJson} mode={"edit"} />
          </Box>
        </Stack>
        <Flex justifyContent={"flex-end"} gap={2} my={8}>
          <Button variant="solid" colorScheme="gray" size={"lg"} onClick={() => router.back()}>
            {t("common:cancel")}
          </Button>
          <Button
            onClick={() => {
              ref?.current?.submit();
            }}
            variant="solid"
            colorScheme="red"
            size={"lg"}
          >
            {t("traceability:farmer.update_farmer")}
          </Button>
        </Flex>
      </Accordion>
    </Container>
  );
}
