import { Box, Checkbox, Image, Link } from "@chakra-ui/react";
import ShadowedUser from "@components/pages/common/shadowed-user";
import { ResourceListMinimalData } from "@interfaces/media";
import { RESOURCE_SIZE } from "@static/constants";
import { getResourceThumbnail } from "@utils/media";
import React, { useState } from "react";

export interface ResourceMinList {
  o: ResourceListMinimalData;
  canEdit: boolean;

  getCheckboxProps?: (props?: any | undefined) => {
    [x: string]: any;
  };
}

export default function GridViewCard({ o, getCheckboxProps, canEdit }: ResourceMinList) {
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
        <Link>
          <Image
            objectFit="cover"
            bg="gray.100"
            w="full"
            h="full"
            borderTopRadius="md"
            src={getResourceThumbnail("RESOURCE", o.resource?.fileName, RESOURCE_SIZE.DEFAULT)}
            alt={o.resourceId?.toString()}
          />
        </Link>

        {isHovered && <ShadowedUser user={o?.userIbp} />}
      </Box>
    </Box>
  );
}
