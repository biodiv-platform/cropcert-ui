import SITE_CONFIG from "@configs/site-config";
import { ROLES } from "@static/constants";
import { hierarchicalRoles } from "@utils/auth";

const links = [
  {
    title: "Traceability",
    children: [
      {
        title: "🧑‍🌾 Farmers",
        description: "Nurturing Coffee's Roots",
        to: "/farmer/list",
        access: hierarchicalRoles(ROLES.COLLECTION_CENTER),
        tag: "Beta",
      },
      {
        title: "📦 Traceability",
        description: "Tracing Coffee's Source",
        to: "/traceability/farmer-produce",
        access: hierarchicalRoles(ROLES.COLLECTION_CENTER),
        tag: "Beta",
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
        description: "Login to ROBUST ODK",
        to: SITE_CONFIG.ODK.URL,
        access: [ROLES.ADMIN, ROLES.ODK_APP_USER, ROLES.ODK_WEB_USER],
      },
    ],
  },
];

export default links;
