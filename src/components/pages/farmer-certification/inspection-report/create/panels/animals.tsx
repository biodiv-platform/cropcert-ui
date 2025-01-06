import { AddIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { NumberInputField } from "@components/form/number";
import { RadioInputField } from "@components/form/radio";
import { SelectInputField } from "@components/form/select";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";
import { useFieldArray } from "react-hook-form";
import DeleteIcon from "src/icons/delete";

import GridRow from "../../../row";
import { ANIMAL_HUSBANDARY_OPTIONS, ANIMAL_TYPE_OPTIONS } from "../options";
import { ANIMALS_PANEL } from "./data";

export default function Animals() {
  const animals = useFieldArray({ name: "animals" });

  return (
    <LotShowPanel title={ANIMALS_PANEL.title} icon={ANIMALS_PANEL.icon} isOpen={true}>
      <GridRow
        label={ANIMALS_PANEL.keys.general.hasLiveStock}
        field={RadioInputField}
        name="hasLiveStock"
      />

      <GridRow
        label={ANIMALS_PANEL.keys.general.chemicalTreatmentOnLivestock}
        bgGray={true}
        field={RadioInputField}
        name="chemicalTreatmentOnLivestock"
      />

      <GridRow
        label={ANIMALS_PANEL.keys.general.livestockTreatmentConducted5mFromCoffee}
        mb={4}
        field={RadioInputField}
        name="livestockTreatmentConducted5mFromCoffee"
      />

      <div>
        {animals.fields.length > 0 ? (
          animals.fields.map((field, index) => (
            <Box key={field.id} mt={index !== 0 ? 6 : 0}>
              <CoreGrid>
                <SelectInputField
                  name={`animals.${index}.type`}
                  label={ANIMALS_PANEL.keys.animals.type}
                  options={ANIMAL_TYPE_OPTIONS}
                />
                <NumberInputField
                  name={`animals.${index}.number`}
                  label={ANIMALS_PANEL.keys.animals.number}
                />
                <SelectInputField
                  name={`animals.${index}.husbandryType`}
                  label={ANIMALS_PANEL.keys.animals.husbandryType}
                  options={ANIMAL_HUSBANDARY_OPTIONS}
                />
                <RadioInputField
                  name={`animals.${index}.medication`}
                  label={ANIMALS_PANEL.keys.animals.medication}
                />
              </CoreGrid>

              <Button
                colorPalette="red"
                type="button"
                leftIcon={<DeleteIcon />}
                mr={4}
                onClick={() => animals.remove(index)}
              >
                Remove Current
              </Button>
              <Button
                colorPalette="blue"
                type="button"
                leftIcon={<AddIcon />}
                onClick={() => animals.insert(index + 1, {})}
              >
                Add Below
              </Button>
            </Box>
          ))
        ) : (
          <Button
            colorPalette="blue"
            type="button"
            onClick={() => animals.append({})}
            leftIcon={<AddIcon />}
          >
            Add a animal
          </Button>
        )}
      </div>
    </LotShowPanel>
  );
}
