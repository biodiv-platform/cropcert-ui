import { FormControl, FormLabel } from "@chakra-ui/core";
import { axCoByUnionId, axGetCoById } from "@services/co.service";
import { ROLES } from "@static/constants";
import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import MultiSelect from "react-multi-select-component";

function CoMultiSelect({ unionId = -1, onChange }) {
  const role = useStoreState(state => state.user.role);
  const [co, setCo] = useState([]);
  const [coSelected, setCoSelected] = useState([]);
  const isCo = role === ROLES.COOPERATIVE;
  const label = "Select Cooperatives";

  useEffect(() => {
    isCo
      ? axGetCoById(unionId).then(d => d.success && setCo([d.data]))
      : unionId > 0
      ? axCoByUnionId(unionId).then(
          d => d.success && setCo(d.data.map(o => ({ label: o.name, value: o.code })))
        )
      : setCo([]);
  }, [unionId]);

  useEffect(() => {
    setCoSelected(co);
  }, [co]);

  useEffect(() => {
    onChange(coSelected.map(o => o.value));
  }, [coSelected]);

  return (
    <>
      {!isCo && (
        <FormControl mb={4} maxW="308px">
          <FormLabel htmlFor={role}>{label}</FormLabel>
          <MultiSelect
            options={co}
            value={coSelected}
            onChange={setCoSelected}
            disabled={co.length === 0}
            labelledBy={label}
            theme={{ height: "38px" }}
          />
        </FormControl>
      )}
    </>
  );
}

export default CoMultiSelect;
