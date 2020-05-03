import { FormControl, FormLabel } from "@chakra-ui/core";
import { axCoByUnionId, axGetCoByCode } from "@services/co.service";
import { ROLES } from "@static/constants";
import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import MultiSelect from "react-multi-select-component";
import { getUserKey } from "@utils/auth.util";

function CoMultiSelect({ unionId = -1, onChange }) {
  const role = useStoreState((state) => state.user.role);
  const [co, setCo] = useState([]);
  const [coSelected, setCoSelected] = useState([]);
  const isCoCC = [ROLES.COOPERATIVE, ROLES.COLLECTION_CENTER].includes(role);
  const label = "Select Cooperatives";

  useEffect(() => {
    isCoCC
      ? axGetCoByCode(getUserKey(`coCode`)).then(
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
  }, [co]);

  useEffect(() => {
    onChange(coSelected.map((o) => o.value));
  }, [coSelected]);

  return (
    <>
      {!isCoCC && (
        <FormControl mb={4} maxW="308px">
          <FormLabel htmlFor={role}>{label}</FormLabel>
          <MultiSelect
            options={co}
            value={coSelected}
            onChange={setCoSelected}
            disabled={co.length === 0}
            labelledBy={label}
          />
        </FormControl>
      )}
    </>
  );
}

export default CoMultiSelect;
