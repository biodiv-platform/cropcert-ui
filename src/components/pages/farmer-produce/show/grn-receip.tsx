import { Box, IconButton, Image, Stack } from "@chakra-ui/react";
import RotateLeftIcon from "@icons/rotate-left";
import RotateRightIcon from "@icons/rotate-right";
import { ENDPOINT } from "@static/constants";
import React, { useState } from "react";

import { Tooltip } from "@/components/ui/tooltip";

import FarmerProduceShowPanel from "./panel";

export default function GrnReceiptInfo({ farmerProduces }) {
  // TODO: hardcoded keys, add new keys if new union is added or modified
  const UNION_NAME_TO_PROJECT_DETAILS = {
    5: {
      projectId: 2,
      xmlFormId: "Buzaaya-Farmer-Collection",
    },
    6: {
      projectId: 4,
      xmlFormId: "NorthernUganda-Farmer-Collection",
    },
  };

  const [rotationAngle, setRotationAngle] = useState(-90);

  const prepareImageUrl = (unionName) =>
    `${ENDPOINT.ODK_IMAGES}v1/projects/${unionName.projectId}/forms/${unionName.xmlFormId}/submissions/${farmerProduces.instanceID}/attachments/${farmerProduces.grnReceipt}`;

  const handleRotateLeft = () => {
    setRotationAngle((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotationAngle((prev) => prev + 90);
  };

  return (
    <FarmerProduceShowPanel icon="🧾" title="GRN Receipt" isOpen={true}>
      <Box display="flex" justifyContent="center" alignItems="center" height="600px">
        <Image
          loading="lazy"
          objectFit="contain"
          alt="Grn Receipt"
          src={prepareImageUrl(UNION_NAME_TO_PROJECT_DETAILS[farmerProduces.unionCode])}
          transform={`rotate(${rotationAngle}deg)`}
        />
      </Box>

      <Stack direction="row" gap={4} justifyContent="center" mt={4}>
        <Tooltip content="Rotate Image to the Left" aria-label="Rotate Left">
          <IconButton aria-label="Rotate Left" onClick={handleRotateLeft} variant="outline">
            <RotateLeftIcon />
          </IconButton>
        </Tooltip>
        <Tooltip content="Rotate Image to the Right" aria-label="Rotate Right">
          <IconButton aria-label="Rotate Right" onClick={handleRotateRight} variant="outline">
            <RotateRightIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </FarmerProduceShowPanel>
  );
}
