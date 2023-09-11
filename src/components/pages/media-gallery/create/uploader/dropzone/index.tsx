import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

import useManageMediaGallery from "../media-gallery-upload-provider";
import DropTarget from "../my-uploads/drop-target";
import ResourceCard from "../my-uploads/resource-card";

export default function MediaGalleryDropzone({ isMultiUpload }) {
  const { mediaGalleryAssets } = useManageMediaGallery();

  return (
    <>
      <SimpleGrid borderRadius="lg" columns={[1, 3, 4, 5]} spacing={4}>
        {mediaGalleryAssets?.map((r, index) => (
          <ResourceCard resource={r} key={r.hashKey} index={index} isMultiUpload={isMultiUpload} />
        ))}
        <DropTarget assetsSize={mediaGalleryAssets?.length} />
      </SimpleGrid>
    </>
  );
}
