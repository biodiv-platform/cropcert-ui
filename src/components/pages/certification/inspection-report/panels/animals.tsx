import { Box, Button } from "@chakra-ui/core";
import NumberInputField from "@components/@core/formik/number";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import SelectInputField from "@components/@core/formik/select";
import { CoreGrid } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import { FieldArray } from "formik";
import React from "react";

import GridRow from "../../row";
import { ANIMAL_TYPE_OPTIONS, FIELD_SEPRATION_OPTIONS } from "../options";

export default function Animals({ values }) {
  return (
    <LotShowPanel title="Animals" icon="🐄" isOpen={true}>
      <GridRow label="Farmer has Livestock">
        <RadioGroupInputField name="hasLiveStock" />
      </GridRow>
      <GridRow label="Chemical Treatment on Livestock" bgGray={true}>
        <RadioGroupInputField name="chemicalTreatmentOnLivestock" />
      </GridRow>
      <GridRow label="Livestock Treatment conducted 5m from coffee" mb={4}>
        <RadioGroupInputField name="livestockTreatmentConducted5mFromCoffee" />
      </GridRow>
      <FieldArray
        name="animals"
        render={(arrayHelpers) => (
          <div>
            {values.animals && values.animals.length > 0 ? (
              values.animals.map((_farm, index) => (
                <Box key={index} mt={index !== 0 ? 6 : 0}>
                  <CoreGrid>
                    <SelectInputField
                      name={`animals[${index}].type`}
                      label="Type of animal"
                      options={ANIMAL_TYPE_OPTIONS}
                    />
                    <NumberInputField
                      name={`animals[${index}].number`}
                      label="Number of animal"
                      fast={true}
                    />
                    <SelectInputField
                      name={`animals[${index}].husbandryType`}
                      label="Husbandry Type"
                      options={FIELD_SEPRATION_OPTIONS}
                    />
                    <RadioGroupInputField
                      name={`animals[${index}].medication`}
                      label="Medication"
                    />
                  </CoreGrid>

                  <Button
                    variantColor="red"
                    type="button"
                    leftIcon="delete"
                    mr={4}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    Remove Current
                  </Button>
                  <Button
                    variantColor="blue"
                    type="button"
                    leftIcon="add"
                    onClick={() => arrayHelpers.insert(index, {})}
                  >
                    Add Below
                  </Button>
                </Box>
              ))
            ) : (
              <Button
                variantColor="blue"
                type="button"
                onClick={() => arrayHelpers.push({})}
                leftIcon="add"
              >
                Add a animal
              </Button>
            )}
          </div>
        )}
      />
    </LotShowPanel>
  );
}
