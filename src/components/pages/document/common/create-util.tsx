import { cleanTags } from "@utils/tags";

export const DCOUMENT_CREATE_DEFAULT_VALUES = {
  tags: [],
  speciesGroupIds: [],
  habitatIds: [],
  docCoverageData: [],
  userGroupId: [],
  geoentitiesId: [],
  mimeType: "application/pdf",
  size: 0,
  rating: 0,
};

export const transformDocumentCreatePayload = (values, documentTypes, isPrePayload?) => {
  const { resource, status, documentId, bibFieldData, itemTypeId, fromDate, tags, ...rest } =
    values;

  return {
    ...DCOUMENT_CREATE_DEFAULT_VALUES,
    ...rest,
    resourceURL: resource?.resourceURL,
    fromDate: fromDate,
    tags: cleanTags(tags),
    size: resource?.size,
    bibFieldData: {
      ...bibFieldData,
      "item type": documentTypes.find((o) => o.value === itemTypeId)?.label,
    },
    itemTypeId: isPrePayload ? bibFieldData.itemTypeId || itemTypeId : undefined,
  };
};
