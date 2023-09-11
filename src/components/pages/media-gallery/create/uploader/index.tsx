import React from "react";
import { useFormContext } from "react-hook-form";

import { ManageMediaGalleryProvider } from "./media-gallery-upload-provider";
import MediaGalleryUploaderTabs, { IDropzoneProps } from "./tabs";

interface MediaGalleryUploaderProps extends IDropzoneProps {
  licensesList;
}

const MediaGalleryUploader = (props: MediaGalleryUploaderProps) => {
  const form = useFormContext();

  return (
    <ManageMediaGalleryProvider
      licensesList={props.licensesList}
      mediaGalleryAssets={form.control._defaultValues[props.name]}
    >
      <MediaGalleryUploaderTabs {...props} />
    </ManageMediaGalleryProvider>
  );
};

export default MediaGalleryUploader;
