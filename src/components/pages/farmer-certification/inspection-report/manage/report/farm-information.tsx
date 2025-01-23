import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import LotShowPanel from "@components/pages/lot/show/panel";
import { booleanOrText } from "@utils/basic";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

import { FARM_PANEL } from "../../create/panels/data";
import ReportTabs from "./tabs";

const FarmsList = ({ data = [] }) =>
  data.length ? (
    <AccordionRoot multiple={true}>
      {data.map((farm, index) => (
        <AccordionItem value={farm} key={index}>
          <AccordionItemTrigger _expanded={{ bg: "gray.100" }}>
            <Box flex="1" textAlign="left">
              Farm #{index + 1}
            </Box>
          </AccordionItemTrigger>
          <AccordionItemContent pb={4}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gapY={2}>
              {Object.keys(farm).map((key) => (
                <React.Fragment key={key}>
                  <Box>{FARM_PANEL.keys[key]}</Box>
                  <Box>{booleanOrText(farm[key])}</Box>
                </React.Fragment>
              ))}
            </SimpleGrid>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
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
      <PageHeading size="md">📑 Summary</PageHeading>
      <SimpleGrid columns={{ base: 1, sm: showCurrent ? 3 : 2 }} gapY={4}>
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
