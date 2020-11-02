import { Alert, AlertIcon } from "@chakra-ui/core";
import useOnlineStatus from "@rehooks/online-status";
import React from "react";

export default function OfflineStatus() {
  const isOnline = useOnlineStatus();
  return isOnline ? null : (
    <Alert status="error" variant="solid" justifyContent="center">
      <AlertIcon />
      No Internet Connection
    </Alert>
  );
}
