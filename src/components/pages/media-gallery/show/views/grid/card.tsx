import { Box, Image } from "@chakra-ui/react";
import CaptionOverlay from "@components/pages/common/caption-overlay";
import { MediaGalleryListMinimalData } from "@interfaces/media";
import { RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail } from "@utils/media";
import React, { useState } from "react";

export interface MediaGalleryMinList {
  o: MediaGalleryListMinimalData;
  canEdit: boolean;

  getCheckboxProps?: (props?: any | undefined) => {
    [x: string]: any;
  };
}

export default function GridViewCard({ o }: MediaGalleryMinList) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      className="hover-box fade"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box w="full" position="relative" h="16rem">
        <Image
          objectFit="cover"
          bg="gray.100"
          w="full"
          h="full"
          borderTopRadius="md"
          src={getNextResourceThumbnail(o.resource?.id, RESOURCE_SIZE.DEFAULT)}
          alt={o.mediaGalleryId?.toString()}
        />
        {isHovered && <CaptionOverlay caption={o.resource?.description} />}
      </Box>
    </Box>
  );
}
