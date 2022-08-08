import { FormControl, FormLabel } from "@chakra-ui/react";
import { reactSelectProps } from "@components/form/configs";
import { getByRole } from "@services/accessor.service";
import { setUserKey } from "@utils/auth.util";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

interface IProps {
  toRole: string;
  roles: string[];
  initialState: { options; values };
  currentRole: string;
  onChange;
  onTouch;
}

export default function AccesserForm({
  toRole,
  roles,
  initialState,
  currentRole,
  onChange,
  onTouch,
}: IProps) {
  const [rolesOptions, setRolesOptions] = useState(initialState.options);
  const [rolesValues, setRolesValues] = useState(initialState.values);

  useEffect(() => {
    if (rolesValues[toRole]) {
      onChange(rolesValues[toRole]);
    }
  }, []);

  useEffect(() => {
    Object.keys(rolesValues).forEach((k) => {
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
    selectedItem: { label: string; value: number }
  ) => {
    if (role === toRole) {
      setRolesValues({ ...rolesValues, [role]: selectedItem });
      return;
    }
    onTouch && onTouch();
    const nextRole = roles[index + 1];
    getByRole(nextRole, selectedItem.value).then((opts) => {
      let rolesValuesT = {
        ...rolesValues,
        [role]: selectedItem,
        [nextRole]: null,
      };
      let rolesOptionsT = { ...rolesOptions, [nextRole]: opts };
      roles.slice(index + 2, roles.length).map((cRole) => {
        rolesValuesT = { ...rolesValuesT, [cRole]: null };
        rolesOptionsT = { ...rolesOptionsT, [cRole]: [] };
      });
      setRolesOptions(rolesOptionsT);
      setRolesValues(rolesValuesT);
    });
  };

  const RoleDropdown = (role, index) => {
    if (role === currentRole) return null;

    const roleName = useMemo(() => role.replace("_PERSON", ""), [role]);

    return (
      <FormControl key={index} mb={4}>
        <FormLabel textTransform="lowercase" htmlFor={role}>
          Select {roleName}
        </FormLabel>
        <Select
          id={role}
          options={rolesOptions[role]}
          isSearchable={true}
          onChange={(e) => {
            onOptionChange(role, index, e);
          }}
          value={rolesValues[role]}
          {...reactSelectProps}
        />
      </FormControl>
    );
  };

  return <>{roles.length > 1 && roles.map(RoleDropdown)}</>;
}
