import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import useUserListFilter from "@components/pages/user/common/use-user-filter";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import EmailFilter from "./email";
import InstituteFilter from "./institute";
import Location from "./location/map-area";
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
    <Accordion defaultIndex={[0]} allowMultiple={true}>
      <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            {t("filters:location.title")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Location />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            {t("filters:time.title")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <TimeFilter />
        </AccordionPanel>
      </AccordionItem>

      <SexTypeFilter />

      {isAdmin && <EmailFilter />}

      <InstituteFilter />

      {isAdmin && <PhoneNumberFilter />}

      <ProfessionFilter />

      {isAdmin && <UserNameFilter />}

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                {t("filters:user.title")}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <UserFilter filterKey="user" />}</AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
