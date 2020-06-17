import { Box, Button } from "@chakra-ui/core";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import TextInputField from "@components/@core/formik/text";
import LotShowPanel from "@components/pages/lot/show/panel";
import { FieldArray } from "formik";
import React from "react";

import GridRow from "../../../row";
import { YPN_OPTIONS } from "../options";

export default function Advices({ values }) {
  return (
    <LotShowPanel title="Advices" icon="💡" isOpen={true}>
      <GridRow label="Has Farmer Implemented Previous Advice">
        <RadioGroupInputField name="hasFarmerImplementedPreviousAdvice" options={YPN_OPTIONS} />
      </GridRow>
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
                    onClick={() => arrayHelpers.insert(index, "")}
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
