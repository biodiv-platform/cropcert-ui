import { Box } from "@chakra-ui/react";
import useUserListFilter from "@components/pages/user/common/use-user-filter";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

import EmailFilter from "./email";
import InstituteFilter from "./institute";
import MapAreaFilter from "./location/map-area";
import PhoneNumberFilter from "./phone";
import ProfessionFilter from "./profession";
import SexTypeFilter from "./sex-type";
import TimeFilter from "./time";
import UserFilter from "./user";
import UserNameFilter from "./username";

export default function FiltersList() {
  const { t } = useTranslation();
  const { isAdmin } = useUserListFilter();

  return (
    <AccordionRoot multiple={true} lazyMount defaultValue={["location"]}>
      <AccordionItem value="location">
        <AccordionItemTrigger>
          <Box flex={1} textAlign="left" pl={4}>
            {t("filters:location.title")}
          </Box>
        </AccordionItemTrigger>
        <AccordionItemContent>
          <MapAreaFilter />
        </AccordionItemContent>
      </AccordionItem>

      <AccordionItem value="time">
        <AccordionItemTrigger>
          <Box flex={1} textAlign="left" pl={4}>
            {t("filters:time.title")}
          </Box>
        </AccordionItemTrigger>
        <AccordionItemContent>
          <TimeFilter />
        </AccordionItemContent>
      </AccordionItem>

      <SexTypeFilter />

      {isAdmin && <EmailFilter />}

      <InstituteFilter />

      {isAdmin && <PhoneNumberFilter />}

      <ProfessionFilter />

      {isAdmin && <UserNameFilter />}

      <AccordionItem value="user" pl={4}>
        <>
          <AccordionItemTrigger>
            <Box flex={1} textAlign="left">
              {t("filters:user.title")}
            </Box>
          </AccordionItemTrigger>
          <AccordionItemContent>{<UserFilter filterKey="user" />}</AccordionItemContent>
        </>
      </AccordionItem>
    </AccordionRoot>
  );
}
