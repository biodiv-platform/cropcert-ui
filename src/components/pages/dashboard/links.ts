import { hierarchicalRoles } from "@utils/auth.util";
import { ROLES } from "@static/constants";

const links = [
  {
    title: "General",
    children: [
      {
        title: "🧺 Batch(s)",
        description: "Create, View or Manage Batches",
        to: "/batch/list",
        access: hierarchicalRoles(ROLES.COLLECTION_CENTER)
      },
      {
        title: "📦 Lot(s)",
        description: "Create, View or Manage Lots",
        to: "/lot/list",
        access: hierarchicalRoles(ROLES.COLLECTION_CENTER)
      }
    ]
  },
  {
    title: "Admin Actions",
    children: [
      {
        title: "📄 Pages",
        description: "Manage Static Pages",
        to: "/page/list",
        access: [ROLES.ADMIN]
      },
      {
        title: "🌾 ODK Aggregate",
        description: "View aggregated data on ODK",
        to: "http://demo.rwenzorimountaincoffee.org/ODKAggregate/",
        access: [ROLES.ADMIN]
      }
    ]
  }
];

export default links;
