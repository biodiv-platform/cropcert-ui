// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Box, Tabs } from "@chakra-ui/react";
import { useIsMount } from "@hooks/use-is-mount";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import useManageDocument from "./document-upload-provider";
import DocumentDropzone from "./dropzone";
import MyDocumentUploads from "./my-uploads";

export default function DocumentUploaderTabs({ onChange }) {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState("selectedDocument");
  const { selectedDocument } = useManageDocument();
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      setTabIndex("selectedDocument");
      onChange(selectedDocument);
    }
  }, [selectedDocument]);

  return (
    <Box width={"full"}>
      <Tabs.Root
        className="nospace"
        defaultValue={tabIndex}
        // onValueChange={setTabIndex}
        // variant="outline"
        lazyMount={true}
      >
        <Tabs.List mb={4} overflowX="auto" py={1}>
          <Tabs.Trigger value="selectedDocument">✔️ {t("document:upload.selected")}</Tabs.Trigger>
          <Tabs.Trigger value="draftmedia">☁️ {t("document:upload.my_uploads")}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="selectedDocument">
          <DocumentDropzone />
        </Tabs.Content>
        <Tabs.Content value="draftmedia">
          <MyDocumentUploads />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
