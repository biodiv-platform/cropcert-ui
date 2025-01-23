import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { CoreGrid, PageHeading } from "@components/@core/layout";
import { DateTimeInputField } from "@components/form/datepicker";
import DisplayTextField from "@components/form/display";
import { NumberInputField } from "@components/form/number";
import { RadioInputField } from "@components/form/radio";
import { SelectInputField } from "@components/form/select";
import { TextBoxField } from "@components/form/text";
import LotShowPanel from "@components/pages/lot/show/panel";
import useDebouncedState from "@hooks/use-debounced-effect";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import DeleteIcon from "src/icons/delete";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

import GridRow from "../../../row";
import { FIELD_SEPRATION_OPTIONS, GFP_OPTIONS } from "../options";
import { FARM_PANEL } from "./data";

export default function Farm() {
  const hForm = useFormContext();

  const farms = useFieldArray({ name: "farms" });
  const farmsValues = useWatch({ name: "farms" });

  const farmsDebounced = useDebouncedState(farmsValues, 1000);

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

    hForm.setValue("numberOfCoffeeFields", farms.fields.length);
    hForm.setValue("areaUnderCoffee", fs.areaUnderCoffee);
    hForm.setValue("productiveTrees", fs.productiveTrees);
    hForm.setValue("totalAreaOfFarm", fs.totalAreaOfFarm);
  }, [farmsDebounced]);

  return (
    <LotShowPanel title={FARM_PANEL.title} icon={FARM_PANEL.icon} isOpen={true} noPadding={true}>
      <>
        <AccordionRoot multiple={true}>
          {farms.fields.map((field, index) => (
            <AccordionItem value={field.id + index} key={field.id + index}>
              <AccordionItemTrigger>
                <Box flex="1" textAlign="left">
                  🚜 Plot #{index + 1}
                </Box>
              </AccordionItemTrigger>
              <AccordionItemContent pb={4}>
                <SimpleGrid columns={{ md: 1, lg: 2 }} gap={2} mb={4}>
                  <CoreGrid
                    rows={2}
                    alignItems="flex-end"
                    border="1px solid"
                    borderColor="gray.500"
                    p={4}
                    borderRadius="md"
                  >
                    <TextBoxField
                      name={`farms.${index}.fieldName`}
                      label={FARM_PANEL.keys.fieldName}
                    />
                    <NumberInputField name={`farms.${index}.acres`} label={FARM_PANEL.keys.acres} />
                    <TextBoxField
                      name={`farms.${index}.mainCrop`}
                      label={FARM_PANEL.keys.mainCrop}
                    />
                    <TextBoxField
                      name={`farms.${index}.intercrops`}
                      label={FARM_PANEL.keys.intercrops}
                    />
                    <NumberInputField
                      name={`farms.${index}.numberOfCoffeTrees`}
                      label={FARM_PANEL.keys.numberOfCoffeTrees}
                    />
                    <NumberInputField
                      name={`farms.${index}.yeildEstimate`}
                      label={FARM_PANEL.keys.yeildEstimate}
                    />
                    <NumberInputField
                      name={`farms.${index}.areaUnderCoffee`}
                      label={FARM_PANEL.keys.areaUnderCoffee}
                    />
                    <SelectInputField
                      name={`farms.${index}.fieldSeparation`}
                      label={FARM_PANEL.keys.fieldSeparation}
                      options={FIELD_SEPRATION_OPTIONS}
                    />
                    <Box gridColumn="1/3">
                      <RadioInputField
                        name={`farms.${index}.multipleOwnerWithOrganic`}
                        label={FARM_PANEL.keys.multipleOwnerWithOrganic}
                        mb={0}
                      />
                    </Box>
                  </CoreGrid>
                  <Box border="1px solid" borderColor="gray.500" p={4} borderRadius="md">
                    <CoreGrid rows={2} alignItems="flex-end">
                      <NumberInputField
                        name={`farms.${index}.numberOfPruinedCoffeeTrees`}
                        label={FARM_PANEL.keys.numberOfPruinedCoffeeTrees}
                      />
                      <RadioInputField
                        name={`farms.${index}.pruining`}
                        label={FARM_PANEL.keys.pruining}
                        options={GFP_OPTIONS}
                      />
                      <NumberInputField
                        name={`farms.${index}.numberOfStumpedTree`}
                        label={FARM_PANEL.keys.numberOfStumpedTree}
                      />
                      <RadioInputField
                        name={`farms.${index}.stumping`}
                        label={FARM_PANEL.keys.stumping}
                        options={GFP_OPTIONS}
                      />
                      <RadioInputField
                        name={`farms.${index}.isCoffeeTreeWellMaintained`}
                        label={FARM_PANEL.keys.isCoffeeTreeWellMaintained}
                      />
                      <RadioInputField
                        name={`farms.${index}.interPlotBufferZones`}
                        label={FARM_PANEL.keys.interPlotBufferZones}
                      />
                      <DateTimeInputField
                        name={`farms.${index}.lastUseOfNonAllowedChemicals`}
                        label={FARM_PANEL.keys.lastUseOfNonAllowedChemicals}
                        format="dd-MM-yyyy"
                        defaultBlank={true}
                      />
                      <RadioInputField
                        name={`farms.${index}.plantingNewCoffeeSeedings`}
                        label={FARM_PANEL.keys.plantingNewCoffeeSeedings}
                      />
                    </CoreGrid>
                  </Box>
                </SimpleGrid>
                <Button colorPalette="red" type="button" mr={4} onClick={() => farms.remove(index)}>
                  <DeleteIcon />
                  Remove this Plot
                </Button>
                <Button
                  colorPalette="blue"
                  type="button"
                  onClick={() => farms.insert(index + 1, {})}
                >
                  <LuPlus />
                  Add Plot Below
                </Button>
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
        <Button colorPalette="blue" type="button" m={4} mb={0} onClick={() => farms.append({})}>
          <LuPlus />
          Add a Plot
        </Button>
      </>
      <Box p={4}>
        <PageHeading size="md">📑 Summary</PageHeading>
        <GridRow
          field={DisplayTextField}
          name="numberOfCoffeeFields"
          label={FARM_PANEL.keys.summery.numberOfCoffeeFields}
        />
        <GridRow
          field={DisplayTextField}
          name="areaUnderCoffee"
          label={FARM_PANEL.keys.summery.areaUnderCoffee}
        />
        <GridRow
          field={DisplayTextField}
          name="productiveTrees"
          label={FARM_PANEL.keys.summery.productiveTrees}
        />
        <GridRow
          field={DisplayTextField}
          name="totalAreaOfFarm"
          label={FARM_PANEL.keys.summery.totalAreaOfFarm}
        />
        <GridRow
          field={RadioInputField}
          name="knownToHarvestRipeCherries"
          label={FARM_PANEL.keys.summery.knownToHarvestRipeCherries}
        />
        <GridRow
          field={RadioInputField}
          name="practicesPostHarvestHandlling"
          label={FARM_PANEL.keys.summery.practicesPostHarvestHandlling}
        />
      </Box>
    </LotShowPanel>
  );
}
