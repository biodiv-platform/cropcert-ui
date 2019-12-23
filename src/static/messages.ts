export const GENERIC = {
  ERROR: "There was an error while performing this operation",
  SUCCESS: "operation completed successfully"
};

export const SIGN_IN = {
  ERROR: "You have entered an invalid username or password"
};

export const BATCH = {
  UPDATED: "Batch updated successfully",
  MULTIPLE_TYPE_SELECTED: "You have selected wet and dry both types of batches",
  CREATED: "Batch ${id}. ${batchName} created successfully"
};

export const MLOT = {
  CREATED: "Lot ${id}. ${lotName} created successfully",
  FACTORY_REPORT_CREATED: "Factory Report ${id} created/updated successfully",
  GREEN_REPORT_CREATED: "Green Report ${id} created/updated successfully"
};

export const PAGES = {
  PAGE_DELETED: "Page deleted",
  PAGE_REARRAGNED: "Page(s) order updated successfully",
  PAGE_UPDATED: "Page Created/Updated Successfully"
};

export const REPORT = {
  DIFF_ERROR: "Input quantity does not match with graded quantities"
};

export const OPERATIONAL = {
  READY_FOR_LOT: {
    MESSAGE: "Wet batch(s) are finalized and ready for Lot",
    BACK_LINK: "/batch/list-wet",
    BACK_TITLE: "Finalize Other Batche(s)"
  },
  BATCH_CREATED: {
    MESSAGE: "Batch created with Name ##id##",
    BACK_LINK: "/batch/create",
    BACK_TITLE: "Create Another Batch"
  },
  LOT_CREATED: {
    MESSAGE: "Lot created with Name ##id##",
    BACK_LINK: "/batch/list",
    BACK_TITLE: "Create Another Lot"
  },
  LOT_DISPATCHED_FACTORY: {
    MESSAGE: "Lot(s) dispatched to Factory",
    BACK_LINK: "/lot/list",
    BACK_TITLE: "Dispatch More Lot(s)"
  },
  LOT_DISPATCHED_UNION: {
    MESSAGE: "Lot(s) dispatched to Union",
    BACK_LINK: "/lot/milling",
    BACK_TITLE: "Dispatch More Lot(s)"
  },
  GREEN_REPORT_CREATED: {
    MESSAGE: "Green Report Created with id ##id##",
    BACK_LINK: "/lot/report/list?type=green",
    BACK_TITLE: "Create more Reports"
  },
  CUPPING_REPORT_CREATED: {
    MESSAGE: "Cupping Report Created with id ##id##",
    BACK_LINK: "/lot/report/list?type=cupping",
    BACK_TITLE: "Create more Reports"
  },
  FACTORY_REPORT_CREATED: {
    MESSAGE: "Factory Report Created with id ##id##",
    BACK_LINK: "/lot/grn",
    BACK_TITLE: "Create more Reports"
  },
  PAGE_EDIT: {
    MESSAGE: "Page ##id## Updated",
    BACK_LINK: "/page/list",
    BACK_TITLE: "Manage Pages"
  },
  PAGE_CREATE: {
    MESSAGE: "Page ##id## Created",
    BACK_LINK: "/page/list",
    BACK_TITLE: "Manage Pages"
  },
  NA: {
    MESSAGE: "#",
    BACK_LINK: "/",
    BACK_TITLE: "#"
  }
};
