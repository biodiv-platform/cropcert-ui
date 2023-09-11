import { Box } from "@chakra-ui/react";
import useMediaGalleryFilter from "@components/pages/media-gallery/common/use-media-gallery-filter";
import { getByPath } from "@utils/basic";
import { toHumanString } from "human-readable-numbers";
import React from "react";

export default function FilterStat({ statKey, subStatKey }) {
  const {
    mediaGalleryData: { ag },
  } = useMediaGalleryFilter();

  const path = statKey ? [statKey, subStatKey].join(".") : subStatKey;
  const count = getByPath(ag, path);

  return (
    <Box color="gray.500" as="span" title={count}>
      {` - ${toHumanString(count || 0)}`}
    </Box>
  );
}
