import { getUserKey } from "@utils/user.util";
import React, { useEffect, useState } from "react";

import AccesserForm from "./form";
import { getDropdownArray, getInitialOptionsAndValues } from "./helpers";

/**
 * Reusable component that allows to select entity anywhere
 *
 * @export
 * @param {*} { toRole, onChange }
 * @returns
 */
export default function Accesser({ toRole, onChange }) {
  const currentRole = getUserKey("role");
  const roles = getDropdownArray(currentRole, toRole);

  const [initialState, setInitialState] = useState();

  useEffect(() => {
    getInitialOptionsAndValues(roles).then(setInitialState);
  }, []);

  return initialState ? (
    <AccesserForm
      roles={roles}
      toRole={toRole}
      onChange={onChange}
      initialState={initialState}
      currentRole={currentRole}
    />
  ) : (
    <></>
  );
}
