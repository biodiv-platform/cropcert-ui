import { FormControl, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";

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
  const [tabIndex, setTabIndex] = useState(0);
  const { mediaGalleryAssets } = useManageMediaGallery();

  const { field, fieldState } = useController({ name });

  useEffect(() => {
    mediaGalleryAssets?.length && field.onChange(mediaGalleryAssets);
  }, []);

  useEffect(() => {
    onTabIndexChanged && onTabIndexChanged(tabIndex);
  }, [tabIndex]);

  useDidUpdateEffect(() => {
    field.onChange(mediaGalleryAssets);
  }, [mediaGalleryAssets]);

  const onSelectionDone = () => setTabIndex(0);

  return (
    <FormControl hidden={hidden} isInvalid={!!fieldState.error} mb={mb}>
      <Tabs
        className="nospace"
        index={tabIndex}
        onChange={setTabIndex}
        variant="soft-rounded"
        isLazy={true}
      >
        <TabList mb={4} overflowX="auto" py={1}>
          <Tab>✔️ {t("Selected Media")}</Tab>
          <Tab>☁️ {t("My Uploads")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MediaGalleryDropzone isMultiUpload={isMultiUpload} />
          </TabPanel>
          <TabPanel>
            <MyMediaGalleryUploads onDone={onSelectionDone} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormControl>
  );
}
