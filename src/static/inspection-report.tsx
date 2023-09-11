import { IndexedDBConfig } from "use-indexeddb/src/interfaces";

export const STORE = {
  FARMERS: "farmers",
  SYNC_STATUS: "sync-status",
  PENDING_INSPECTION_REPORT: "pending-inspection-report",
  ASSETS: "assets",
  PENDING_RESOURCES: "pending-resources",
};

export const DB_CONFIG: IndexedDBConfig = {
  databaseName: "cropcert",
  version: 3,
  stores: [
    {
      name: STORE.FARMERS,
      id: { keyPath: "index", autoIncrement: true },
      indices: [
        { name: "id", keyPath: "id" },
        { name: "name", keyPath: "name" },
        { name: "userName", keyPath: "userName" },
        { name: "email", keyPath: "email" },
        { name: "membershipId", keyPath: "membershipId" },
        { name: "numCoffeePlots", keyPath: "numCoffeePlots" },
        { name: "numCoffeeTrees", keyPath: "numCoffeeTrees" },
        { name: "farmArea", keyPath: "farmArea" },
        { name: "coffeeArea", keyPath: "coffeeArea" },
        { name: "farmerCode", keyPath: "farmerCode" },
        { name: "ccCode", keyPath: "ccCode" },
        { name: "ccName", keyPath: "ccName" },
        { name: "coName", keyPath: "coName" },
        { name: "unionName", keyPath: "unionName" },
        { name: "fieldCoOrdinator", keyPath: "fieldCoOrdinator" },
        { name: "inspectorName", keyPath: "inspectorName" },
        { name: "inspection", keyPath: "inspection" },
      ],
    },
    {
      name: STORE.SYNC_STATUS,
      id: { keyPath: "index", autoIncrement: true },
      indices: [
        { name: "ccCode", keyPath: "ccCode" },
        { name: "ccName", keyPath: "ccName" },
        { name: "farmersCount", keyPath: "farmersCount" },
        { name: "lastSynced", keyPath: "lastSynced" },
      ],
    },
    {
      name: STORE.PENDING_INSPECTION_REPORT,
      id: { keyPath: "index", autoIncrement: true },
      indices: [
        { name: "farmerId", keyPath: "farmerId" },
        { name: "ccCode", keyPath: "ccCode" },
        { name: "data", keyPath: "data" },
        { name: "version", keyPath: "version" },
        { name: "subversion", keyPath: "subversion" },
      ],
    },
    {
      name: STORE.ASSETS,
      id: { keyPath: "id", autoIncrement: true },
      indices: [
        { name: "hashKey", keyPath: "hashKey", options: { unique: true } },
        { name: "fileName", keyPath: "fileName" },
        { name: "path", keyPath: "path" },
        { name: "type", keyPath: "type" },
        { name: "license", keyPath: "license" },
        { name: "status", keyPath: "status" },
        { name: "caption", keyPath: "caption" },
        { name: "ratings", keyPath: "ratings" },
        { name: "blob", keyPath: "blob" },
        { name: "isUsed", keyPath: "isUsed" },
        { name: "dateCreated", keyPath: "dateCreated" },
        { name: "dateUploaded", keyPath: "dateUploaded" },
      ],
    },
    {
      name: STORE.PENDING_RESOURCES,
      id: { keyPath: "id", autoIncrement: true },
      indices: [{ name: "data", keyPath: "data" }],
    },
  ],
};
