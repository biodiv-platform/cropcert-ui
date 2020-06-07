import { Accordion, Box, Button } from "@chakra-ui/core";
import { DateTime } from "@components/@core/formik";
import NumberInputField from "@components/@core/formik/number";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import SelectInputField from "@components/@core/formik/select";
import TextInputField from "@components/@core/formik/text";
import { CoreGrid } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import { FieldArray } from "formik";
import React from "react";

import { FIELD_SEPRATION_OPTIONS, GFP_OPTIONS } from "../options";

export default function Farm({ values }) {
  return (
    <LotShowPanel title="Farm (all coffee plots)" icon="🌄" isOpen={true}>
      <FieldArray
        name="farms"
        render={(arrayHelpers) => (
          <div>
            {values.farms && values.farms.length > 0 ? (
              values.farms.map((_farm, index) => (
                <Box key={index} mt={index !== 0 ? 6 : 0}>
                  <CoreGrid>
                    <TextInputField
                      name={`farms[${index}].fieldName`}
                      label="Field Name (similar on field map)"
                      fast={true}
                    />
                    <NumberInputField name={`farms[${index}].acres`} label="Acres" fast={true} />
                    <TextInputField
                      name={`farms[${index}].mainCrop`}
                      label="Main crop"
                      fast={true}
                    />
                    <TextInputField
                      name={`farms[${index}].intercrops`}
                      label="Intercrops"
                      fast={true}
                    />
                    <NumberInputField
                      name={`farms[${index}].numberOfCoffeTrees`}
                      label="No of coffee trees"
                      fast={true}
                    />
                    <NumberInputField
                      name={`farms[${index}].yeildEstimate`}
                      label="Yield estimate (kg) Coffee cherry"
                      fast={true}
                    />
                    <NumberInputField
                      name={`farms[${index}].areaUnderCoffee`}
                      label="Area under coffee (acre)"
                      fast={true}
                    />
                    <RadioGroupInputField
                      name={`farms[${index}].isCoffeeTreeWellMaintained`}
                      label="Coffee trees Well Maintained"
                    />
                    <RadioGroupInputField
                      name={`farms[${index}].pruining`}
                      label="Pruning"
                      options={GFP_OPTIONS}
                    />
                    <NumberInputField
                      name={`farms[${index}].numberOfPruinedCoffeeTrees`}
                      label="Number of pruned coffee trees"
                      fast={true}
                    />
                    <RadioGroupInputField
                      name={`farms[${index}].stumping`}
                      label="Stumping"
                      options={GFP_OPTIONS}
                    />
                    <NumberInputField
                      name={`farms[${index}].numberOfStumpedTree`}
                      label="Number of Stumped trees"
                      fast={true}
                    />
                    <RadioGroupInputField
                      name={`farms[${index}].plantingNewCoffeeSeedings`}
                      label="Farmer Planting New Coffee Seedlings"
                    />
                    <DateTime
                      name={`farms[${index}].lastUseOfNonAllowedChemicals`}
                      label="Date of last use of non-allowed chemicals"
                      format="dd-MM-yyyy"
                      defaultBlank={true}
                    />
                    <RadioGroupInputField
                      name={`farms[${index}].interPlotBufferZones`}
                      label="Inter-plot buffer Zones"
                    />
                    <SelectInputField
                      name={`farms[${index}].fieldSeparation`}
                      label="Field separation"
                      options={FIELD_SEPRATION_OPTIONS}
                    />
                    <RadioGroupInputField
                      name={`farms[${index}].multipleOwnerWithOrganic`}
                      label="In case of organic holding in field with multiple owners and no clear borders, all owners are organic."
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
                Add a farm
              </Button>
            )}
          </div>
        )}
      />
    </LotShowPanel>
  );
}
