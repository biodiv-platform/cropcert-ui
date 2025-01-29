import { Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";

import { NumberFilter } from "./range";

export interface NumberRangeFilterProps {
  label?: string;
  useIndexFilter;
  translateKey?: string;
  filterKey: string;
  min;
  max;
}

export default function NumberRangeFilterPanel({
  label,
  translateKey,
  useIndexFilter,
  filterKey,
  min,
  max,
}: NumberRangeFilterProps) {
  const { t } = useTranslation();

  return (
    <AccordionItem value={filterKey} pl={4}>
      <AccordionItemTrigger pr={4}>
        <Box flex={1} textAlign="left">
          {label || t(translateKey + "title")}
        </Box>
      </AccordionItemTrigger>
      <AccordionItemContent>
        <NumberFilter useIndexFilter={useIndexFilter} filterKey={filterKey} min={min} max={max} />
      </AccordionItemContent>
    </AccordionItem>
  );
}
