import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { User } from "types/user";

import AccesserForm from "./form";
import { getDropdownArray, getInitialOptionsAndValues } from "./helpers";
import AccesserLoading from "./loading";

/**
 * Reusable component that allows to select entity anywhere
 *
 * @export
 * @param {*} { toRole, onChange }
 * @returns
 */
export default function Accesser({ toRole, onChange }) {
  const user: User = useStoreState(state => state.user);
  const roles = getDropdownArray(user.role, toRole);

  const [initialState, setInitialState] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInitialOptionsAndValues(roles).then(v => {
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
          currentRole={user.role}
        />
      )}
    </>
  );
}
