import { Box } from "@chakra-ui/react";
import { reactSelectProps } from "@components/form/configs";
import { getByRole } from "@services/accessor.service";
import { ROLES } from "@static/constants";
import { setUserKey } from "@utils/auth";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { Field } from "@/components/ui/field";
import useGlobalState from "@/hooks/use-global-state";

interface IProps {
  toRole: string;
  roles: string[];
  initialState: { options; values };
  currentRole: string;
  onChange;
  onTouch;
}

export default function AccesserForm({ toRole, roles, initialState, onChange, onTouch }: IProps) {
  const [rolesOptions, setRolesOptions] = useState(initialState.options);
  const [rolesValues, setRolesValues] = useState(initialState.values);
  const { setUnion } = useGlobalState();

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
    setUnion(selectedItem);
  };

  const RoleDropdown = (role, index) => {
    if (role === ROLES.ADMIN) return null;

    const roleName = useMemo(() => role.replace("_PERSON", ""), [role]);

    return (
      <Box zIndex={99}>
        <Field key={index} mb={1}>
          <Field htmlFor={role}>Select {roleName?.toLowerCase()}</Field>
          <Select
            id={role}
            options={rolesOptions[role]}
            isSearchable={true}
            onChange={(e) => {
              onOptionChange(role, index, e);
            }}
            components={{ IndicatorSeparator: () => null }}
            value={rolesValues[role]}
            {...reactSelectProps}
          />
        </Field>
      </Box>
    );
  };

  return <>{roles.map(RoleDropdown)}</>;
}
