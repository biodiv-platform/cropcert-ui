import { Button } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { axGetFarmersWithLastReportByCC } from "@services/certification.service";
import { IDB_SYNCED } from "@static/events";
import { STORE } from "@static/inspection-report";
import notification, { NotificationType } from "@utils/notification.util";
import React, { useEffect, useState } from "react";
import { emit, useListener } from "react-gbus";
import { useIndexedDBStore } from "use-indexeddb";

const ActionButtonContainer = styled.div`
  button {
    min-width: 12rem;
  }
`;

export default function ActionButton({ ccCode, ccName }) {
  const {
    add: addFarmer,
    getManyByIndex: getFarmers,
    deleteByID: removeFarmer,
  } = useIndexedDBStore(STORE.FARMERS);
  const { add: addSyncStatus, getOneByIndex, deleteByID: removeSyncStatus } = useIndexedDBStore(
    STORE.SYNC_STATUS
  );

  const [offlineCC, setOfflineCC] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const checkSyncStatus = () => getOneByIndex("ccCode", ccCode).then(setOfflineCC);

  useListener(checkSyncStatus, [IDB_SYNCED]);

  useEffect(() => {
    checkSyncStatus();
  }, [ccCode]);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const { data, success } = await axGetFarmersWithLastReportByCC(ccCode);
      if (success && data.length > 0) {
        await Promise.all(data.map((o) => addFarmer(o)));
        await addSyncStatus({ ccCode, ccName, lastSynced: new Date() });
        emit(IDB_SYNCED);
      } else {
        notification("No Farmers Available", NotificationType.Info);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleRemove = async () => {
    setIsLoading(true);
    const farmersToRemove = await getFarmers("ccCode", ccCode);
    await Promise.all(farmersToRemove.map(({ index }) => removeFarmer(index)));
    await removeSyncStatus(offlineCC.index);
    emit(IDB_SYNCED);
    setIsLoading(false);
  };

  return (
    <ActionButtonContainer>
      {offlineCC ? (
        <Button
          variantColor="red"
          isLoading={isLoading}
          onClick={handleRemove}
          loadingText="Deleting"
          leftIcon="delete"
          size="sm"
        >
          Remove from Offline
        </Button>
      ) : (
        <Button
          size="sm"
          variantColor="blue"
          onClick={handleDownload}
          isLoading={isLoading}
          loadingText="Downloading"
          leftIcon="download"
        >
          Make Available Offline
        </Button>
      )}
    </ActionButtonContainer>
  );
}
