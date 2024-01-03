import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  FormErrorMessage,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { DateTimeInputField } from "@components/form/datepicker";
import { SelectInputField } from "@components/form/select";
import { SelectAsyncInputField } from "@components/form/select-async";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import FormHeading from "@components/pages/lot/list/modals/typography";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@icons/save";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import * as yup from "yup";

const schema = yup.object().shape({
  farmerName: yup.string().required("Farmer Name is required"),
  // Add other fields and validations as needed
});

export default function EditFarmerForm({ isOpen, onClose, initialData, onSubmit, canWrite }) {
  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      farmerId: initialData?.farmerId,
      farmerName: initialData?.farmerName,
      gender: initialData?.gender,
      dateOfBirth: initialData?.dateOfBirth,
      contactNumber: initialData?.contactNumber,
      nationalIdentityNumber: initialData?.nationalIdentityNumber,
      levelOfEducation: initialData?.levelOfEducation,
      noOfDependents: initialData?.noOfDependents,
      village: initialData?.village,
      cc: initialData?.cc,
      landAcreage: initialData?.landAcreage,
      coffeeAcreage: initialData?.coffeeAcreage,
      noOfCoffeeTrees: initialData?.noOfCoffeeTrees,
      otherFarmEnterprises: initialData?.otherFarmEnterprises,
      agroforestry: initialData?.agroforestry,
      instanceID: initialData?.instanceID,
      instanceName: initialData?.instanceName,
      submittedOnODK: initialData?.submittedOnODK,
      submitterName: initialData?.submitterName,
      formVersion: initialData?.formVersion,
      edits: initialData?.edits,
      ccCode: initialData?.ccCode,
      coCode: initialData?.coCode,
      unionCode: initialData?.unionCode,
      finalizeFarmerEdit: false,
    },
  });

  const values = hForm.watch();

  let errorMessage = hForm.formState.errors?.submit?.message;

  const handleOnSubmit = async (values) => {
    values.finalizeFarmerEdit ? onSubmit(values) : (errorMessage = "Please confirm edits");

    console.log("values", values);
  };

  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "NON_BINARY" },
  ];

  const agroforestryList = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const otherFarmEnterprisesList = [
    { label: "cereals", value: "cereals" },
    { label: "legumes", value: "legumes" },
    { label: "trees", value: "trees" },
    { label: "poultry", value: "poultry" },
    { label: "livestock", value: "livestock" },
  ];

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        <ModalContent>
          <ModalHeader>Edit Farmer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormHeading>Personal Details</FormHeading>
            <CoreGrid rows={5}>
              <TextBoxField label="Farmer ID" name="farmerId" disabled={true} />
              <TextBoxField label="Farmer Name" name="farmerName" />
              <Controller
                name="gender"
                control={hForm.control}
                render={({ field, fieldState }) => (
                  <Box>
                    <FormLabel htmlFor={"gender"}>Gender</FormLabel>
                    <Select
                      defaultValue={genderList.find((l) => l.value == field.value)}
                      options={genderList}
                      name={"gender"}
                      onChange={(v: { label: string; value: string }) => field.onChange(v.value)}
                    />
                    <FormErrorMessage children={fieldState?.error?.message} />
                  </Box>
                )}
              />

              <DateTimeInputField label="Date of Birth" name="dateOfBirth" format="dd-MM-yyyy" />
              <TextBoxField label="Contact No." name="contactNumber" type="number" />
              <TextBoxField
                label="National Identity No."
                name="nationalIdentityNumber"
                type="number"
              />
              <TextBoxField label="Level of Education" name="levelOfEducation" />
              <TextBoxField label="Number of Dependents" name="noOfDependents" type="number" />
              <TextBoxField label="Village" name="village" />
              <TextBoxField label="Collection Center" name="cc" />
            </CoreGrid>
            <FormHeading>FarmDetails</FormHeading>
            <CoreGrid rows={5}>
              <TextBoxField label="Land Acreage" name="landAcreage" type="number" />
              <TextBoxField label="Coffee Acreage" name="coffeeAcreage" type="number" />
              <TextBoxField label="No. of coffee trees" name="noOfCoffeeTrees" type="number" />
              {/* TODO: other farm enterprises */}
              <SelectMultipleInputField
                name="otherFarmEnterprises"
                label="Other Farm Enterprises"
                options={otherFarmEnterprisesList}
              />

              <Controller
                name="agroforestry"
                control={hForm.control}
                render={({ field, fieldState }) => (
                  <Box>
                    <FormLabel htmlFor={"agroforestry"}>Agroforestry</FormLabel>
                    <Select
                      defaultValue={agroforestryList.find((l) => l.value == field.value)}
                      options={agroforestryList}
                      name={"agroforestry"}
                      onChange={(v: { label: string; value: string }) => field.onChange(v.value)}
                    />
                    <FormErrorMessage children={fieldState?.error?.message} />
                  </Box>
                )}
              />
            </CoreGrid>

            <FormHeading>MetaData</FormHeading>
            <CoreGrid rows={5}>
              <TextBoxField label="Instance ID" name="instanceID" disabled={true} />
              <TextBoxField label="Instance ID" name="instanceName" disabled={true} />
              <DateTimeInputField label="Submission Date" name="submittedOnODK" disabled={true} />
              <TextBoxField label="Submitted By" name="submitterName" disabled={true} />
              <TextBoxField label="Form Version" name="formVersion" disabled={true} />
              <TextBoxField label="Edits" name="edits" disabled={true} type="number" />
              <TextBoxField label="CC Code" name="ccCode" disabled={true} type="number" />
              <TextBoxField label="CO Code" name="coCode" disabled={true} type="number" />
              <TextBoxField label="Union Code" name="unionCode" disabled={true} type="number" />
            </CoreGrid>

            <CheckBoxField
              name="finalizeFarmerEdit"
              mt={2}
              label={
                <span>
                  I have double checked edits. <Badge colorScheme="red">irreversible</Badge>
                </span>
              }
              isDisabled={!canWrite}
            />
            {errorMessage && (
              <Alert status="error" borderRadius="md">
                <AlertIcon /> {errorMessage}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <SubmitButton leftIcon={<SaveIcon />} isDisabled={!canWrite} colorScheme={"red"}>
              Confirm Edit
            </SubmitButton>
          </ModalFooter>
        </ModalContent>
      </form>
    </FormProvider>
  );
}
