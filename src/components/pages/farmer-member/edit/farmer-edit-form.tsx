import { Box, Table } from "@chakra-ui/react";
import { SelectMultipleInputField } from "@components/form/select-multiple";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  agroforestryList,
  genderList,
  levelOfEducationList,
  otherFarmEnterprisesList,
} from "@static/constants";
import React, { forwardRef, useImperativeHandle } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";

import { Field } from "@/components/ui/field";

import FarmerShowPanel from "../show/panel";
import DateTime from "./dateTime";
import TableRow from "./tableRow";
import schema from "./yupSchema";

const FarmerEditForm = forwardRef(({ initialData, handleSubmit }: any, ref) => {
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
      yearOfFirstPlanting: initialData?.yearOfFirstPlanting,
      noOfFarmPlots: initialData?.noOfFarmPlots,
      dateOfSurvey:
        initialData?.dateOfSurvey === null
          ? initialData?.submittedOnODK
          : initialData?.dateOfSurvey,
      enumeratorComment: initialData?.enumeratorComment,
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
          <Table.Root size="md" my={2}>
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
                      <Field children={fieldState?.error?.message} />
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
                <TextBoxField name="contactNumber" type="number" mb={0} />
              </TableRow>
              <TableRow name={"National Identity Number"} color={"white"}>
                <TextBoxField name="nationalIdentityNumber" mb={0} />
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
                      <Field children={fieldState?.error?.message} />
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
                      <Field children={fieldState?.error?.message} />
                    </Box>
                  )}
                />
              </TableRow>
              <TableRow name={"Year of First Plantation"} color={"white"}>
                <TextBoxField name="yearOfFirstPlanting" mb={0} />
              </TableRow>

              <TableRow name={"No. of Farm Plots"} color={"gray.100"}>
                <TextBoxField mb={0} name="noOfFarmPlots" disabled={true} />
              </TableRow>
              <TableRow name={"Date of Survey"} color="white">
                <DateTime control={hForm.control} name="dateOfSurvey" disabled={true} />
              </TableRow>
              <TableRow name={"Enumerator Comment"} color={"gray.100"}>
                <TextBoxField mb={0} name="enumeratorComment" placeholder={"N/A"} disabled={true} />
              </TableRow>
              <TableRow name={"Instance ID"} color={"gray.100"}>
                <TextBoxField mb={0} name="instanceID" disabled={true} />
              </TableRow>
              <TableRow name={"Instance Name"} color={"white"}>
                <TextBoxField mb={0} name="instanceName" disabled={true} />
              </TableRow>
              <TableRow name={"Submission Date"} color={"gray.100"}>
                <DateTime control={hForm.control} name="submittedOnODK" disabled={true} />
              </TableRow>
              <TableRow name={"Submitted By"} color={"white"}>
                <TextBoxField mb={0} name="submitterName" disabled={true} />
              </TableRow>
              <TableRow name={"Form Version"} color={"gray.100"}>
                <TextBoxField mb={0} name="formVersion" disabled={true} />
              </TableRow>
              <TableRow name={"Edits"} color={"white"}>
                <TextBoxField mb={0} name="edits" disabled={true} type="number" />
              </TableRow>
              <TableRow name={"CC Code"} color={"gray.100"}>
                <TextBoxField mb={0} name="ccCode" disabled={true} type="number" />
              </TableRow>
              <TableRow name={"CO Code"} color={"white"}>
                <TextBoxField mb={0} name="coCode" disabled={true} type="number" />
              </TableRow>
              <TableRow name={"Union Code"} color={"gray.100"}>
                <TextBoxField mb={0} name="unionCode" disabled={true} type="number" />
              </TableRow>
            </Table.Body>
          </Table.Root>
        </form>
      </FormProvider>
    </FarmerShowPanel>
  );
});

export default FarmerEditForm;
