import { IndexedDBConfig } from "use-indexeddb/src/interfaces";

export const STORE = {
  FARMERS: "farmers",
  SYNC_STATUS: "sync-status",
  PENDING_INSPECTION_REPORT: "pending-inspection-report",
};

export const DB_CONFIG: IndexedDBConfig = {
  databaseName: "cropcert",
  version: 1,
  stores: [
    {
      name: STORE.FARMERS,
      id: { keyPath: "index", autoIncrement: true },
      indices: [
        { name: "id", keyPath: "id" },
        { name: "userName", keyPath: "userName" },
        { name: "firstName", keyPath: "firstName" },
        { name: "lastName", keyPath: "lastName" },
        { name: "dateOfBirth", keyPath: "dateOfBirth" },
        { name: "gender", keyPath: "gender" },
        { name: "cellNumber", keyPath: "cellNumber" },
        { name: "email", keyPath: "email" },
        { name: "village", keyPath: "village" },
        { name: "subCountry", keyPath: "subCountry" },
        { name: "membershipId", keyPath: "membershipId" },
        { name: "numCoffeePlots", keyPath: "numCoffeePlots" },
        { name: "numCoffeeTrees", keyPath: "numCoffeeTrees" },
        { name: "farmArea", keyPath: "farmArea" },
        { name: "coffeeArea", keyPath: "coffeeArea" },
        { name: "farmerCode", keyPath: "farmerCode" },
        { name: "ccCode", keyPath: "ccCode" },
        { name: "fieldCoOrdinator", keyPath: "fieldCoOrdinator" },
        { name: "inspection", keyPath: "inspection" },
      ],
    },
    {
      name: STORE.SYNC_STATUS,
      id: { keyPath: "index", autoIncrement: true },
      indices: [
        { name: "ccCode", keyPath: "ccCode" },
        { name: "ccName", keyPath: "ccName" },
        { name: "lastSynced", keyPath: "lastSynced" },
      ],
    },
    {
      name: STORE.PENDING_INSPECTION_REPORT,
      id: { keyPath: "id", autoIncrement: true },
      indices: [{ name: "data", keyPath: "data" }],
    },
  ],
};
