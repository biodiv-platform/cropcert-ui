import { FormControl, FormLabel } from "@chakra-ui/core";
import { axGetCCByCode, axListCCByCoId } from "@services/cc.service";
import { ROLES } from "@static/constants";
import { getUserKey } from "@utils/auth.util";
import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import MultiSelect from "react-multi-select-component";

function CCMultiSelect({ coId = -1, onChange }) {
  const role = useStoreState((state) => state.user.role);
  const [cc, setCC] = useState([]);
  const [ccSelected, setCCSelected] = useState([]);
  const isCC = role === ROLES.COLLECTION_CENTER;
  const label = "Select Collection Center";

  const setBoth = (r) => {
    setCC(r);
    setCCSelected(r);
  };

  useEffect(() => {
    isCC
      ? axGetCCByCode(getUserKey(`ccCode`)).then(
          (d) => d.success && setBoth([{ label: d.data.name, value: d.data.code }])
        )
      : coId > 0
      ? axListCCByCoId(coId).then(
          (d) => d.success && setBoth(d.data.map((o) => ({ label: o.name, value: o.code })))
        )
      : setBoth([]);
  }, [coId]);

  useEffect(() => {
    onChange(ccSelected);
  }, [ccSelected]);

  return (
    <>
      {!isCC && (
        <FormControl mb={4} maxW="308px">
          <FormLabel htmlFor={role}>{label}</FormLabel>
          <MultiSelect
            options={cc}
            value={ccSelected}
            onChange={setCCSelected}
            disabled={cc.length === 0}
            labelledBy={label}
          />
        </FormControl>
      )}
    </>
  );
}

export default CCMultiSelect;
