import { LIST_PAGINATION_LIMIT } from "./documnet-list";

export const DEFAULT_FILTER = {
  sort: "user.dateCreated",
  offset: 0,
  max: LIST_PAGINATION_LIMIT,
};

export const sortByOptions = [
  {
    name: "common:list.sort_options.last_logged_in",
    key: "user.lastLoginDate",
  },
  {
    name: "common:list.sort_options.latest",
    key: "user.dateCreated",
  },
];
