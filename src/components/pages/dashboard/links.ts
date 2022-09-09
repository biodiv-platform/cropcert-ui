import SITE_CONFIG from "@configs/site-config";
import { ROLES } from "@static/constants";
import { hierarchicalRoles } from "@utils/auth";

const links = [
  {
    title: "Traceability",
    children: [
      {
        title: "🧺 Batch(s)",
        description: "Create, View or Manage Batches",
        to: "/batch/list",
        access: hierarchicalRoles(ROLES.COLLECTION_CENTER),
      },
      {
        title: "📦 Lot(s)",
        description: "Create, View or Manage Lots",
        to: "/lot/list",
        access: hierarchicalRoles(ROLES.COLLECTION_CENTER),
      },
      {
        title: "📦 Lots for Sale",
        description: "Information on Lots",
        to: "/marketing",
        access: [ROLES.GI_ADMIN, ROLES.ADMIN],
      },
    ],
  },
  {
    title: "Certification",
    children: [
      {
        title: "📝 Inspection Report",
        description: "Manage Inspection Report",
        to: "/farmer-certification/manage-farmers",
        access: [ROLES.INSPECTOR, ROLES.UNION, ROLES.COOPERATIVE, ROLES.ICS_MANAGER, ROLES.ADMIN],
      },
      {
        title: "📝 ICS Reports",
        description: "Approve ICS Reports",
        to: "/farmer-certification/inspection-report/list",
        access: [ROLES.ICS_MANAGER, ROLES.UNION, ROLES.COOPERATIVE, ROLES.ADMIN],
      },
      {
        title: "📑 Report Generation",
        description: "Download Report",
        to: "/farmer-certification/full-report",
        access: [ROLES.ICS_MANAGER, ROLES.UNION, ROLES.COOPERATIVE, ROLES.ADMIN],
      },
    ],
  },
  {
    title: "General",
    children: [
      {
        title: "📄 Document",
        description: "Create Document",
        to: "/document/create",
        access: [ROLES.AUTHORIZED],
      },
      {
        title: "📜 Pages",
        description: "Manage Static Pages",
        to: "/page/show/1",
        access: [ROLES.ADMIN],
      },
      {
        title: "💼 ROBUST ODK",
        description: "View aggregated data on ODK",
        to: SITE_CONFIG.ODK.URL,
        access: [ROLES.ADMIN],
      },
    ],
  },
];

export default links;
