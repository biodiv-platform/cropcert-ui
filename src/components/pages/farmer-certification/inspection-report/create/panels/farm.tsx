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
import useDebouncedState from "@hooks/use-debounced-effect";
import { FieldArray, useFormikContext } from "formik";
import React, { useEffect } from "react";

import GridRow from "../../../row";
import { FIELD_SEPRATION_OPTIONS, GFP_OPTIONS } from "../options";
import { FARM_PANEL } from "./data";

export default function Farm() {
  const { values, setFieldValue }: any = useFormikContext();
  const farmsDebounced = useDebouncedState(values.farms, 1000);

  useEffect(() => {
    const fs = farmsDebounced.reduce(
      (acc, f) => {
        acc["areaUnderCoffee"] += Number(f?.areaUnderCoffee || 0);
        acc["productiveTrees"] += Number(f?.numberOfCoffeTrees || 0);
        acc["totalAreaOfFarm"] += Number(f?.acres || 0);
        return acc;
      },
      { areaUnderCoffee: 0, productiveTrees: 0, totalAreaOfFarm: 0 }
    );

    setFieldValue("numberOfCoffeeFields", farmsDebounced.length);
    setFieldValue("areaUnderCoffee", fs.areaUnderCoffee);
    setFieldValue("productiveTrees", fs.productiveTrees);
    setFieldValue("totalAreaOfFarm", fs.totalAreaOfFarm);
  }, [farmsDebounced]);

  return (
    <LotShowPanel title={FARM_PANEL.title} icon={FARM_PANEL.icon} isOpen={true} noPadding={true}>
      <FieldArray
        name="farms"
        render={(arrayHelpers) => (
          <>
            <Accordion allowToggle={true}>
              {values.farms.map((_farm, index) => (
                <AccordionItem key={index}>
                  <AccordionHeader>
                    <Box flex="1" textAlign="left">
                      🚜 Plot #{index + 1}
                    </Box>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel pb={4}>
                    <SimpleGrid columns={2} spacing={2} mb={4}>
                      <CoreGrid
                        rows={2}
                        alignItems="flex-end"
                        border="1px solid"
                        borderColor="gray.500"
                        p={4}
                        borderRadius="md"
                      >
                        <TextInputField
                          name={`farms[${index}].fieldName`}
                          label={FARM_PANEL.keys.fieldName}
                          fast={true}
                        />
                        <NumberInputField
                          name={`farms[${index}].acres`}
                          label={FARM_PANEL.keys.acres}
                          fast={true}
                        />
                        <TextInputField
                          name={`farms[${index}].mainCrop`}
                          label={FARM_PANEL.keys.mainCrop}
                          fast={true}
                        />
                        <TextInputField
                          name={`farms[${index}].intercrops`}
                          label={FARM_PANEL.keys.intercrops}
                          fast={true}
                        />
                        <NumberInputField
                          name={`farms[${index}].numberOfCoffeTrees`}
                          label={FARM_PANEL.keys.numberOfCoffeTrees}
                          fast={true}
                        />
                        <NumberInputField
                          name={`farms[${index}].yeildEstimate`}
                          label={FARM_PANEL.keys.yeildEstimate}
                          fast={true}
                        />
                        <NumberInputField
                          name={`farms[${index}].areaUnderCoffee`}
                          label={FARM_PANEL.keys.areaUnderCoffee}
                          fast={true}
                        />
                        <SelectInputField
                          name={`farms[${index}].fieldSeparation`}
                          label={FARM_PANEL.keys.fieldSeparation}
                          options={FIELD_SEPRATION_OPTIONS}
                        />
                        <Box gridColumn="1/3">
                          <RadioGroupInputField
                            name={`farms[${index}].multipleOwnerWithOrganic`}
                            label={FARM_PANEL.keys.multipleOwnerWithOrganic}
                            mb={0}
                          />
                        </Box>
                      </CoreGrid>
                      <Box border="1px solid" borderColor="gray.500" p={4} borderRadius="md">
                        <CoreGrid rows={2} alignItems="flex-end">
                          <NumberInputField
                            name={`farms[${index}].numberOfPruinedCoffeeTrees`}
                            label={FARM_PANEL.keys.numberOfPruinedCoffeeTrees}
                            fast={true}
                          />
                          <RadioGroupInputField
                            name={`farms[${index}].pruining`}
                            label={FARM_PANEL.keys.pruining}
                            options={GFP_OPTIONS}
                          />
                          <NumberInputField
                            name={`farms[${index}].numberOfStumpedTree`}
                            label={FARM_PANEL.keys.numberOfStumpedTree}
                            fast={true}
                          />
                          <RadioGroupInputField
                            name={`farms[${index}].stumping`}
                            label={FARM_PANEL.keys.stumping}
                            options={GFP_OPTIONS}
                          />
                          <RadioGroupInputField
                            name={`farms[${index}].isCoffeeTreeWellMaintained`}
                            label={FARM_PANEL.keys.isCoffeeTreeWellMaintained}
                          />
                          <RadioGroupInputField
                            name={`farms[${index}].interPlotBufferZones`}
                            label={FARM_PANEL.keys.interPlotBufferZones}
                          />
                          <DateTime
                            name={`farms[${index}].lastUseOfNonAllowedChemicals`}
                            label={FARM_PANEL.keys.lastUseOfNonAllowedChemicals}
                            format="dd-MM-yyyy"
                            defaultBlank={true}
                          />
                          <RadioGroupInputField
                            name={`farms[${index}].plantingNewCoffeeSeedings`}
                            label={FARM_PANEL.keys.plantingNewCoffeeSeedings}
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
                      Remove this Plot
                    </Button>
                    <Button
                      variantColor="blue"
                      type="button"
                      leftIcon="add"
                      onClick={() => arrayHelpers.insert(index, {})}
                    >
                      Add Plot Below
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
              Add a Plot
            </Button>
          </>
        )}
      />
      <Box p={4}>
        <PageHeading size="md">📑 Summery</PageHeading>
        <GridRow
          field={NumberInputField}
          name="numberOfCoffeeFields"
          label={FARM_PANEL.keys.summery.numberOfCoffeeFields}
          isReadOnly={true}
          fast={true}
        />
        <GridRow
          field={NumberInputField}
          name="areaUnderCoffee"
          label={FARM_PANEL.keys.summery.areaUnderCoffee}
          isReadOnly={true}
          fast={true}
        />
        <GridRow
          field={NumberInputField}
          name="productiveTrees"
          label={FARM_PANEL.keys.summery.productiveTrees}
          isReadOnly={true}
          fast={true}
        />
        <GridRow
          field={NumberInputField}
          name="totalAreaOfFarm"
          label={FARM_PANEL.keys.summery.totalAreaOfFarm}
          isReadOnly={true}
          fast={true}
        />
        <GridRow
          field={RadioGroupInputField}
          name="knownToHarvestRipeCherries"
          label={FARM_PANEL.keys.summery.knownToHarvestRipeCherries}
        />
        <GridRow
          field={RadioGroupInputField}
          name="practicesPostHarvestHandlling"
          label={FARM_PANEL.keys.summery.practicesPostHarvestHandlling}
        />
      </Box>
    </LotShowPanel>
  );
}
