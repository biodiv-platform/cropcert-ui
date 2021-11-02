import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import LotShowPanel from "@components/pages/lot/show/panel";
import { booleanOrText } from "@utils/basic.util";
import React from "react";

import { CERT_PANEL } from "../../create/panels/data";

const CertificationInformation = ({ currentReport, previousReport, showCurrent }) => (
  <LotShowPanel title={CERT_PANEL.title} icon={CERT_PANEL.icon} isOpen={true}>
    {Object.entries(CERT_PANEL.keys).map(([key, title], index) => (
      <SimpleGrid
        key={key}
        columns={{ base: 1, md: showCurrent ? 3 : 2 }}
        mb={4}
        spacingX={2}
        data-odd={index % 2 === 0}
      >
        <Flex alignItems="center">{title}</Flex>
        <Box>
          <Text color="gray.600" fontSize="0.8em">
            Previous
          </Text>
          {booleanOrText(previousReport?.[key], true) || "NA"}
        </Box>
        {showCurrent && (
          <Box>
            <Text color="gray.600" fontSize="0.8em">
              New
            </Text>
            {booleanOrText(currentReport[key], true)}
          </Box>
        )}
      </SimpleGrid>
    ))}
  </LotShowPanel>
);

export default CertificationInformation;
