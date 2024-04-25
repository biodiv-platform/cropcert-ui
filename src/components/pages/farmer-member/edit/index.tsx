import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { axUpdateFarmerById } from "@services/farmer.service";
import { locationType } from "@static/constants";
import notification, { NotificationType } from "@utils/notification";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import FarmerEditForm from "./farmer-edit-form";

const FarmerMap = dynamic(() => import("../../../@core/map/geo-json-map"), { ssr: false });

export default function FarmerEditPageComponent({ edit }) {
  const [locationUpdated, setLocationUpdated] = useState(false);
  const [updatedGeoJsonData, setUpdatedGeoJsonData] = useState<any>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const farmer = edit;

  const geoJsonData = {
    type: "Feature",
    geometry: {
      type: farmer.location.type,
      coordinates: farmer.location.coordinates,
    },
    properties: {
      name: farmer.farmerName,
      _id: farmer._id,
      farmerId: farmer.farmerId,
      cc: farmer.cc,
      noOfFarms:
        farmer.location.type === locationType.POINT ? 1 : farmer.location.coordinates.length, // update here in case of future expansion of polygon or other geojson types.
    },
  };

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

  const handleSetNewLatLng = (oldLatlng, newLatlng) => {
    const newGeoJsonData = { ...geoJsonData };

    if (newGeoJsonData.geometry.type === locationType.POINT) {
      newGeoJsonData.geometry.coordinates = [newLatlng[1], newLatlng[0]];
      setLocationUpdated(true);
    } else {
      const index = newGeoJsonData.geometry.coordinates.findIndex(
        (subArr) => JSON.stringify(subArr) === JSON.stringify([oldLatlng.lng, oldLatlng.lat])
      );

      if (index != -1) {
        newGeoJsonData.geometry.coordinates[index] = [newLatlng[1], newLatlng[0]];
        setLocationUpdated(true);
      }
    }

    setUpdatedGeoJsonData(newGeoJsonData);
  };

  const handleSubmit = async (values) => {
    try {
      // get farmer map values.

      if (locationUpdated) {
        values.location = {
          type: updatedGeoJsonData?.geometry.type,
          coordinates: updatedGeoJsonData?.geometry.coordinates,
        };
      }

      // get updated values.
      const updatedData = {};

      Object.keys(values).forEach((key) => {
        let valueChanged = false;

        switch (key) {
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
          <Box
            rounded="md"
            border={4}
            borderColor={"gray.400"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <FarmerMap
              geoJsonData={geoJsonData}
              isDraggable={true}
              setNewLatLng={handleSetNewLatLng}
            />
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
