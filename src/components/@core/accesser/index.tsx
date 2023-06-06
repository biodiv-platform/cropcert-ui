import useGlobalState from "@hooks/use-global-state";
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
  const { authorizedRoles } = useGlobalState();
  console.log("authorizedRoles:");
  console.log(authorizedRoles);
  const parsedRole = useMemo(() => parsedAccessorRole(authorizedRoles[0]), [authorizedRoles]);
  const roles = getDropdownArray(parsedRole, toRole);

  const [initialState, setInitialState] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInitialOptionsAndValues(roles).then((v) => {
      setInitialState(v);
      setIsLoading(false);
    });
  }, []);

  // console.log("toRole", toRole);
  // console.log("initialState:");
  // console.log(initialState);
  // console.log("parsedRole:");
  // console.log(parsedRole);

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
