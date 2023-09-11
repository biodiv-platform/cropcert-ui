import { Spinner } from "@chakra-ui/react";
import { selectStyles } from "@components/form/configs";
import { axMediaGalleryTagsFilterSearch } from "@services/media-gallery.service";
import { axGetUsersByID } from "@services/user.service";
import { MENU_PORTAL_TARGET } from "@static/constants";
import debounce from "debounce-promise";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import useResourceFilter from "../../common/use-resource-filter";

export default function TagFilterInput({ filterKey }) {
  const { filter, addFilter, removeFilter } = useResourceFilter();
  const { t } = useTranslation();
  const [defaultValue, setDefaultValue] = useState<any[]>();

  const onQuery = debounce(axMediaGalleryTagsFilterSearch, 200);

  useEffect(() => {
    axGetUsersByID(filter?.[filterKey]).then(setDefaultValue);
  }, []);

  const handleOnChange = (values) => {
    if (values?.length > 0) {
      addFilter(filterKey, values.map(({ label }) => label).toString());
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
      placeholder={t("Tags")}
      styles={selectStyles}
    />
  ) : (
    <Spinner />
  );
}
