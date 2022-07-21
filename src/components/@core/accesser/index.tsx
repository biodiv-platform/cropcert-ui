import useGlobalState from "@hooks/use-global-store";
import { ROLES } from "@static/constants";
import React, { useEffect, useMemo, useState } from "react";

import AccesserForm from "./form";
import { getDropdownArray, getInitialOptionsAndValues } from "./helpers";
import AccesserLoading from "./loading";

interface AccesserProps {
  toRole: string;
  onChange;
  onTouch?;
}

const parsedAccessorRole = (role) => {
  // Inspector is at the same position at union for dropdown
  if ([ROLES.INSPECTOR, ROLES.ICS_MANAGER].includes(role)) {
    return ROLES.UNION;
  }

  return role;
};

/**
 * Reusable component that allows to select entity anywhere
 *
 * @export
 * @param {*} { toRole, onChange }
 * @returns
 */
export default function Accesser({ toRole, onChange, onTouch }: AccesserProps) {
  const { user } = useGlobalState();
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
