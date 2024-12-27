import { Box } from "@chakra-ui/react";
import { BATCH } from "@static/messages";
import React from "react";

import { Alert } from "@/components/ui/alert";

function MultipleTypeWarning({ show = false }) {
  return (
    <Box>
      {show && (
        <Alert status="error" mb={4} borderRadius="md">
          {BATCH.MULTIPLE_TYPE_SELECTED}
        </Alert>
      )}
    </Box>
  );
}

export default MultipleTypeWarning;
