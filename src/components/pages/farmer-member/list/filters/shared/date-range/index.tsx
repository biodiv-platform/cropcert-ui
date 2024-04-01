import "react-datepicker/dist/react-datepicker.css";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Input,
} from "@chakra-ui/react";
import useFarmerMemberFilter from "@components/pages/farmer-member/common/use-farmer-member-filter";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import dayjs from "@utils/date";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";

interface MinMaxKey {
  min: any;
  max: any;
}

interface DateRangeFilterProp {
  filterKey: MinMaxKey;
  translateKey: string;
}

export default function DateRangeFilter({ filterKey, translateKey }: DateRangeFilterProp) {
  const { t } = useTranslation();
  const { filter, setFilter } = useFarmerMemberFilter();
  const defaultDate = useMemo(
    () =>
      filter[filterKey.min]
        ? [
            dayjs(filter[filterKey.min]).toDate(),
            filter[filterKey.max] ? dayjs(filter[filterKey.max]).toDate() : null,
          ]
        : [null, null],
    []
  );

  const [dateRange, setDateRange] = useState(defaultDate);

  useDidUpdateEffect(() => {
    setFilter((_draft) => {
      if (dateRange[0]) {
        _draft.f[filterKey.min] = dayjs(dateRange[0]).utc().format();
        _draft.f[filterKey.max] = dateRange[1]
          ? dayjs(dateRange[1]).endOf("day").utc().format()
          : undefined;
      } else {
        _draft.f[filterKey.min] = undefined;
        _draft.f[filterKey.max] = undefined;
      }
    });
  }, [dateRange]);

  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex={1} textAlign="left">
          {t(translateKey)}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <DatePicker
          selectsRange={true}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          maxDate={new Date()}
          dateFormat="dd-MM-yyyy"
          customInput={<Input />}
          onChange={(update) => {
            setDateRange(update);
          }}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}
