import useFarmerMemberFilter from "@components/pages/farmer-member/common/use-farmer-member-filter";
import { DOUCMENT_FILTER_KEY } from "@static/document";
import React from "react";

import NumberFilter from "../shared/numberField";

export default function NoOfCoffeeTreesFilter() {
  return <NumberFilter filterField={{ fieldId: "noOfCoffeeTrees", minMax: [1, 500] }} />;
}
