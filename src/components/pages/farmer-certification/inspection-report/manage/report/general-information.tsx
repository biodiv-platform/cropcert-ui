import { Box, SimpleGrid } from "@chakra-ui/core";
import LotShowPanel from "@components/pages/lot/show/panel";
import { booleanOrText } from "@utils/basic.util";
import React from "react";

import { GI_PANEL } from "../../create/panels/data";

const GeneralInformation = ({ report }) => (
  <LotShowPanel title={GI_PANEL.title} icon={GI_PANEL.icon} isOpen={true}>
    {Object.entries(GI_PANEL.keys).map(([key, title], index) => (
      <SimpleGrid key={key} columns={{ base: 1, md: 2 }} mb={2} data-odd={index % 2 === 0}>
        <Box>{title}</Box>
        <Box>{booleanOrText(report[key])}</Box>
      </SimpleGrid>
    ))}
  </LotShowPanel>
);

export default GeneralInformation;
