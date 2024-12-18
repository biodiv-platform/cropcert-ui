import { FormControl, FormLabel } from "@chakra-ui/react";
import { reactSelectProps } from "@components/form/configs";
import useGlobalState from "@hooks/use-global-state";
import { axGetCCByCode, axListCCByCoId } from "@services/cc.service";
import { ROLES } from "@static/constants";
import { getUserKey } from "@utils/auth";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

function CCMultiSelect({ coId = -1, onChange }) {
  const { authorizedRoles } = useGlobalState();
  const [cc, setCC] = useState<any>([]);
  const [ccSelected, setCCSelected] = useState<any>([]);
  const isCC = authorizedRoles.includes(ROLES.COLLECTION_CENTER);
  const label = "Select collection center";

  const setBoth = (r) => {
    setCC(r);
    setCCSelected(r);
  };

  useEffect(() => {
    isCC
      ? axGetCCByCode(getUserKey(`${ROLES.COLLECTION_CENTER}Code`)).then(
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
        <FormControl mb={2} maxW="308px">
          <FormLabel htmlFor={ROLES.COLLECTION_CENTER}>{label}</FormLabel>
          <MultiSelect
            options={cc}
            value={ccSelected}
            onChange={setCCSelected}
            disabled={cc.length === 0}
            labelledBy={label}
            {...reactSelectProps}
          />
        </FormControl>
      )}
    </>
  );
}

export default CCMultiSelect;
