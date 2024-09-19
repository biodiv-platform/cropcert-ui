import { Box } from "@chakra-ui/react";
import { getByPath } from "@utils/basic";
import { toHumanString } from "human-readable-numbers";
import React from "react";

import useFarmerProduceFilter from "../../../use-farmer-produce-filter";


export default function FilterStat({ statKey, subStatKey }) {
  const {
    farmerProduceListAggregationData: { aggregationData },
  } = useFarmerProduceFilter();

  const path = statKey ? [statKey, subStatKey].join(".") : subStatKey;
  const count = getByPath(aggregationData, path);

  return (
    <Box color="gray.500" as="span" title={count}>
      {` - ${toHumanString(count || 0)}`}
    </Box>
  );
}
