import "flatpickr/dist/themes/material_blue.css";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Input,
} from "@chakra-ui/react";
import dayjs from "@utils/date";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import Flatpickr from "react-flatpickr";

interface DateRangeFilterProp {
  filterKey: string;
  translateKey: string;
  useIndexFilter;
}

export default function DateRangeFilter({
  filterKey,
  translateKey,
  useIndexFilter,
}: DateRangeFilterProp) {
  const { t } = useTranslation();
  const { filter, setFilter } = useIndexFilter();

  const defaultDate = useMemo(() => {
    if (filter[filterKey]) {
      const [minDate, maxDate] = filter[filterKey].split(",");
      return [dayjs(minDate).toDate(), dayjs(maxDate || "today").toDate()];
    }
  }, [filter, filterKey]);

  const options = {
    defaultDate: defaultDate,
    allowInput: true,
    maxDate: "today",
    dateFormat: "d-m-Y",
    mode: "range",
  };

  const handleOnDateChange = (dates = []) => {
    setFilter((_draft) => {
      if (dates.length > 0) {
        const minDate = dayjs(dates[0]).startOf("day").utc().format();
        const maxDate = dates[1] ? dayjs(dates[1]).endOf("day").utc().format() : minDate;
        if (minDate === maxDate) {
          _draft.f[filterKey] = `${minDate},${maxDate}`;
        } else {
          _draft.f[filterKey] = `${minDate},${maxDate}`;
        }
      } else {
        _draft.f[filterKey] = undefined;
      }
    });
    console.debug(dates);
  };

  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex={1} textAlign="left">
          {t(translateKey)}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Flatpickr
          options={options}
          onChange={handleOnDateChange}
          render={({ defaultValue, value, ...props }, ref) => (
            <Input {...props} placeholder={t(translateKey)} defaultValue={defaultValue} ref={ref} />
          )}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}
