import "react-datepicker/dist/react-datepicker.css";

import { Box, Input } from "@chakra-ui/react";
import useDocumentFilter from "@components/pages/document/common/use-document-filter";
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

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";

export default function DateRangeFilter({ filterKey, translateKey }: DateRangeFilterProp) {
  const { t } = useTranslation();
  const { filter, setFilter } = useDocumentFilter();
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
    <AccordionItem value="time">
      <AccordionItemTrigger>
        <Box flex={1} textAlign="left">
          {t(translateKey)}
        </Box>
      </AccordionItemTrigger>
      <AccordionItemContent>
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
      </AccordionItemContent>
    </AccordionItem>
  );
}
