import User from "@components/pages/observation/show/sidebar/user";
import { ShowDocument } from "@interfaces/document";
import React from "react";

import DownloadButtons from "./download-buttons";
import DocumentSidebarMap from "./map";
import ScientificNames from "./scientific-names";
import SpatialCoverage from "./special-coverage";

interface SidebarProps {
  showDocument: ShowDocument;
  documentPath?;
}

export default function Sidebar({ showDocument, documentPath }: SidebarProps) {
  return (
    <div>
      <User user={showDocument.userIbp} />
      <DownloadButtons
        documentPath={documentPath}
        title={showDocument?.document?.title}
        documentId={showDocument?.document?.id}
      />
      <DocumentSidebarMap documentCoverages={showDocument.documentCoverages} />
      <SpatialCoverage documentCoverage={showDocument.documentCoverages} />
      <ScientificNames
        documentId={showDocument.document?.id}
        authorId={showDocument.document?.authorId}
      />
    </div>
  );
}
