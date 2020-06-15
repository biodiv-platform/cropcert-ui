import { Button } from "@chakra-ui/core";
import { axGetFarmersWithLastReportByCC } from "@services/certification.service";
import { IDB_SYNCED } from "@static/events";
import { STORE } from "@static/inspection-report";
import React, { useEffect, useState } from "react";
import { emit, useListener } from "react-gbus";
import { useIndexedDBStore } from "use-indexeddb";
import notification, { NotificationType } from "@utils/notification.util";

export default function ActionButton({ code: ccCode, name: ccName }) {
  const { add: addFarmer } = useIndexedDBStore(STORE.FARMERS);
  const { add: addSyncStatus, getOneByIndex } = useIndexedDBStore(STORE.SYNC_STATUS);

  const [offlineCC, setOfflineCC] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const checkSyncStatus = () => getOneByIndex("ccCode", ccCode).then(setOfflineCC);

  useListener(checkSyncStatus, [IDB_SYNCED]);

  useEffect(() => {
    checkSyncStatus();
  }, []);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const { data, success } = await axGetFarmersWithLastReportByCC(ccCode);
      if (success) {
        await Promise.all(data.map((o) => addFarmer(o)));
        await addSyncStatus({ ccCode, ccName, lastSynced: new Date() });
        emit(IDB_SYNCED);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleRemove = () => {
    notification("TODO", NotificationType.Info);
  };

  return offlineCC ? (
    <Button
      variantColor="red"
      size="sm"
      isLoading={isLoading}
      onClick={handleRemove}
      leftIcon="delete"
    >
      Remove from Offline
    </Button>
  ) : (
    <Button size="sm" onClick={handleDownload} isLoading={isLoading} leftIcon="download">
      Make Available Offline
    </Button>
  );
}
