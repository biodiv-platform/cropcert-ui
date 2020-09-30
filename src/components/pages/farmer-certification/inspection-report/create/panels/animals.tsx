import { Box, Button } from "@chakra-ui/core";
import NumberInputField from "@components/@core/formik/number";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import SelectInputField from "@components/@core/formik/select";
import { CoreGrid } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import { FieldArray, useFormikContext } from "formik";
import React from "react";

import GridRow from "../../../row";
import { ANIMAL_HUSBANDARY_OPTIONS, ANIMAL_TYPE_OPTIONS } from "../options";
import { ANIMALS_PANEL } from "./data";

export default function Animals() {
  const { values }: any = useFormikContext();

  return (
    <LotShowPanel title={ANIMALS_PANEL.title} icon={ANIMALS_PANEL.icon} isOpen={true}>
      <GridRow
        label={ANIMALS_PANEL.keys.general.hasLiveStock}
        field={RadioGroupInputField}
        name="hasLiveStock"
      />

      <GridRow
        label={ANIMALS_PANEL.keys.general.chemicalTreatmentOnLivestock}
        bgGray={true}
        field={RadioGroupInputField}
        name="chemicalTreatmentOnLivestock"
      />

      <GridRow
        label={ANIMALS_PANEL.keys.general.livestockTreatmentConducted5mFromCoffee}
        mb={4}
        field={RadioGroupInputField}
        name="livestockTreatmentConducted5mFromCoffee"
      />

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
                      label={ANIMALS_PANEL.keys.animals.type}
                      options={ANIMAL_TYPE_OPTIONS}
                    />
                    <NumberInputField
                      name={`animals[${index}].number`}
                      label={ANIMALS_PANEL.keys.animals.number}
                      fast={true}
                    />
                    <SelectInputField
                      name={`animals[${index}].husbandryType`}
                      label={ANIMALS_PANEL.keys.animals.husbandryType}
                      options={ANIMAL_HUSBANDARY_OPTIONS}
                    />
                    <RadioGroupInputField
                      name={`animals[${index}].medication`}
                      label={ANIMALS_PANEL.keys.animals.medication}
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
