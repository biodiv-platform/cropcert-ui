import { Box, IconButton, Image, Stack, Tooltip } from "@chakra-ui/react";
import RotateLeftIcon from "@icons/rotate-left";
import RotateRightIcon from "@icons/rotate-right";
import { ENDPOINT } from "@static/constants";
import React, { useState } from "react";

import FarmerProduceShowPanel from "./panel";

export default function GrnReceiptInfo({ farmerProduces }) {
  // TODO: hardcoded keys, add new keys if new union is added or modified
  const UNION_NAME_TO_PROJECT_DETAILS = {
    5: {
      projectId: 2,
      xmlFormId: "Buzaaya-Farmer-Collection",
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
    <FarmerProduceShowPanel icon="🧾" title="Grn Receipt" isOpen={true}>
      <Box display="flex" justifyContent="center" alignItems="center" height="600px">
        <Image
          loading="lazy"
          objectFit="contain"
          alt="Grn Receipt"
          src={prepareImageUrl(UNION_NAME_TO_PROJECT_DETAILS[farmerProduces.unionCode])}
          transform={`rotate(${rotationAngle}deg)`}
        />
      </Box>

      <Stack direction="row" spacing={4} justifyContent="center" mt={4}>
        <Tooltip label="Rotate Image to the Left" aria-label="Rotate Left">
          <IconButton
            aria-label="Rotate Left"
            icon={<RotateLeftIcon />}
            onClick={handleRotateLeft}
            variant="outline"
          />
        </Tooltip>
        <Tooltip label="Rotate Image to the Right" aria-label="Rotate Right">
          <IconButton
            aria-label="Rotate Right"
            icon={<RotateRightIcon />}
            onClick={handleRotateRight}
            variant="outline"
          />
        </Tooltip>
      </Stack>
    </FarmerProduceShowPanel>
  );
}
