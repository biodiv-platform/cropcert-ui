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

import { ANIMALS_PANEL } from "../../create/panels/data";

const AnimalsInformation = ({ report }) => (
  <LotShowPanel
    title={ANIMALS_PANEL.title}
    icon={ANIMALS_PANEL.icon}
    isOpen={true}
    noPadding={true}
  >
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacingY={2} p={4}>
      {Object.entries(ANIMALS_PANEL.keys.general).map(([key, title]) => (
        <React.Fragment key={key}>
          <Box>{title}</Box>
          <Box>{booleanOrText(report[key])}</Box>
        </React.Fragment>
      ))}
    </SimpleGrid>
    <Accordion allowToggle={true} allowMultiple={true}>
      {report.animals.map((animal) => (
        <AccordionItem key={animal.id}>
          <AccordionHeader _expanded={{ bg: "gray.100" }}>
            <Box flex="1" textAlign="left">
              {animal.type}
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacingY={2}>
              {Object.entries(ANIMALS_PANEL.keys.animals).map(([key, title]) => (
                <React.Fragment key={key}>
                  <Box>{title}</Box>
                  <Box>{booleanOrText(animal[key])}</Box>
                </React.Fragment>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  </LotShowPanel>
);

export default AnimalsInformation;
