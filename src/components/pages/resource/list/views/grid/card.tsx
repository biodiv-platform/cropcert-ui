import { Box, Image } from "@chakra-ui/react";
import CaptionOverlay from "@components/pages/common/caption-overlay";
import { ResourceListMinimalData } from "@interfaces/media";
import { RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail } from "@utils/media";
import React, { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
export interface ResourceMinList {
  o: ResourceListMinimalData;
  canEdit: boolean;
  index?: number;
  setSelectedImageIndex?: any;

  getCheckboxProps?: (props?: any | undefined) => {
    [x: string]: any;
  };
}

export default function GridViewCard({
  o,
  getCheckboxProps,
  canEdit,
  setSelectedImageIndex,
  index,
}: ResourceMinList) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      className="hover-box fade"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box w="full" position="relative" h="16rem">
        {canEdit && getCheckboxProps && (
          <Checkbox
            colorPalette={"blue"}
            position="absolute"
            bg="white"
            m={2}
            {...getCheckboxProps({ value: String(o.resource?.id) })}
          />
        )}
        <Image
          bg="gray.100"
          h="16rem"
          w="full"
          borderTopRadius="md"
          src={getNextResourceThumbnail(o.resource?.id, RESOURCE_SIZE.DEFAULT)}
          alt={o.resourceId?.toString()}
          onClick={() => setSelectedImageIndex(index)}
        />

        {isHovered && <CaptionOverlay caption={o.resource?.description} />}
      </Box>
    </Box>
  );
}
