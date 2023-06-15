import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import { BATCH } from "@static/messages";
import React from "react";

function MultipleTypeWarning({ show = false }) {
  return (
    <Box>
      {show && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {BATCH.MULTIPLE_TYPE_SELECTED}
        </Alert>
      )}
    </Box>
  );
}

export default MultipleTypeWarning;
