import { Button, Flex } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { axUpdateFarmerById } from "@services/farmer.service";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useRef } from "react";
import { LuArrowLeft } from "react-icons/lu";

import { AccordionRoot } from "@/components/ui/accordion";

import FarmerEditForm from "./farmer-edit-form";

export default function FarmerEditPageComponent({ edit }) {
  const router = useRouter();
  const { t } = useTranslation();
  const ref: any = useRef(null);

  const farmer = edit;

  // Function to go back to the previous page
  const handleGoBack = () => {
    router.back();
  };

  const ActionButtons = () => {
    return (
      <Button onClick={handleGoBack} variant="subtle" rounded="md">
        <LuArrowLeft />
        {t("common:back")}
      </Button>
    );
  };

  const valuesChangedKeys = {
    OTHER_FARM_ENTERPRISES: "otherFarmEnterprises",
    SUBMITTED_ON_ODK: "submittedOnODK",
    DATE_OF_BIRTH: "dateOfBirth",
  };

  const handleSubmit = async (values) => {
    try {
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
          case valuesChangedKeys.OTHER_FARM_ENTERPRISES:
            valueChanged = !values[key].every((enterprise) => farmer[key].includes(enterprise));
            break;
          case valuesChangedKeys.SUBMITTED_ON_ODK:
            valueChanged = JSON.stringify(values[key]) !== JSON.stringify(new Date(farmer[key]));
            break;
          case valuesChangedKeys.DATE_OF_BIRTH:
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
        router.push(`/farmer/show/${farmer._id}`);
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

  return (
    <Container>
      <PageHeading actions={<ActionButtons />} floatHeader={true}>
        🧑‍🌾 Edit Farmer
      </PageHeading>
      <AccordionRoot multiple defaultValue={["Information"]}>
        <FarmerEditForm initialData={farmer} handleSubmit={handleSubmit} ref={ref} />
        <Flex justifyContent={"flex-end"} gap={2} my={8}>
          <Button variant="subtle" colorPalette="gray" size={"lg"} onClick={() => router.back()}>
            {t("common:cancel")}
          </Button>
          <Button
            onClick={() => {
              ref?.current?.submit();
            }}
            variant="solid"
            colorPalette="red"
            size={"lg"}
          >
            {t("traceability:farmer.update_farmer")}
          </Button>
        </Flex>
      </AccordionRoot>
    </Container>
  );
}
