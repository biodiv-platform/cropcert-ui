import React from "react";

import CheckboxFilterPanel from "../shared/checkbox";
import { CONTEXT_TYPES } from "./filter-keys";

export default function Context() {
  return (
    <CheckboxFilterPanel
      translateKey="filters:context."
      filterKey="context"
      options={CONTEXT_TYPES}
    />
  );
}
