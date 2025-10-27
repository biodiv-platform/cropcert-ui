import { Box, SimpleGrid } from "@chakra-ui/react";
import Container from "@components/@core/container";
import Activity from "@components/pages/observation/show/activity";
import styled from "@emotion/styled";
import { ShowDocument } from "@interfaces/document";
import { axAddDocumentComment } from "@services/activity.service";
import { RESOURCE_TYPE } from "@static/constants";
import { ACCEPTED_MIME_TYPE } from "@static/document";
import { getDocumentFilePath, getDocumentPath } from "@utils/media";
import React from "react";

import DocumentHeader from "./header";
import DocumentInfo from "./info";
import Sidebar from "./sidebar";

const DocumentIframe = styled.iframe`
  background: #3b3b3b;
  border-radius: 0.25rem;
  width: 100%;
  height: 522px;
  grid-column: 1/3;
  margin-bottom: 1rem;
`;

interface DocumentShowProps {
  document: ShowDocument;
}

export default function DocumentShowComponent({ document }: DocumentShowProps) {
  const documentPath = document?.uFile?.path || document?.document?.externalUrl;

  const getDocumentType = (mimeType) => {
    if (mimeType?.includes(ACCEPTED_MIME_TYPE.VIDEO)) {
      return ACCEPTED_MIME_TYPE.VIDEO;
    }
    if (mimeType?.includes(ACCEPTED_MIME_TYPE.PDF) || document?.document?.externalUrl) {
      return ACCEPTED_MIME_TYPE.PDF;
    }
    return undefined;
  };

  const renderDocument = (fileExtension: string | undefined) => {
    switch (fileExtension) {
      case ACCEPTED_MIME_TYPE.VIDEO:
        return (
          <Box>
            <video width="100%" controls>
              <source src={getDocumentFilePath(documentPath || "")} />
            </video>
          </Box>
        );
      case ACCEPTED_MIME_TYPE.PDF:
        return (
          <DocumentIframe className="fadeInUp delay-2" src={getDocumentPath(documentPath || "")} />
        );
    }
  };

  return (
    <Container my={6}>
      <DocumentHeader document={document} />
      <SimpleGrid columns={[1, 1, 3, 3]} gap={[1, 1, 4, 4]}>
        <Box gridColumn="1/3">
          {renderDocument(getDocumentType(document?.uFile?.mimeType))}

          <DocumentInfo d={document} />

          <Activity
            resourceId={document?.document?.id}
            resourceType={RESOURCE_TYPE.DOCUMENT}
            commentFunc={axAddDocumentComment}
          />
        </Box>
        <Sidebar showDocument={document} documentPath={documentPath} />
      </SimpleGrid>
    </Container>
  );
}
