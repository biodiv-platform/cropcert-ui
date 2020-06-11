import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  SimpleGrid,
} from "@chakra-ui/core";
import { DateTime } from "@components/@core/formik";
import NumberInputField from "@components/@core/formik/number";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import SelectInputField from "@components/@core/formik/select";
import TextInputField from "@components/@core/formik/text";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import { FieldArray } from "formik";
import React from "react";

import GridRow from "../../row";
import { FIELD_SEPRATION_OPTIONS, GFP_OPTIONS } from "../options";

export default function Farm({ values }) {
  return (
    <LotShowPanel title="Farm (all coffee plots)" icon="🌄" isOpen={true} noPadding={true}>
      <FieldArray
        name="farms"
        render={(arrayHelpers) => (
          <>
            <Accordion allowToggle={true}>
              {values.farms.map((_farm, index) => (
                <AccordionItem>
                  <AccordionHeader>
                    <Box flex="1" textAlign="left">
                      🚜 Farm #{index + 1}
                    </Box>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel pb={4}>
                    <SimpleGrid columns={2} spacing={2} mb={4}>
                      <CoreGrid
                        rows={2}
                        alignItems="flex-end"
                        border="1px dashed"
                        borderColor="gray.300"
                        p={4}
                        borderRadius="md"
                      >
                        <TextInputField
                          name={`farms[${index}].fieldName`}
                          label="Field Name (similar on field map)"
                          fast={true}
                        />
                        <NumberInputField
                          name={`farms[${index}].acres`}
                          label="Acres"
                          fast={true}
                        />
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
                        <SelectInputField
                          name={`farms[${index}].fieldSeparation`}
                          label="Field separation"
                          options={FIELD_SEPRATION_OPTIONS}
                        />
                        <Box gridColumn="1/3">
                          <RadioGroupInputField
                            name={`farms[${index}].multipleOwnerWithOrganic`}
                            label="In case of organic holding in field with multiple owners and no clear borders, all owners are organic."
                            mb={0}
                          />
                        </Box>
                      </CoreGrid>
                      <Box border="1px dashed" borderColor="gray.300" p={4} borderRadius="md">
                        <CoreGrid rows={2} alignItems="flex-end">
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
                            label="Planting New Coffee Seedlings"
                          />
                          <DateTime
                            name={`farms[${index}].lastUseOfNonAllowedChemicals`}
                            label="Last use of non-allowed chemicals"
                            format="dd-MM-yyyy"
                            defaultBlank={true}
                          />
                          <RadioGroupInputField
                            name={`farms[${index}].interPlotBufferZones`}
                            label="Inter-plot buffer Zones"
                          />
                        </CoreGrid>
                      </Box>
                    </SimpleGrid>
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
                      Add Farm Below
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Button
              variantColor="blue"
              type="button"
              m={4}
              mb={0}
              onClick={() => arrayHelpers.push({})}
              leftIcon="add"
            >
              Add a farm
            </Button>
          </>
        )}
      />
      <Box p={4}>
        <PageHeading size="md">📑 Summery</PageHeading>
        <GridRow label="No Coffee Fields">
          <NumberInputField name="numberOfCoffeeFields" fast={true} />
        </GridRow>
        <GridRow label="Total Area of Coffee">
          <NumberInputField name="areaUnderCoffee" fast={true} />
        </GridRow>
        <GridRow label="Productive Trees">
          <NumberInputField name="productiveTrees" fast={true} />
        </GridRow>
        <GridRow label="Total Area of Farm">
          <NumberInputField name="totalAreaOfFarm" fast={true} />
        </GridRow>
        <GridRow label="Farmers know to Harvest Ripe Cherries">
          <RadioGroupInputField name="knownToHarvestRipeCherries" />
        </GridRow>
        <GridRow label="Farmer Practices Post Harvest Handling">
          <RadioGroupInputField name="practicesPostHarvestHandlling" />
        </GridRow>
      </Box>
    </LotShowPanel>
  );
}
