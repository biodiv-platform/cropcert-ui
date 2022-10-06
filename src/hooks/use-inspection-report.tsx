import { axListCCByCoId } from "@services/cc.service";
import {
  axGetFarmersWithLastReportByCC,
  axGetFarmerWithLastReportByFarmerId,
} from "@services/certification.service";
import { axUploadInspectionReport, axUploadSignature } from "@services/report.service";
import { STORE } from "@static/inspection-report";
import notification, { NotificationType } from "@utils/notification";
import React, { createContext, useContext, useReducer } from "react";
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
  uploadInspectionReport;
  discardInspectionReport;
  affected: { added; updated };
}

const InspectionReportContext = createContext<InspectionReportContextProviderProps>(
  {} as InspectionReportContextProviderProps
);

export const InspectionReportProvider = ({ children }: InspectionReportProviderProps) => {
  const [ccList, updateCCList] = useImmer<any>({ l: [] });
  const [affected, setAffected] = useReducer(
    ({ added, updated }, isAdded) =>
      isAdded ? { added: added + 1, updated } : { added, updated: updated + 1 },
    { added: 0, updated: 0 }
  );

  const {
    add: addFarmer,
    getManyByKey: getFarmers,
    getOneByKey: getFarmer,
    deleteByID: removeFarmer,
    update: addOrUpdateFarmer,
  } = useIndexedDBStore(STORE.FARMERS);

  const {
    update: updateSyncStatus,
    getOneByKey: getSyncStatus,
    add: addSyncStatus,
    getAll: getAllSyncStatus,
    deleteByID: removeSyncStatus,
  } = useIndexedDBStore(STORE.SYNC_STATUS);

  const {
    getAll: getAllPendingInspectionReports,
    getManyByKey: getPendingReports,
    getOneByKey: getPendingReport,
    deleteByID: removeInspectionReport,
  } = useIndexedDBStore(STORE.PENDING_INSPECTION_REPORT);

  const onCoCodeChange = async (coCode) => {
    const { data: ccList }: any = await axListCCByCoId(coCode?.value);
    const allSyncStatus = await getAllSyncStatus();
    const pendingInspectionReports = await getAllPendingInspectionReports();

    const updatedCCList: any = ccList.map((cc) => ({
      ...cc,
      pendingReports: pendingInspectionReports.filter(({ ccCode }) => ccCode === cc.code),
      syncStatus: allSyncStatus.find(({ ccCode }) => ccCode === cc.code),
    }));

    updateCCList((_draft) => {
      _draft.l = updatedCCList;
    });
  };

  const downloadCCFarmers = async (ccCode, isUpdate = false) => {
    try {
      const { data, success } = await axGetFarmersWithLastReportByCC(ccCode);
      if (success && data.length) {
        await Promise.all(
          data.map(async (o) => {
            if (isUpdate) {
              const pendingReport = await getPendingReports("farmerId", o.id);
              if (!pendingReport.length) {
                const farmers: any = await getFarmers("id", o.id);
                addOrUpdateFarmer({ ...o, index: farmers.length && farmers[0]?.index });

                // To show added/updated message
                if (farmers.length) {
                  if (farmers[0].version !== o.version || farmers[0].subVersion !== o.subVersion) {
                    setAffected(false);
                  }
                } else {
                  setAffected(true);
                }
              }
            } else {
              addFarmer(o);
            }
          })
        );

        const syncStatus = {
          ccCode,
          ccName: `X-${ccCode}`,
          lastSynced: new Date(),
          farmersCount: data.length,
        };

        if (isUpdate) {
          const { index }: any = await getSyncStatus("ccCode", ccCode);
          await updateSyncStatus({ ...syncStatus, index });
        } else {
          await addSyncStatus(syncStatus);
        }

        updateCCList((_draft) => {
          const index = ccList.l.findIndex((cc) => ccCode === cc.code);
          if (index > -1) {
            _draft.l[index]["syncStatus"] = syncStatus;
          }
        });
        return true;
      } else {
        notification("No Farmers Available", NotificationType.Info);
      }
    } catch (e) {
      console.error(e);
    }

    return false;
  };

  const getCCFarmers = async (ccCode, isOnline, isUpdate) => {
    if (isOnline) {
      await downloadCCFarmers(ccCode, isUpdate);
    }

    const farmers: any = await getFarmers("ccCode", Number(ccCode));

    return await Promise.all(farmers.map((f) => getUpdatedFarmer(f, isOnline)));
  };

  const getUpdatedFarmer = async (farmer, isOnline) => {
    let isConflict = false;
    let isSubVersionConflict = false;
    let lFarmer;
    const pendingReport = await getPendingReport("farmerId", farmer.id);
    if (pendingReport && isOnline) {
      const { success, data } = await axGetFarmerWithLastReportByFarmerId(farmer.id);
      lFarmer = data;
      isConflict = success && lFarmer.version !== farmer.version;
      isSubVersionConflict = success && lFarmer.subVersion !== farmer.subVersion;
    }
    return { ...farmer, pendingReport, isConflict, isSubVersionConflict, lFarmer };
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

  const uploadSignatures = async (values) => {
    const signatures = ["farmer", "fieldCoordinator"];
    const r = await Promise.all(signatures.map((p) => axUploadSignature(values[p]?.path)));
    r.forEach((path, index) => (values[signatures[index]]["path"] = path));
    return values;
  };

  const uploadInspectionReport = async (r) => {
    const inspectionReport = await uploadSignatures(r.data);
    const { success: uploaded } = await axUploadInspectionReport(inspectionReport);
    if (uploaded) {
      removeInspectionReport(r.index);
      const { index }: any = await getFarmer("id", r.farmerId);

      // TODO: we can avoid this network call directly
      // back-end has to make following changes
      // 1. Return correct subversion
      // 2. And return farmer record instead of inspection report
      const { success, data: newFarmer } = await axGetFarmerWithLastReportByFarmerId(r.farmerId);
      success && addOrUpdateFarmer({ ...newFarmer, index });
    }
  };

  return (
    <InspectionReportContext.Provider
      value={{
        onCoCodeChange,
        ccList: ccList.l,
        downloadCCFarmers,
        removeCCFarmers,
        getCCFarmers,
        uploadInspectionReport,
        discardInspectionReport: removeInspectionReport,
        affected,
      }}
    >
      {children}
    </InspectionReportContext.Provider>
  );
};

export default function useInspectionReport() {
  return useContext(InspectionReportContext);
}
