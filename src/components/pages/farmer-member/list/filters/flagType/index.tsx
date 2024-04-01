import React from "react";

import CheckboxFilterPanel from "../shared/checkbox";

export default function FlagTypeFilter() {
  const flagTypeList = [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
  ];

  // const itemTypeList = DOCUMNET_ITEM_TYPE?.map((i) => ({
  //   label: i,
  //   value: i,
  // }));

  return (
    <CheckboxFilterPanel
      translateKey="Flag Type"
      filterKey="flag"
      options={flagTypeList}
      statKey="groupTypeOfDocument"
      skipOptionsTranslation={true}
    />
  );
}
