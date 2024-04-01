import useFarmerMemberFilter from "@components/pages/farmer-member/common/use-farmer-member-filter";
import { DOUCMENT_FILTER_KEY } from "@static/document";
import React from "react";

import NumberFilter from "../shared/numberField";

export default function LandAcreageFilter() {
  return <NumberFilter filterField={{ fieldId: "landAcreage", minMax: [1, 50] }} />;
}
