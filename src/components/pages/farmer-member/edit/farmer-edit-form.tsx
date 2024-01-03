import {
  Box,
  FormErrorMessage,
  FormLabel,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DateTimeInputField } from "@components/form/datepicker";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import * as yup from "yup";
import FarmerShowPanel from "../show/panel";

const schema = yup.object().shape({
  farmerName: yup.string().required("Farmer Name is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.date().required("DOB is required"),
  contactNumber: yup.string(),
  nationalIdentityNumber: yup.string(),
  levelOfEducation: yup.string(),
  noOfDependents: yup.number(),
  village: yup.string(),
  cc: yup.string().required("CC Name is required"),
  landAcreage: yup.number(),
  coffeeAcreage: yup.number(),
  noOfCoffeeTrees: yup.number(),
  otherFarmEnterprises: yup.string(),
  agroforestry: yup.string(),
  instanceID: yup.string(),
  instanceName: yup.string(),
  submittedOnODK: yup.date(),
  submitterName: yup.string(),
  formVersion: yup.string(),
  edits: yup.string(),
  ccCode: yup.string(),
  coCode: yup.string(),
  unionCode: yup.string(),
});

function FarmerEditForm({ initialData }) {
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
      submitterName: initialData?.submitterName,
      formVersion: initialData?.formVersion,
      edits: initialData?.edits,
      ccCode: initialData?.ccCode,
      coCode: initialData?.coCode,
      unionCode: initialData?.unionCode,
      finalizeFarmerEdit: false,
    },
  });

  let errorMessage = hForm.formState.errors?.submit?.message;

  const handleOnSubmit = async (values) => {
    console.log("values", values);
  };

  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "NON_BINARY" },
  ];

  const levelOfEducationList = [
    { label: "Primary School", value: "primary" },
    { label: "Secondary School", value: "secondary" },
    { label: "University and vocational training education", value: "tertiary" },
  ];

  const agroforestryList = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const otherFarmEnterprisesList = [
    { label: "cereals", value: "cereals" },
    { label: "legumes", value: "legumes" },
    { label: "trees", value: "trees" },
    { label: "poultry", value: "poultry" },
    { label: "livestock", value: "livestock" },
  ];

  return (
    <FarmerShowPanel icon="ℹ️" title="Information" isOpen={true}>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <Table variant="simple" size="md" my={2}>
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
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Farmer ID</Td>
                <Td textAlign="left">
                  <TextBoxField name="farmerId" disabled={true} mb={0} />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Farmer Name</Td>
                <Td textAlign="left">
                  <TextBoxField name="farmerName" mb={0} />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Gender</Td>
                <Td textAlign="left">
                  <Controller
                    name="gender"
                    control={hForm.control}
                    render={({ field, fieldState }) => (
                      <Box>
                        <Select
                          defaultValue={genderList.find((l) => l.value == field.value)}
                          options={genderList}
                          name={"gender"}
                          onChange={(v: { label: string; value: string }) =>
                            field.onChange(v.value)
                          }
                          styles={{
                            control: (base) => ({
                              ...base,
                              paddingLeft: "7px",
                            }),
                          }}
                        />
                        <FormErrorMessage children={fieldState?.error?.message} />
                      </Box>
                    )}
                  />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Date of Birth</Td>
                <Td textAlign="left">
                  <DateTimeInputField
                    name="dateOfBirth"
                    format="dd-MM-yyyy"
                    className="dateTimePicker"
                    mb={0}
                  />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Contact No.</Td>
                <Td textAlign="left">
                  <TextBoxField
                    name="contactNumber"
                    type="number"
                    placeholder={"078-123-4567"}
                    mb={0}
                  />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">National Identity Number</Td>
                <Td textAlign="left">
                  <TextBoxField
                    name="nationalIdentityNumber"
                    placeholder={"UGA-123-456-7890"}
                    mb={0}
                  />
                </Td>
              </Tr>

              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Level of Education</Td>
                <Td textAlign="left">
                  <Controller
                    name="levelOfEducation"
                    control={hForm.control}
                    render={({ field, fieldState }) => (
                      <Box>
                        <Select
                          defaultValue={levelOfEducationList.find((l) => l.value == field.value)}
                          options={levelOfEducationList}
                          name={"levelOfEducation"}
                          onChange={(v: { label: string; value: string }) =>
                            field.onChange(v.value)
                          }
                          styles={{
                            control: (base) => ({
                              ...base,
                              paddingLeft: "7px",
                            }),
                          }}
                        />
                        <FormErrorMessage children={fieldState?.error?.message} />
                      </Box>
                    )}
                  />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">No of Dependents</Td>
                <Td textAlign="left">
                  <TextBoxField name="noOfDependents" type="number" mb={0} />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Village</Td>
                <Td textAlign="left">
                  <TextBoxField name="village" mb={0} />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Collection Center</Td>
                <Td textAlign="left">
                  <TextBoxField name="cc" mb={0} />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Land Acreage</Td>
                <Td textAlign="left">
                  <TextBoxField name="landAcreage" type="number" mb={0} />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Coffee Acreage</Td>
                <Td textAlign="left">
                  <TextBoxField name="coffeeAcreage" type="number" mb={0} />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">No. of Coffee Trees</Td>
                <Td textAlign="left">
                  <TextBoxField name="noOfCoffeeTrees" type="number" mb={0} />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Other Farm Enterprises</Td>
                <Td textAlign="left">
                  <SelectMultipleInputField
                    name="otherFarmEnterprises"
                    options={otherFarmEnterprisesList}
                    mb={0}
                  />
                </Td>
              </Tr>

              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Agroforestry</Td>
                <Td textAlign="left">
                  <Controller
                    name="agroforestry"
                    control={hForm.control}
                    render={({ field, fieldState }) => (
                      <Box>
                        <Select
                          defaultValue={agroforestryList.find((l) => l.value == field.value)}
                          options={agroforestryList}
                          name={"agroforestry"}
                          onChange={(v: { label: string; value: string }) =>
                            field.onChange(v.value)
                          }
                          styles={{
                            control: (base) => ({
                              ...base,
                              paddingLeft: "7px",
                            }),
                          }}
                        />
                        <FormErrorMessage children={fieldState?.error?.message} />
                      </Box>
                    )}
                  />
                </Td>
              </Tr>

              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Instance ID</Td>
                <Td textAlign="left">
                  <TextBoxField mb={0} name="instanceID" disabled={true} />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Instance Name</Td>
                <Td textAlign="left">
                  <TextBoxField mb={0} name="instanceName" disabled={true} />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Submission Date</Td>
                <Td textAlign="left">
                  <Controller
                    control={hForm.control} // control prop from useForm()
                    name="submittedOnODK"
                    render={({ field }) => (
                      <DateTimeInputField
                        mb={0}
                        name="submittedOnODK"
                        disabled={true}
                        className="dateTimePicker"
                        value={new Date(field.value)}
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Submitted By</Td>
                <Td textAlign="left">
                  <TextBoxField mb={0} name="submitterName" disabled={true} />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Form Version</Td>
                <Td textAlign="left">
                  <TextBoxField mb={0} name="formVersion" disabled={true} />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">Edits</Td>
                <Td textAlign="left">
                  <TextBoxField mb={0} name="edits" disabled={true} type="number" />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">CC Code</Td>
                <Td textAlign="left">
                  <TextBoxField mb={0} name="ccCode" disabled={true} type="number" />
                </Td>
              </Tr>
              <Tr backgroundColor={"gray.100"}>
                <Td textAlign="left">CO Code</Td>
                <Td textAlign="left">
                  <TextBoxField mb={0} name="coCode" disabled={true} type="number" />
                </Td>
              </Tr>
              <Tr backgroundColor={"white"}>
                <Td textAlign="left">Union Code</Td>
                <Td textAlign="left">
                  <TextBoxField mb={0} name="unionCode" disabled={true} type="number" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </form>
      </FormProvider>
    </FarmerShowPanel>
  );
}

export default FarmerEditForm;
