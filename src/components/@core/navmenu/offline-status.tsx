import useOnlineStatus from "@rehooks/online-status";
import React from "react";

import { Alert } from "@/components/ui/alert";

export default function OfflineStatus() {
  const isOnline = useOnlineStatus();
  return (
    <Alert status="error" variant="solid" hidden={isOnline} justifyContent="center">
      {isOnline ? "" : "No Internet Connection"}
    </Alert>
  );
}
