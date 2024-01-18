import { Box, FormErrorMessage, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  agroforestryList,
  genderList,
  levelOfEducationList,
  otherFarmEnterprisesList,
} from "@static/constants";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";

import FarmerShowPanel from "../show/panel";
import DateTime from "./dateTime";
import TableRow from "./tableRow";
import schema from "./yupSchema";

const FarmerEditForm = forwardRef(({ initialData, handleSubmit }, ref) => {
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
      submittedOnODK: initialData?.submittedOnODK,
      formVersion: initialData?.formVersion,
      edits: initialData?.edits,
      ccCode: initialData?.ccCode,
      coCode: initialData?.coCode,
      unionCode: initialData?.unionCode,
    },
  });

  let errorMessage = hForm.formState.errors?.submit?.message;

  // to handle submit from outside of the component
  useImperativeHandle(
    ref,
    () => {
      return {
        submit: () => {
          hForm.handleSubmit(handleSubmit)();
        },
      };
    },
    [hForm, handleSubmit]
  );

  return (
    <FarmerShowPanel icon="ℹ️" title="Information" isOpen={true}>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleSubmit)}>
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
              <TableRow name={"Farmer ID"} color="gray.100">
                <TextBoxField mb={0} name="farmerId" disabled={true} />
              </TableRow>
              <TableRow name={"Farmer Name"} color="white">
                <TextBoxField name="farmerName" mb={0} />
              </TableRow>

              <TableRow name={"Gender"} color="gray.100">
                <Controller
                  name="gender"
                  control={hForm.control}
                  render={({ field, fieldState }) => (
                    <Box>
                      <Select
                        defaultValue={genderList.find((l) => l.value == field.value)}
                        options={genderList}
                        name={"gender"}
                        onChange={(v: { label: string; value: string }) => field.onChange(v.value)}
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
              </TableRow>

              <TableRow name={"Date of Birth"} color="white">
                <DateTime
                  control={hForm.control}
                  name="dateOfBirth"
                  format="dd-MM-yyyy"
                  maxDate={new Date()}
                />
              </TableRow>

              <TableRow name={"Contact No."} color={"gray.100"}>
                <TextBoxField
                  name="contactNumber"
                  type="number"
                  placeholder={"078-123-4567"}
                  mb={0}
                />
              </TableRow>

              <TableRow name={"National Identity Number"} color={"white"}>
                <TextBoxField
                  name="nationalIdentityNumber"
                  placeholder={"UGA-123-456-78910"}
                  mb={0}
                />
              </TableRow>

              <TableRow name={"Level of Education"} color={"gray.100"}>
                <Controller
                  name="levelOfEducation"
                  control={hForm.control}
                  render={({ field, fieldState }) => (
                    <Box>
                      <Select
                        defaultValue={levelOfEducationList.find((l) => l.value == field.value)}
                        options={levelOfEducationList}
                        name={"levelOfEducation"}
                        onChange={(v: { label: string; value: string }) => field.onChange(v.value)}
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
              </TableRow>

              <TableRow name={"No of Dependents"} color={"white"}>
                <TextBoxField name="noOfDependents" type="number" mb={0} />
              </TableRow>

              <TableRow name={"Village"} color={"gray.100"}>
                <TextBoxField name="village" mb={0} />
              </TableRow>

              <TableRow name={"Collection Center"} color={"white"}>
                <TextBoxField name="cc" mb={0} />
              </TableRow>

              <TableRow name={"Land Acreage"} color={"gray.100"}>
                <TextBoxField name="landAcreage" type="number" mb={0} />
              </TableRow>

              <TableRow name={"Coffee Acreage"} color={"white"}>
                <TextBoxField name="coffeeAcreage" type="number" mb={0} />
              </TableRow>

              <TableRow name={"No. of Coffee Trees"} color={"gray.100"}>
                <TextBoxField name="noOfCoffeeTrees" type="number" mb={0} />
              </TableRow>

              <TableRow name={"Other Farm Enterprises"} color={"white"}>
                <SelectMultipleInputField
                  name="otherFarmEnterprises"
                  options={otherFarmEnterprisesList}
                  mb={0}
                />
              </TableRow>

              <TableRow name={"Agroforestry"} color={"gray.100"}>
                <Controller
                  name="agroforestry"
                  control={hForm.control}
                  render={({ field, fieldState }) => (
                    <Box>
                      <Select
                        defaultValue={agroforestryList.find((l) => l.value == field.value)}
                        options={agroforestryList}
                        name={"agroforestry"}
                        onChange={(v: { label: string; value: string }) => field.onChange(v.value)}
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
              </TableRow>

              <TableRow name={"Instance ID"} color={"white"}>
                <TextBoxField mb={0} name="instanceID" disabled={true} />
              </TableRow>

              <TableRow name={"Instance Name"} color={"gray.100"}>
                <TextBoxField mb={0} name="instanceName" disabled={true} />
              </TableRow>

              <TableRow name={"Submission Date"} color={"white"}>
                <DateTime control={hForm.control} name="submittedOnODK" disabled={true} />
              </TableRow>

              <TableRow name={"Submitted By"} color={"gray.100"}>
                <TextBoxField mb={0} name="submitterName" disabled={true} />
              </TableRow>

              <TableRow name={"Form Version"} color={"white"}>
                <TextBoxField mb={0} name="formVersion" disabled={true} />
              </TableRow>

              <TableRow name={"Edits"} color={"gray.100"}>
                <TextBoxField mb={0} name="edits" disabled={true} type="number" />
              </TableRow>

              <TableRow name={"CC Code"} color={"white"}>
                <TextBoxField mb={0} name="ccCode" disabled={true} type="number" />
              </TableRow>

              <TableRow name={"CO Code"} color={"gray.100"}>
                <TextBoxField mb={0} name="coCode" disabled={true} type="number" />
              </TableRow>

              <TableRow name={"Union Code"} color={"white"}>
                <TextBoxField mb={0} name="unionCode" disabled={true} type="number" />
              </TableRow>
            </Tbody>
          </Table>
        </form>
      </FormProvider>
    </FarmerShowPanel>
  );
});

export default FarmerEditForm;
