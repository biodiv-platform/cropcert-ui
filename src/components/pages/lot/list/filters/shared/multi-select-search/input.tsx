import { selectStyles } from "@components/form/configs";
import { axLotFilterAutoCompleteSearch } from "@services/lot.service";
import { MENU_PORTAL_TARGET } from "@static/constants";
import debounce from "debounce-promise";
import React, { useMemo } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

export interface FilterMultiSelectProps {
  label?: string;
  model?;
  useIndexFilter;
  translateKey?: string;
  filterKey: string;
  options?;
}

const arrayToOptions = (options) => options && options.map((value) => ({ value, label: value }));

export default function FilterMultiSelectInput({
  label,
  model,
  useIndexFilter,
  filterKey,
  options,
}: FilterMultiSelectProps) {
  const { filter, addFilter, removeFilter, coCodes } = useIndexFilter();

  const S: any = options?.length ? Select : AsyncSelect;

  const searchKey = filterKey;

  const onQuery = debounce((q) => axLotFilterAutoCompleteSearch(searchKey, q, coCodes, model), 200);

  const defaultValue = useMemo(
    () => (filter?.[filterKey] ? arrayToOptions(filter?.[filterKey]?.split(",")) : []),
    []
  );

  const handleOnChange = (values) => {
    if (values?.length > 0) {
      addFilter(filterKey, values.map((item) => item.label).toString());
    } else {
      removeFilter(filterKey);
    }
  };

  return (
    <S
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
      options={arrayToOptions(options)}
      placeholder={label}
      styles={selectStyles}
    />
  );
}

FilterMultiSelectInput.whyDidYouRender = true;
