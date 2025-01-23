import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import LotShowPanel from "@components/pages/lot/show/panel";
import { booleanOrText } from "@utils/basic";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

import { ANIMALS_PANEL } from "../../create/panels/data";
import ReportTabs from "./tabs";

const AnimalsList = ({ data = [] }) =>
  data.length ? (
    <AccordionRoot multiple={true}>
      {data.map((animal: any) => (
        <AccordionItem value={animal.id} key={animal.id}>
          <AccordionItemTrigger _expanded={{ bg: "gray.100" }}>
            <Box flex="1" textAlign="left">
              {animal.type}
            </Box>
          </AccordionItemTrigger>
          <AccordionItemContent pb={4}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gapY={2}>
              {Object.entries(ANIMALS_PANEL.keys.animals).map(([key, title]) => (
                <React.Fragment key={key}>
                  <Box>{title}</Box>
                  <Box>{booleanOrText(animal[key])}</Box>
                </React.Fragment>
              ))}
            </SimpleGrid>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  ) : (
    <Box p={4}>No Animals</Box>
  );
const AnimalsInformation = ({ currentReport, previousReport, showCurrent }) => (
  <LotShowPanel
    title={ANIMALS_PANEL.title}
    icon={ANIMALS_PANEL.icon}
    isOpen={true}
    noPadding={true}
  >
    <SimpleGrid columns={{ base: 1, md: showCurrent ? 3 : 2 }} gapY={2} p={4}>
      {Object.entries(ANIMALS_PANEL.keys.general).map(([key, title]) => (
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
    <ReportTabs
      component={AnimalsList}
      previousProps={previousReport?.animals}
      currentProps={currentReport?.animals}
      showCurrent={showCurrent}
    />
  </LotShowPanel>
);

export default AnimalsInformation;
