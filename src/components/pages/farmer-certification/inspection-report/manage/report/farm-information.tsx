import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/core";
import { PageHeading } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import { booleanOrText } from "@utils/basic.util";
import React from "react";

import { FARM_PANEL } from "../../create/panels/data";
import ReportTabs from "./tabs";

const FarmsList = ({ data = [] }) =>
  data.length ? (
    <Accordion allowToggle={true} allowMultiple={true}>
      {data.map((farm, index) => (
        <AccordionItem key={index}>
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
  ) : (
    <Box p={4}>No Farms</Box>
  );

const FarmInformation = ({ currentReport, previousReport, showCurrent }) => (
  <LotShowPanel title={FARM_PANEL.title} icon={FARM_PANEL.icon} isOpen={true} noPadding={true}>
    <ReportTabs
      component={FarmsList}
      previousProps={previousReport?.farms}
      currentProps={currentReport?.farms}
      showCurrent={showCurrent}
    />
    <Box p={4}>
      <PageHeading size="md">📑 Summery</PageHeading>
      <SimpleGrid columns={{ base: 1, sm: showCurrent ? 3 : 2 }} spacingY={4}>
        {Object.entries(FARM_PANEL.keys.summery).map(([key, title]) => (
          <React.Fragment key={key}>
            <Flex alignItems="center">{title}</Flex>
            <Box>
              <Text color="gray.600" fontSize="0.8em">
                Previous
              </Text>
              {booleanOrText(previousReport?.[key]) || "NA"}
            </Box>
            {showCurrent && (
              <Box>
                <Text color="gray.600" fontSize="0.8em">
                  New
                </Text>
                {booleanOrText(currentReport[key])}
              </Box>
            )}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </Box>
  </LotShowPanel>
);

export default FarmInformation;
