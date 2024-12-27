import { Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

import TextFilterInput from "./input";

export default function TextFilterPanel({ filterKey, translateKey, useIndexFilter }) {
  const { t } = useTranslation();
  const label = t(translateKey);

  return (
    <AccordionRoot>
      <AccordionItem value={label} pl={4}>
        <Box flex={1} textAlign="left">
          {label}
        </Box>
        <AccordionItemTrigger />
      </AccordionItem>
      <AccordionItemContent>
        <TextFilterInput filterKey={filterKey} label={label} useIndexFilter={useIndexFilter} />
      </AccordionItemContent>
    </AccordionRoot>
  );
}
