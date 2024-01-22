import { Box, Checkbox, Image, Link } from "@chakra-ui/react";
import CaptionOverlay from "@components/pages/common/caption-overlay";
import { ResourceListMinimalData } from "@interfaces/media";
import { RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail } from "@utils/media";
import React, { useState } from "react";

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
            position="absolute"
            bg="white"
            m={2}
            {...getCheckboxProps({ value: String(o.resource?.id) })}
          />
        )}
        <Link onClick={() => setSelectedImageIndex(index)}>
          <Image
            objectFit="cover"
            bg="gray.100"
            w="full"
            h="full"
            borderTopRadius="md"
            src={getNextResourceThumbnail(o.resource?.id, RESOURCE_SIZE.DEFAULT)}
            alt={o.resourceId?.toString()}
          />
        </Link>

        {isHovered && <CaptionOverlay caption={o.resource?.description} />}
      </Box>
    </Box>
  );
}
