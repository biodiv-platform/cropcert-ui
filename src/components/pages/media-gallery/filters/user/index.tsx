import { Box, Spinner } from "@chakra-ui/react";
import { selectStyles } from "@components/form/configs";
import { axGetUsersByID, axUserFilterSearch } from "@services/user.service";
import { MENU_PORTAL_TARGET } from "@static/constants";
import debounce from "debounce-promise";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";

import useMediaGalleryFilter from "../../common/use-media-gallery-filter";

export default function UserFilterInput({ filterKey }) {
  const { filter, addFilter, removeFilter } = useMediaGalleryFilter();
  const { t } = useTranslation();
  const [defaultValue, setDefaultValue] = useState<any[]>();

  const onQuery = debounce(axUserFilterSearch, 200);

  useEffect(() => {
    axGetUsersByID(filter?.[filterKey]).then(setDefaultValue);
  }, []);

  const handleOnChange = (values) => {
    if (values?.length > 0) {
      addFilter(filterKey, values.map(({ value }) => value).toString());
    } else {
      removeFilter(filterKey);
    }
  };

  return (
    <AccordionItem value={filterKey} pl={4}>
      <>
        <AccordionItemTrigger>
          <Box flex={1} textAlign="left">
            {t("filters:user.title")}
          </Box>
        </AccordionItemTrigger>
        <AccordionItemContent>
          {defaultValue ? (
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
            />
          ) : (
            <Spinner />
          )}
        </AccordionItemContent>
      </>
    </AccordionItem>
  );
}
