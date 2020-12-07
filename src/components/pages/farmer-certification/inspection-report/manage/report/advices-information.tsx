import { Box, Flex, List, ListItem, SimpleGrid, Text } from "@chakra-ui/core";
import LotShowPanel from "@components/pages/lot/show/panel";
import { booleanOrText } from "@utils/basic.util";
import React from "react";

import { ADVICES_PANEL } from "../../create/panels/data";
import ReportTabs from "./tabs";

const AdvicesList = ({ data }) =>
  data ? (
    <List as="ol" styleType="decimal" p={4} pt={0}>
      {data.map(({ id, advice }) => (
        <ListItem key={id}>{advice}</ListItem>
      ))}
    </List>
  ) : (
    <Box p={4}>No Advices</Box>
  );

const AdvicesInformation = ({ currentReport, previousReport, showCurrent }) => (
  <LotShowPanel
    title={ADVICES_PANEL.title}
    icon={ADVICES_PANEL.icon}
    isOpen={true}
    noPadding={true}
  >
    <SimpleGrid columns={{ base: 1, sm: showCurrent ? 3 : 2 }} spacingY={2} p={4}>
      <React.Fragment>
        <Flex alignItems="center">{ADVICES_PANEL.keys.hasFarmerImplementedPreviousAdvice}</Flex>
        <Box>
          <Text color="gray.600" fontSize="0.8em">
            Previous
          </Text>
          {booleanOrText(previousReport?.hasFarmerImplementedPreviousAdvice) || "NA"}
        </Box>
        {showCurrent && (
          <Box>
            <Text color="gray.600" fontSize="0.8em">
              New
            </Text>
            {booleanOrText(currentReport?.hasFarmerImplementedPreviousAdvice)}
          </Box>
        )}
      </React.Fragment>
    </SimpleGrid>
    <ReportTabs
      component={AdvicesList}
      previousProps={previousReport?.advice}
      currentProps={currentReport?.advice}
      showCurrent={showCurrent}
    />
  </LotShowPanel>
);

export default AdvicesInformation;
