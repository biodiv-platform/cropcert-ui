import { Box, Button } from "@chakra-ui/core";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import TextInputField from "@components/@core/formik/text";
import LotShowPanel from "@components/pages/lot/show/panel";
import { FieldArray, useFormikContext } from "formik";
import React from "react";

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
                    onClick={() => arrayHelpers.insert(index + 1, "")}
                  >
                    Add Below
                  </Button>
                </Box>
              ))
            ) : (
              <Button
                variantColor="blue"
                type="button"
                onClick={() => arrayHelpers.push("")}
                leftIcon="add"
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
