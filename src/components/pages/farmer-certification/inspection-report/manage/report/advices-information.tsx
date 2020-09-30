import { Box, List, ListItem, SimpleGrid } from "@chakra-ui/core";
import LotShowPanel from "@components/pages/lot/show/panel";
import { booleanOrText } from "@utils/basic.util";
import React from "react";

import { ADVICES_PANEL } from "../../create/panels/data";

const AdvicesInformation = ({ report }) => (
  <LotShowPanel
    title={ADVICES_PANEL.title}
    icon={ADVICES_PANEL.icon}
    isOpen={true}
    noPadding={true}
  >
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacingY={2} p={4}>
      <React.Fragment>
        <Box>{ADVICES_PANEL.keys.hasFarmerImplementedPreviousAdvice}</Box>
        <Box>{booleanOrText(report.hasFarmerImplementedPreviousAdvice)}</Box>
      </React.Fragment>
    </SimpleGrid>
    <List as="ol" styleType="decimal" p={4} pt={0}>
      {report.advices.map(({ id, advice }) => (
        <ListItem key={id}>
          {advice}
        </ListItem>
      ))}
    </List>
  </LotShowPanel>
);

export default AdvicesInformation;
