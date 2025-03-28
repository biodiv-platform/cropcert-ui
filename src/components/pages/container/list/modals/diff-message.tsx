import { MREPORT } from "@static/messages";
import React from "react";

import { Alert } from "@/components/ui/alert";

const DiffMessage = ({ diff }) => (
  <>
    {diff !== 0 && (
      <Alert status="warning" mt={4} borderRadius="md">
        {`${MREPORT.DIFF_ERROR} Total ${diff > 0 ? "Over" : "Under"} by ${Math.abs(diff)} KG(s)`}
      </Alert>
    )}
  </>
);

export default DiffMessage;
