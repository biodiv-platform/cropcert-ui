import { Alert, AlertIcon } from "@chakra-ui/react";
import useOnlineStatus from "@rehooks/online-status";
import React from "react";

export default function OfflineStatus() {
  const isOnline = useOnlineStatus();
  return (
    <Alert status="error" variant="solid" hidden={isOnline} justifyContent="center">
      <AlertIcon />
      {isOnline ? "" : "No Internet Connection"}
    </Alert>
  );
}
