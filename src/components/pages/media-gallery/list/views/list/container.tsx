import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { RESOURCE_SIZE } from "@static/constants";
import { formatDateFromUTC, timeAgoUTC } from "@utils/date";
import { getResourceThumbnail } from "@utils/media";
import React from "react";

export default function Container({ o }) {
  const imgURL = getResourceThumbnail("RESOURCE", o.reprImage, RESOURCE_SIZE.DEFAULT);

  return (
    <>
      <Link href={`/media-gallery/show/${o.id}`} style={{ textDecoration: "none" }}>
        <Flex
          className="white-box fade view_list"
          direction={["column", "column", "row", "row"]}
          justify="space-between"
          alignItems="center"
          mb={4}
          overflow="hidden"
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
          p={2}
          _hover={{
            bg: "gray.200",
            transition: "background-color 0.3s ease",
          }}
        >
          <Image
            objectFit="cover"
            bg="gray.100"
            w="40"
            h="40"
            borderTopRadius="md"
            src={imgURL}
            alt={o.resourceId?.toString()}
          />
          <Box flex="2" pl={[0, 0, 4, 4]}>
            <Text fontWeight="bold" fontSize="lg" mb={1}>
              {o.name}
            </Text>
            <Text color="gray.600" mb={1}>
              {o.description}
            </Text>
            <Text color="gray.400" mb={1}>
              Last Updated: {timeAgoUTC(o.lastUpdated)}
            </Text>
            <Text color="gray.400" mb={1}>
              Created On: {formatDateFromUTC(o.createdOn)}
            </Text>
            <Text color="gray.400">Total Media: {o.totalMedia}</Text>
          </Box>
        </Flex>
      </Link>
    </>
  );
}
