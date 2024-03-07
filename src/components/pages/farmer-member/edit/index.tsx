/* eslint-disable @typescript-eslint/no-unused-vars */ //TODO: remove this after fixing map edit issue
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Accordion, Button, Flex } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { axUpdateFarmerById } from "@services/farmer.service";
import notification, { NotificationType } from "@utils/notification";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import FarmerEditForm from "./farmer-edit-form";

const FarmerMap = dynamic(() => import("../map/farmer-map"), { ssr: false });

export default function FarmerEditPageComponent({ edit }) {
  const [isDraggable, setIsDraggable] = useState(false);
  const [newLatLng, setNewLatLng] = useState([0, 0]);
  const [resetMarker, setResetMarker] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const farmer = edit;

  const farmerInfo = {
    lat: farmer?.location?.coordinates[1],
    long: farmer?.location?.coordinates[0],
    name: farmer.farmerName,
    farmerId: farmer.farmerId,
    cc: farmer.cc,
  };

  const hasEditDeleteAccess = true; //TODO: add access control

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

  const handleSubmit = async (values) => {
    try {
      // get farmer map values.
      if (newLatLng[0] !== 0 && newLatLng[1] !== 0) {
        values.location = {
          type: "Point",
          coordinates: [newLatLng[1], newLatLng[0]],
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
        {/* <Stack direction={"column"} spacing={2} width={"full"} height={"600px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size="md">{t("traceability:location.location_heading")}</Heading>
            {hasEditDeleteAccess &&
              (isDraggable ? (
                <Flex gap={2}>
                  <Button
                    size={"md"}
                    mb={2}
                    colorScheme="yellow"
                    onClick={() => {
                      setIsDraggable(false);
                      setResetMarker(true);
                    }}
                  >
                    {t("common:cancel")}
                  </Button>
                  <Button
                    size={"md"}
                    mb={2}
                    leftIcon={<CheckIcon />}
                    colorScheme="green"
                    onClick={() => setIsDraggable(false)}
                  >
                    {t("traceability:location.save_marker_location")}
                  </Button>
                </Flex>
              ) : (
                <Button
                  size={"md"}
                  mb={2}
                  leftIcon={<EditIcon />}
                  colorScheme="yellow"
                  onClick={() => setIsDraggable(true)}
                >
                  {t("traceability:location.edit_marker_location")}
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
            <FarmerMap
              farmerInfo={farmerInfo}
              isDraggable={isDraggable}
              setNewLatLng={setNewLatLng}
              resetMarker={resetMarker}
              setResetMarker={setResetMarker}
            />
          </Box>
        </Stack> */}
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
