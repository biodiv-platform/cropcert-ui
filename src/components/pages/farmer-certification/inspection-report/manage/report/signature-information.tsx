import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import LotShowPanel from "@components/pages/lot/show/panel";
import { ENDPOINT } from "@static/constants";
import { formattedDate } from "@utils/basic";
import React from "react";

const SIGNATURE_URL_PREFIX = `${ENDPOINT.FILES}/get/raw/signature`;

const SignatureBlock = ({ previous, current, showCurrent, title }) => (
  <SimpleGrid columns={{ base: 1, md: 3 }} mb={4} gapX={2}>
    <Flex alignItems="center">{title} Signature</Flex>
    <Box>
      <Text color="gray.600" fontSize="0.8em">
        Previous
      </Text>
      <img src={SIGNATURE_URL_PREFIX + previous?.path} />
      {formattedDate(previous?.date)}
    </Box>
    {showCurrent && (
      <Box>
        <Text color="gray.600" fontSize="0.8em">
          New
        </Text>
        <img src={SIGNATURE_URL_PREFIX + current?.path} />
        {formattedDate(current?.date)}
      </Box>
    )}
  </SimpleGrid>
);

export default function SignatureInformation({ currentReport, previousReport, showCurrent }) {
  return (
    <LotShowPanel title="Previous Signatures and Photos" icon="✍️" isOpen={true}>
      {currentReport.geoLocation && (
        <Box
          as="iframe"
          // src={`https://maps.google.com/maps?q=${currentReport.geoLocation}&z=7&output=embed`}
          width="100%"
          height={300}
          // frameBorder="0"
          border={0}
          borderRadius="md"
          mb={4}
        ></Box>
      )}
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
