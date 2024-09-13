import { Spinner } from "@chakra-ui/react";
import { selectStyles } from "@components/form/configs";
import { axFarmerFilterSearch } from "@services/farmer.service";
import { axGetUsersByID } from "@services/user.service";
import { MENU_PORTAL_TARGET } from "@static/constants";
import debounce from "debounce-promise";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import useFarmerFilter from "../../use-farmer-filter";

export default function UserFilterInput({ filterKey }) {
  const { filter, addFilter, removeFilter, ccCodes } = useFarmerFilter();
  const { t } = useTranslation();
  const [defaultValue, setDefaultValue] = useState<any[]>();

  // Create a debounced version of axFarmerFilterSearch with `ccCodes`
  const onQuery = debounce(async (name) => {
    // Ensure `ccCodes` is included in the query
    const data = await axFarmerFilterSearch(name, ccCodes);
    return data;
  }, 200);

  useEffect(() => {
    axGetUsersByID(filter?.[filterKey]).then(setDefaultValue);
  }, [filter, filterKey]);

  const handleOnChange = (values) => {
    console.warn("values", values);
    if (values?.length > 0) {
      addFilter(filterKey, values.map(({ value }) => value).toString());
    } else {
      removeFilter(filterKey);
    }
  };

  return defaultValue ? (
    <AsyncSelect
      name={filterKey}
      inputId={filterKey}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      noOptionsMessage={() => null}
      defaultValue={defaultValue}
      isClearable={true}
      isMulti={true}
      isSearchable={true}
      loadOptions={onQuery}
      menuPortalTarget={MENU_PORTAL_TARGET}
      onChange={handleOnChange}
      placeholder={t("filters:user.search")}
      styles={selectStyles}
      formatOptionLabel={(option) => `${option.label} (${option.value})`}
    />
  ) : (
    <Spinner />
  );
}
