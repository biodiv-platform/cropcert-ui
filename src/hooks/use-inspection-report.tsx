import { axListCCByCoId } from "@services/cc.service";
import { axGetFarmersWithLastReportByCC } from "@services/certification.service";
import { STORE } from "@static/inspection-report";
import notification, { NotificationType } from "@utils/notification.util";
import React, { createContext, useContext } from "react";
import { useImmer } from "use-immer";
import { useIndexedDBStore } from "use-indexeddb";

interface InspectionReportProviderProps {
  children;
}

interface InspectionReportContextProviderProps {
  onCoCodeChange;
  ccList;
  downloadCCFarmers;
  removeCCFarmers;
  getCCFarmers;
}

const InspectionReportContext = createContext<InspectionReportContextProviderProps>(
  {} as InspectionReportContextProviderProps
);

export const InspectionReportProvider = ({ children }: InspectionReportProviderProps) => {
  const [ccList, updateCCList] = useImmer({ l: [] });

  const {
    add: addFarmer,
    getManyByIndex: getFarmers,
    deleteByID: removeFarmer,
  } = useIndexedDBStore(STORE.FARMERS);

  const {
    add: addSyncStatus,
    getAll: getAllSyncStatus,
    deleteByID: removeSyncStatus,
  } = useIndexedDBStore(STORE.SYNC_STATUS);

  const {
    getAll: getAllPendingInspectionReports,
    deleteByID: removeInspectionReport,
  } = useIndexedDBStore(STORE.PENDING_INSPECTION_REPORT);

  const onCoCodeChange = async (coCode) => {
    const { data: ccList } = await axListCCByCoId(coCode?.value);
    const allSyncStatus = await getAllSyncStatus();
    const pendingInspectionReports = await getAllPendingInspectionReports();

    const updatedCCList = ccList.map((cc) => ({
      ...cc,
      pendingReports: pendingInspectionReports.filter(({ ccCode }) => ccCode === cc.code),
      syncStatus: allSyncStatus.find(({ ccCode }) => ccCode === cc.code),
    }));

    updateCCList((_draft) => {
      _draft.l = updatedCCList;
    });
  };

  const downloadCCFarmers = async ({ ccCode, ccName }) => {
    try {
      const { data, success } = await axGetFarmersWithLastReportByCC(ccCode);
      if (success && data.length) {
        await Promise.all(data.map((o) => addFarmer(o)));
        const syncStatus = {
          ccCode,
          ccName,
          lastSynced: new Date(),
          farmersCount: data.length,
        };
        await addSyncStatus(syncStatus);
        updateCCList((_draft) => {
          const index = ccList.l.findIndex((cc) => ccCode === cc.code);
          if (index > -1) {
            _draft.l[index]["syncStatus"] = syncStatus;
          }
        });
      } else {
        notification("No Farmers Available", NotificationType.Info);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCCFarmers = async (ccCode) => {
    return await getFarmers("ccCode", Number(ccCode));
  };

  const removeCCFarmers = async (ccCode) => {
    const allSyncStatus: any = await getAllSyncStatus();
    const farmersToRemove = await getFarmers("ccCode", ccCode);
    await Promise.all(farmersToRemove.map(({ index }) => removeFarmer(index)));
    await removeSyncStatus(allSyncStatus.find((cc) => cc.ccCode === ccCode)?.index);
    updateCCList((_draft) => {
      const index = _draft.l.findIndex((cc) => ccCode === cc.code);
      if (index > -1) {
        delete _draft.l[index]["syncStatus"];
      }
    });
  };

  return (
    <InspectionReportContext.Provider
      value={{
        onCoCodeChange,
        ccList: ccList.l,
        downloadCCFarmers,
        removeCCFarmers,
        getCCFarmers,
      }}
    >
      {children}
    </InspectionReportContext.Provider>
  );
};

export default function useInspectionReport() {
  return useContext(InspectionReportContext);
}
