import { AddIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import TextInputField from "@components/@core/formik/text";
import LotShowPanel from "@components/pages/lot/show/panel";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import DeleteIcon from "src/icons/delete";

import GridRow from "../../../row";
import { YPN_OPTIONS } from "../options";
import { ADVICES_PANEL } from "./data";

export default function Advices({ previousAdvices }) {
  const { values }: any = useFormikContext();
  console.debug(previousAdvices);

  return (
    <LotShowPanel title={ADVICES_PANEL.title} icon={ADVICES_PANEL.icon} isOpen={true}>
      <GridRow
        label={ADVICES_PANEL.keys.hasFarmerImplementedPreviousAdvice}
        name="hasFarmerImplementedPreviousAdvice"
        field={RadioGroupInputField}
        options={YPN_OPTIONS}
      />
      <FieldArray
        name="advices"
        render={(arrayHelpers) => (
          <div>
            {values.advices && values.advices.length > 0 ? (
              values.advices.map((_farm, index) => (
                <Box key={index} mt={index !== 0 ? 6 : 0}>
                  <TextInputField name={`advices[${index}].advice`} label="Advice" fast={true} />
                  <Button
                    colorScheme="red"
                    type="button"
                    leftIcon={<DeleteIcon />}
                    mr={4}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    Remove Current
                  </Button>
                  <Button
                    colorScheme="blue"
                    type="button"
                    leftIcon={<AddIcon />}
                    onClick={() => arrayHelpers.insert(index + 1, "")}
                  >
                    Add Below
                  </Button>
                </Box>
              ))
            ) : (
              <Button
                colorScheme="blue"
                type="button"
                onClick={() => arrayHelpers.push("")}
                leftIcon={<AddIcon />}
              >
                Add a advice
              </Button>
            )}
          </div>
        )}
      />
    </LotShowPanel>
  );
}
