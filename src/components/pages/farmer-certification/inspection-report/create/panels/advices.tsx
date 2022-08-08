import { AddIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { RadioInputField } from "@components/form/radio";
import { TextBoxField } from "@components/form/text";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";
import { useFieldArray } from "react-hook-form";
import DeleteIcon from "src/icons/delete";

import GridRow from "../../../row";
import { YPN_OPTIONS } from "../options";
import { ADVICES_PANEL } from "./data";

export default function Advices({ previousAdvices }) {
  console.debug(previousAdvices);
  const advices = useFieldArray({ name: "advices" });

  return (
    <LotShowPanel title={ADVICES_PANEL.title} icon={ADVICES_PANEL.icon} isOpen={true}>
      <GridRow
        label={ADVICES_PANEL.keys.hasFarmerImplementedPreviousAdvice}
        name="hasFarmerImplementedPreviousAdvice"
        field={RadioInputField}
        options={YPN_OPTIONS}
      />
      <div>
        {advices.fields?.length ? (
          advices.fields.map((field, index) => (
            <Box key={field.id} mt={index !== 0 ? 6 : 0}>
              <TextBoxField name={`advices.${index}.advice`} label="Advice" />
              <Button
                colorScheme="red"
                type="button"
                leftIcon={<DeleteIcon />}
                mr={4}
                onClick={() => advices.remove(index)}
              >
                Remove Current
              </Button>
              <Button
                colorScheme="blue"
                type="button"
                leftIcon={<AddIcon />}
                onClick={() => advices.insert(index + 1, "")}
              >
                Add Below
              </Button>
            </Box>
          ))
        ) : (
          <Button
            colorScheme="blue"
            type="button"
            onClick={() => advices.append("")}
            leftIcon={<AddIcon />}
          >
            Add a advice
          </Button>
        )}
      </div>
    </LotShowPanel>
  );
}
