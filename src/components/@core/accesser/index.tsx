import { ROLES } from "@static/constants";
import { useStoreState } from "easy-peasy";
import React, { useEffect, useMemo, useState } from "react";
import { User } from "types/user";

import AccesserForm from "./form";
import { getDropdownArray, getInitialOptionsAndValues } from "./helpers";
import AccesserLoading from "./loading";

const parsedAccessorRole = (role) => {
  let finalRole = role;

  // Inspector is at the same position at union for dropdown
  if (role === ROLES.INSPECTOR) {
    return ROLES.UNION;
  }

  return finalRole;
};

/**
 * Reusable component that allows to select entity anywhere
 *
 * @export
 * @param {*} { toRole, onChange }
 * @returns
 */
export default function Accesser({ toRole, onChange, onTouch = null }) {
  const user: User = useStoreState((state) => state.user);
  const parsedRole = useMemo(() => parsedAccessorRole(user.role), [user.role]);
  const roles = getDropdownArray(parsedRole, toRole);

  const [initialState, setInitialState] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInitialOptionsAndValues(roles).then((v) => {
      setInitialState(v);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <AccesserLoading roles={roles} />}
      {initialState && (
        <AccesserForm
          roles={roles}
          toRole={toRole}
          onChange={onChange}
          initialState={initialState}
          currentRole={parsedRole}
          onTouch={onTouch}
        />
      )}
    </>
  );
}
