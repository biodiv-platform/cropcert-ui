import { Box, Button, Heading, Stack, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import BoxHeading from "@components/@core/layout/box-heading";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
} from "@/components/ui/drawer";

import ClearFilters from "./clear-filters";
import FiltersList from "./list";

export const FilterWrapper = styled.div`
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  border-right: 1px solid var(--chakra-colors-gray-300);

  [data-accordion-item] {
    [data-accordion-panel] {
      padding: 0.75rem;
    }

    > button[aria-expanded="true"] {
      background: var(--chakra-colors-gray-100);
    }

    > button > div {
      display: flex;
      flex: 1;
    }
  }
`;

export default function Filters() {
  const { open, onToggle, onClose } = useDisclosure();
  const { t } = useTranslation();
  const isDesktopFilter = useBreakpointValue({ base: false, lg: true });

  return isDesktopFilter ? (
    <Box as={FilterWrapper} gridColumn={{ lg: "1/4" }}>
      <Stack m={4} direction={"row"} align="center" justify="space-between">
        <Heading size="xl">{t("filters:title")}</Heading>
        <ClearFilters />
      </Stack>
      <FiltersList />
    </Box>
  ) : (
    <FilterWrapper>
      <Button w="full" className="toggle-button" onClick={onToggle}>
        {t("filters:toggle")}
      </Button>
      <DrawerRoot open={open} placement="end" onOpenChange={onClose}>
        <DrawerBackdrop>
          <DrawerContent>
            <DrawerCloseTrigger />
            <BoxHeading>{t("filters:title")}</BoxHeading>
            <DrawerBody p={0}>{open && <FiltersList />}</DrawerBody>
          </DrawerContent>
        </DrawerBackdrop>
      </DrawerRoot>
    </FilterWrapper>
  );
}
