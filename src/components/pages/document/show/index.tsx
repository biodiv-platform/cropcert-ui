import { Box, SimpleGrid } from "@chakra-ui/react";
import Container from "@components/@core/container";
import Activity from "@components/pages/observation/show/activity";
import styled from "@emotion/styled";
import { ShowDocument } from "@interfaces/document";
import { axAddDocumentComment } from "@services/activity.service";
import { RESOURCE_TYPE } from "@static/constants";
import { getDocumentPath } from "@utils/media";
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

  return (
    <Container my={6}>
      <DocumentHeader document={document} />
      <SimpleGrid columns={[1, 1, 3, 3]} spacing={[1, 1, 4, 4]}>
        <Box gridColumn="1/3">
          {documentPath && (
            <DocumentIframe className="fadeInUp delay-2" src={getDocumentPath(documentPath)} />
          )}
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
