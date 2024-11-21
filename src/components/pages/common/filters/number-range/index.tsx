import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

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
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Box flex={1} textAlign="left">
              {label || t(translateKey + "title")}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            {isExpanded && (
              <NumberFilter
                useIndexFilter={useIndexFilter}
                filterKey={filterKey}
                min={min}
                max={max}
              />
            )}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
