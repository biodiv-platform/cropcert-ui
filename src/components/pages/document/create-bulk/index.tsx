import { Box } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import notification from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { DropTargetBox } from "../create/uploader/dropzone";
import UploadDragging from "../create/uploader/dropzone/upload-dragging";
import UploadInfo from "../create/uploader/dropzone/upload-info";
import UploadProcessing from "../create/uploader/dropzone/upload-processing";
import BibTable from "./bib-table";
import { parseBibFileList } from "./data";

export default function DocumentCreateBulkPageComponent({ documentTypes, licensesList }) {
  const { t } = useTranslation();

  const [documentListDraft, setDocumentListDraft] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setIsProcessing(true);

    const { parsedBibs, hasErrors } = await parseBibFileList(
      acceptedFiles[0],
      documentTypes,
      licensesList
    );
    setDocumentListDraft(parsedBibs);

    if (hasErrors) {
      notification(t("document:bib.schema.error"));
    }

    setIsProcessing(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container py={6}>
      <PageHeading mb={8}>📥 Import Documents from Bib</PageHeading>
      <Box mb={8} hidden={documentListDraft.length > 0}>
        <DropTargetBox {...getRootProps()} data-dropping={isDragActive}>
          <input {...getInputProps()} />
          {isProcessing ? <UploadProcessing /> : isDragActive ? <UploadDragging /> : <UploadInfo />}
        </DropTargetBox>
      </Box>

      {documentListDraft.length > 0 && (
        <BibTable
          items={documentListDraft}
          licensesList={licensesList}
          documentTypes={documentTypes}
        />
      )}
    </Container>
  );
}
