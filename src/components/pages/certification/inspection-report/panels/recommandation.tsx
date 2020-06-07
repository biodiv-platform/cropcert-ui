import { Box, Button } from "@chakra-ui/core";
import { DateTime } from "@components/@core/formik";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import TextInputField from "@components/@core/formik/text";
import { CoreGrid } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import { FieldArray } from "formik";
import React from "react";

import { YPN_OPTIONS } from "../options";

export default function Recommendation({ values }) {
  return (
    <LotShowPanel title="Recommandation" icon="💡" isOpen={true}>
      <CoreGrid>
        <RadioGroupInputField
          name="hasFarmerImplementedPreviousAdvice"
          label="Has Farmer Implemented Previous Advice"
          options={YPN_OPTIONS}
        />
      </CoreGrid>
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
      <CoreGrid rows={2} mt={4}>
        <DateTime
          name="violationDate"
          label="If Farmer has made serious Violation, date when Violation report was sent to project Supervisor"
          format="dd-MM-yyyy"
          defaultBlank={true}
        />
        <RadioGroupInputField
          name="isRecommendedOrganicCertificatation"
          label="Recommended Organic certification"
        />
      </CoreGrid>
    </LotShowPanel>
  );
}
