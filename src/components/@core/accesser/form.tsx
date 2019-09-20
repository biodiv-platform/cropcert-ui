import { getByRole } from "@services/accessor.service";
import { KEYS_TO_ROLES } from "@utils/constants";
import { setUserKey } from "@utils/user.util";
import { Dropdown } from "carbon-components-react";
import React, { useEffect, useState } from "react";

interface IProps {
  toRole: string;
  roles: string[];
  initialState: { options; values };
  currentRole: string;
  onChange;
}

export default function AccesserForm({
  toRole,
  roles,
  initialState,
  currentRole,
  onChange,
}: IProps) {
  const [rolesOptions, setRolesOptions] = useState(initialState.options);
  const [rolesValues, setRolesValues] = useState(initialState.values);

  useEffect(() => {
    if (rolesValues[toRole]) {
      onChange(rolesValues[toRole]);
    }
  }, []);

  useEffect(() => {
    Object.keys(rolesValues).forEach(k => {
      setUserKey(`${k}Code`, rolesValues[k] ? rolesValues[k].value : -1);
    });
    onChange(rolesValues[toRole]);
  }, [rolesValues[toRole]]);

  /**
   * On change of any dropdown it populates child role values
   * resets dropdowns after child if exists then and saves new values
   *
   * @param {string} role
   * @param {number} index
   * @param {{ name: string; value: number }} selectedItem
   * @returns
   */
  const onOptionChange = (
    role: string,
    index: number,
    selectedItem: { name: string; value: number }
  ) => {
    if (role === toRole) {
      setRolesValues({ ...rolesValues, [role]: selectedItem });
      return;
    }

    const nextRole = roles[index + 1];
    getByRole(nextRole, selectedItem.value).then(opts => {
      let rolesValuesT = {
        ...rolesValues,
        [role]: selectedItem,
        [nextRole]: null,
      };
      let rolesOptionsT = { ...rolesOptions, [nextRole]: opts };
      roles.slice(index + 2, roles.length).map(cRole => {
        rolesValuesT = { ...rolesValuesT, [cRole]: null };
        rolesOptionsT = { ...rolesOptionsT, [cRole]: [] };
      });
      setRolesOptions(rolesOptionsT);
      setRolesValues(rolesValuesT);
    });
  };

  const RoleDropdown = (role, index) => {
    const roleLabel = KEYS_TO_ROLES[role];
    return (
      role !== currentRole && (
        <div key={index} className="bx--col-lg-4 bx--col-sm-12 mb-4">
          <Dropdown
            id={role}
            items={rolesOptions[role]}
            label={`Select ${roleLabel}`}
            titleText={roleLabel}
            ariaLabel={roleLabel}
            disabled={rolesOptions[role].length < 1}
            onChange={e => {
              onOptionChange(role, index, e.selectedItem);
            }}
            selectedItem={rolesValues[role]}
          />
        </div>
      )
    );
  };

  return <>{roles.map(RoleDropdown)}</>;
}
