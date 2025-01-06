import { Box, Flex, IconButton, Image, SimpleGrid, Text } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import DeleteIcon from "@icons/delete";
import { RESOURCE_SIZE } from "@static/constants";
import { getResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React from "react";

import useManageMediaGallery from "../media-gallery-upload-provider";

export default function DocumentPreview() {
  const { mediaGalleryAssets, removeMediaGalleryAsset } = useManageMediaGallery();

  const handleDelete = (index) => {
    removeMediaGalleryAsset(index);
  };

  const { user } = useGlobalState();

  const getImageThumb = (resourceURL) => {
    return getResourceThumbnail(
      RESOURCE_CTX.MY_UPLOADS,
      user?.id + resourceURL,
      RESOURCE_SIZE.DEFAULT
    );
  };

  return mediaGalleryAssets && mediaGalleryAssets.length > 0 ? (
    <SimpleGrid columns={[1, 2, 2, 3]} gap={4}>
      {mediaGalleryAssets.map((selectedMediaGallery, index) => (
        <Box key={index} borderWidth="1px" borderRadius="md" overflow="hidden" position="relative">
          <Flex alignItems="center" justifyContent="space-between" p={2}>
            <Text fontSize="sm" fontWeight="bold" flex="1">
              {selectedMediaGallery?.path?.replace(/^.*[\\\/]/, "")}
            </Text>
            <IconButton
              variant="ghost"
              colorPalette="red"
              size="sm"
              onClick={() => handleDelete(index)}
              aria-label={""}
            >
              <DeleteIcon />
            </IconButton>
          </Flex>
          <Image
            objectFit="cover"
            borderRadius="md"
            // fallbackSrc={selectedMediaGallery?.path?.replace(/^.*[\\\/]/, "")}
            src={getImageThumb(selectedMediaGallery.path)}
            width={"100%"}
            height={"300px"}
          />
        </Box>
      ))}
    </SimpleGrid>
  ) : null;
}
