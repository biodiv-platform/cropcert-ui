import { Box, Image } from "@chakra-ui/react";
import { ENDPOINT } from "@static/constants";
import React from "react";

import FarmerProduceShowPanel from "./panel";

export default function GrnReceiptInfo({ farmerProduces }) {
  // TODO: hardcoded keys, add new keys if new union is added or modified
  const UNION_NAME_TO_PROJECT_DETAILS = {
    5: {
      projectId: 2,
      xmlFormId: "Buzaaya-Farmer-Collection",
    },
  };

  const prepareImageUrl = (unionName) =>
    `${ENDPOINT.ODK_IMAGES}v1/projects/${unionName.projectId}/forms/${unionName.xmlFormId}/submissions/${farmerProduces.instanceID}/attachments/${farmerProduces.grnReceipt}`;

  return (
    <FarmerProduceShowPanel icon="🧾" title="Grn Receipt" isOpen={true}>
      <Box display="flex" justifyContent="center" alignItems="center" height="600px">
        <Image
          loading="lazy"
          objectFit="contain"
          alt="Grn Receipt"
          src={prepareImageUrl(UNION_NAME_TO_PROJECT_DETAILS[farmerProduces.unionCode])}
          transform="rotate(-90deg)"
        />
      </Box>
    </FarmerProduceShowPanel>
  );
}
