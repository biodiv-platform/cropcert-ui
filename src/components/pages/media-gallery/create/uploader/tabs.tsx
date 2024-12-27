import { Tabs } from "@chakra-ui/react";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";

import { Field } from "@/components/ui/field";

import MediaGalleryDropzone from "./dropzone";
import useManageMediaGallery from "./media-gallery-upload-provider";
import MyMediaGalleryUploads from "./my-uploads";

export interface IDropzoneProps {
  name: string;
  mb?: number;
  isMultiUpload?: boolean;
  children?;
  hidden?;
  onTabIndexChanged?;
}
export default function MediaGalleryUploaderTabs({
  name,
  mb = 4,
  hidden,
  onTabIndexChanged,
  isMultiUpload,
}: IDropzoneProps) {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState("selectedMedia");
  const { mediaGalleryAssets } = useManageMediaGallery();

  const { field, fieldState } = useController({ name });

  useEffect(() => {
    mediaGalleryAssets?.length && field.onChange(mediaGalleryAssets);
  }, []);

  useEffect(() => {
    onTabIndexChanged && onTabIndexChanged(tabValue);
  }, [tabValue]);

  useDidUpdateEffect(() => {
    field.onChange(mediaGalleryAssets);
  }, [mediaGalleryAssets]);

  const onSelectionDone = () => setTabValue("selectedMedia");

  return (
    <Field hidden={hidden} invalid={!!fieldState.error} mb={mb}>
      <Tabs.Root
        className="nospace"
        value={tabValue}
        onValueChange={(e) => setTabValue(e.value)}
        // variant="soft-rounded"
        lazyMount
      >
        <Tabs.List mb={4} overflowX="auto" py={1}>
          <Tabs.Trigger value="selectedMedia">✔️ {t("Selected Media")}</Tabs.Trigger>
          <Tabs.Trigger value="myUploads">☁️ {t("My Uploads")}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="selectedMedia">
          <MediaGalleryDropzone isMultiUpload={isMultiUpload} />
        </Tabs.Content>
        <Tabs.Content value="myUploads">
          <MyMediaGalleryUploads onDone={onSelectionDone} />
        </Tabs.Content>
      </Tabs.Root>
    </Field>
  );
}
