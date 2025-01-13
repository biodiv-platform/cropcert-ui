import { FormControl, FormLabel } from "@chakra-ui/react";
import { reactSelectProps } from "@components/form/configs";
import useGlobalState from "@hooks/use-global-state";
import { axGetCoByCode } from "@services/co.service";
import { axCoByUnionId } from "@services/entities.service";
import { ROLES } from "@static/constants";
import { getUserKey } from "@utils/auth";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

function CoMultiSelect({ unionId = -1, onChange }) {
  const { authorizedRoles, setMultiSelectCo } = useGlobalState();
  const [co, setCo] = useState<any[]>([]);
  const [coSelected, setCoSelected] = useState<any>([]);
  const isCoCC =
    authorizedRoles.includes(ROLES.COOPERATIVE) ||
    authorizedRoles.includes(ROLES.COLLECTION_CENTER);
  const label = "Select cooperatives";

  useEffect(() => {
    isCoCC
      ? axGetCoByCode(getUserKey(`${ROLES.COOPERATIVE}Code`)).then(
          (d) => d.success && setCo([{ label: d.data.name, value: d.data.code }])
        )
      : unionId > 0
      ? axCoByUnionId(unionId).then(
          (d) => d.success && setCo(d.data.map((o) => ({ label: o.name, value: o.code })))
        )
      : setCo([]);
  }, [unionId]);

  useEffect(() => {
    setCoSelected(co);
    setMultiSelectCo(co);
  }, [co]);

  useEffect(() => {
    onChange(coSelected.map((o) => o.value));
  }, [coSelected]);

  return (
    <>
      {!isCoCC && (
        <FormControl mb={2} maxW="308px">
          <FormLabel>{label}</FormLabel>
          <MultiSelect
            options={co}
            value={coSelected}
            onChange={setCoSelected}
            disabled={co.length === 0}
            labelledBy={label}
            {...reactSelectProps}
          />
        </FormControl>
      )}
    </>
  );
}

export default CoMultiSelect;
