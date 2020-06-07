import { Accordion } from "@chakra-ui/core";
import RadioGroupInputField from "@components/@core/formik/radio-group";
import NumberInputField from "@components/@core/formik/number";
import { CoreGrid } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import React from "react";

export default function Summery() {
  return (
    <LotShowPanel title="Summery" icon="📑" isOpen={true}>
      <CoreGrid>
        <NumberInputField name="numberOfCoffeeFields" label="No Coffee Fields" fast={true} />
        <NumberInputField name="areaUnderCoffee" label="Total Area of Coffee" fast={true} />
        <NumberInputField name="productiveTrees" label="Productive Trees" fast={true} />
        <NumberInputField name="totalAreaOfFarm" label="Total Area of Farm" fast={true} />
        <RadioGroupInputField
          name="knownToHarvestRipeCherries"
          label="Farmers know to Harvest Ripe Cherries"
        />
        <RadioGroupInputField
          name="practicesPostHarvestHandlling"
          label="Farmer Practices Post Harvest Handling"
        />
      </CoreGrid>
    </LotShowPanel>
  );
}
