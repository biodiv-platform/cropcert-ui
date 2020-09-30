import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  SimpleGrid,
} from "@chakra-ui/core";
import { PageHeading } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import { booleanOrText } from "@utils/basic.util";
import React from "react";

import { FARM_PANEL } from "../../create/panels/data";

const FarmInformation = ({ report }) => (
  <LotShowPanel title={FARM_PANEL.title} icon={FARM_PANEL.icon} isOpen={true} noPadding={true}>
    <Accordion allowToggle={true} allowMultiple={true}>
      {report.farms.map((farm, index) => (
        <AccordionItem>
          <AccordionHeader _expanded={{ bg: "gray.100" }}>
            <Box flex="1" textAlign="left">
              Farm #{index + 1}
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacingY={2}>
              {Object.keys(farm).map((key) => (
                <React.Fragment key={key}>
                  <Box>{FARM_PANEL.keys[key]}</Box>
                  <Box>{booleanOrText(farm[key])}</Box>
                </React.Fragment>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
    <Box p={4}>
      <PageHeading size="md">📑 Summery</PageHeading>
      <SimpleGrid columns={{ sm: 2 }} spacingY={2}>
        {Object.entries(FARM_PANEL.keys.summery).map(([key, title]) => (
          <React.Fragment key={key}>
            <Box>{title}</Box>
            <Box>{booleanOrText(report[key])}</Box>
          </React.Fragment>
        ))}
      </SimpleGrid>
    </Box>
  </LotShowPanel>
);

export default FarmInformation;
