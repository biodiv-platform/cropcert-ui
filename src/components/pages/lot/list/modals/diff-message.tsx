import { Alert, AlertIcon } from "@chakra-ui/core";
import { MREPORT } from "@static/messages";
import React from "react";

const DiffMessage = ({ diff }) => (
  <>
    {diff !== 0 && (
      <Alert status="warning" mt={4} borderRadius="md">
        <AlertIcon />
        {`${MREPORT.DIFF_ERROR} Total ${diff > 0 ? "Over" : "Under"} by ${Math.abs(diff)} KG(s)`}
      </Alert>
    )}
  </>
);

export default DiffMessage;
