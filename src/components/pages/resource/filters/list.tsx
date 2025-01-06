import { Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

import Context from "./context";
import MediaType from "./media-type";
import TagFilterInput from "./tags";
import UserFilterInput from "./user";

export default function FiltersList() {
  const { t } = useTranslation();

  return (
    <AccordionRoot multiple={true} lazyMount>
      <Context />
      <MediaType />

      <AccordionItem value="tags" pl={4}>
        <>
          <AccordionItemTrigger>
            <Box flex={1} textAlign="left">
              {t("Tags")}
            </Box>
          </AccordionItemTrigger>
          <AccordionItemContent>{<TagFilterInput filterKey="tags" />}</AccordionItemContent>
        </>
      </AccordionItem>

      <AccordionItem value="user" pl={4}>
        <>
          <AccordionItemTrigger>
            <Box flex={1} textAlign="left">
              {t("filters:user.title")}
            </Box>
          </AccordionItemTrigger>
          <AccordionItemContent>{<UserFilterInput filterKey="user" />}</AccordionItemContent>
        </>
      </AccordionItem>
    </AccordionRoot>
  );
}
