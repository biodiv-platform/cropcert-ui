import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import LotShowPanel from "@components/pages/lot/show/panel";
import { formattedDate } from "@utils/basic.util";
import React from "react";

const SignatureBlock = ({ previous, current, showCurrent, title }) => (
  <SimpleGrid columns={{ base: 1, md: 3 }} mb={4} spacingX={2}>
    <Flex alignItems="center">{title} Signature</Flex>
    <Box>
      <Text color="gray.600" fontSize="0.8em">
        Previous
      </Text>
      <img src={previous?.path} />
      {formattedDate(previous?.date)}
    </Box>
    {showCurrent && (
      <Box>
        <Text color="gray.600" fontSize="0.8em">
          New
        </Text>
        <img src={current?.path} />
        {formattedDate(current?.date)}
      </Box>
    )}
  </SimpleGrid>
);

export default function SignatureInformation({ currentReport, previousReport, showCurrent }) {
  return (
    <LotShowPanel title="Previous Signatures" icon="✍️" isOpen={true}>
      <SignatureBlock
        current={currentReport?.farmer}
        previous={previousReport?.farmer}
        showCurrent={showCurrent}
        title="Farmer"
      />
      <SignatureBlock
        current={currentReport?.fieldCoordinator}
        previous={previousReport?.fieldCoordinator}
        showCurrent={showCurrent}
        title="Inspector"
      />
      <SignatureBlock
        current={currentReport?.icsManager}
        previous={previousReport?.icsManager}
        showCurrent={false}
        title="ICS Manager"
      />
    </LotShowPanel>
  );
}
