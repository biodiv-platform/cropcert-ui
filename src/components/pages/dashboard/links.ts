import { ROLES } from "@static/constants";
import { hierarchicalRoles } from "@utils/auth.util";

const links = [
  {
    title: "General",
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
    ],
  },
  {
    title: "Certification",
    children: [
      {
        title: "📝 Inspection Report",
        description: "Manage Inspection Report",
        to: "/farmer-certification/manage-farmers",
        access: [ROLES.INSPECTOR, ROLES.ADMIN],
      },
    ],
  },
  {
    title: "Admin Actions",
    children: [
      {
        title: "📄 Pages",
        description: "Manage Static Pages",
        to: "/page/list",
        access: [ROLES.ADMIN],
      },
      {
        title: "🌾 ODK Aggregate",
        description: "View aggregated data on ODK",
        to: "/ODKAggregate/",
        access: [ROLES.ADMIN],
      },
    ],
  },
];

export default links;
