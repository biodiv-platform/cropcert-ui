import React from "react";

import useDocumentFilter from "../../../common/use-document-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function ItemTypeFilter() {
  const { documentTypes } = useDocumentFilter();

  const itemTypeList =
    documentTypes?.map((item) => ({
      label: item.label,
      value: item.label.toLowerCase(),
    })) ?? [];

  return (
    <CheckboxFilterPanel
      translateKey="filters:item_type."
      filterKey="itemType"
      options={itemTypeList}
      statKey="groupTypeOfDocument"
      skipOptionsTranslation={true}
    />
  );
}
