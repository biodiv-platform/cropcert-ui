import {
  Alert,
  AlertIcon,
  Badge,
  Button,
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
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import FormHeading from "@components/pages/lot/list/modals/typography";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@icons/save";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  farmerName: yup.string().required("Farmer Name is required"),
  gender: yup.string().required("Gender is required"),
  // Add other fields and validations as needed
});

export default function EditFarmerForm({ isOpen, onClose, initialData, onSubmit, canWrite }) {
  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      farmerId: initialData?.farmerId,
      farmerName: initialData?.personalDetails.farmerName,
      gender: initialData?.personalDetails.gender,
      dateOfBirth: initialData?.personalDetails.dateOfBirth,
      contactNumber: initialData?.personalDetails.contactNumber,
      nationalIdentityNumber: initialData?.personalDetails.nationalIdentityNumber,
      levelOfEducation: initialData?.personalDetails.levelOfEducation,
      noOfDependents: initialData?.personalDetails.noOfDependents,
      village: initialData?.personalDetails.village,
      cc: initialData?.personalDetails.cc,
      landAcreage: initialData?.farmDetails.landAcreage,
      coffeeAcreage: initialData?.farmDetails.coffeeAcreage,
      noOfCoffeeTrees: initialData?.farmDetails.noOfCoffeeTrees,
      agroforestry: initialData?.farmDetails.agroforestry,
      instanceID: initialData?.metaData.instanceID,
      instanceName: initialData?.metaData.instanceName,
      submittedOnODK: initialData?.metaData.submittedOnODK,
      submitterName: initialData?.metaData.submitterName,
      formVersion: initialData?.metaData.formVersion,
      edits: initialData?.metaData.edits,
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

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        <ModalContent>
          <ModalHeader>Edit Farmer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormHeading>Personal Details</FormHeading>
            <CoreGrid rows={5}>
              <TextBoxField label="Famer ID" name="farmerId" disabled={true} />
              <TextBoxField label="Famer Name" name="farmerName" />
              <SelectInputField
                name="gender"
                label="Gender"
                options={[
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                  { label: "Non-Binary", value: "NON_BINARY" },
                ]}
                shouldPortal={true}
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
                options={[
                  { label: "cereals", value: "cereals" },
                  { label: "legumes", value: "legumes" },
                  { label: "trees", value: "trees" },
                  { label: "poultry", value: "poultry" },
                ]}
              />
              <SelectInputField
                name="agroforestry"
                label="Agroforestry"
                options={[
                  { label: "Yes", value: "YES" },
                  { label: "No", value: "NO" },
                ]}
                shouldPortal={true}
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
