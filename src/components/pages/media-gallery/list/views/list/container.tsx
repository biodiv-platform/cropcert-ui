import { Card, Flex, Image, Link, Text } from "@chakra-ui/react";
import { RESOURCE_SIZE } from "@static/constants";
import { formatDateFromUTC, timeAgoUTC } from "@utils/date";
import { getNextResourceThumbnail } from "@utils/media";
import React from "react";

export default function Container({ o }) {
  const imgURL = getNextResourceThumbnail(o.reprImage, RESOURCE_SIZE.DEFAULT);

  return (
    <Flex direction="column" w="100%" mb={4}>
      <Link href={`/media-gallery/show/${o.id}`} style={{ textDecoration: "none" }}>
        <Card.Root
          _hover={{
            bg: "gray.200",
            transition: "background-color 0.3s ease",
          }}
          flexDirection="row"
          alignItems="center"
          pl="2"
          overflow="hidden"
          w="100%"
        >
          <Image
            fit="cover"
            bg="gray.100"
            w="40"
            h="40"
            borderTopRadius="md"
            src={imgURL}
            alt={o.resourceId?.toString()}
          />
          <Card.Body>
            <Card.Title mb="2">{o.name}</Card.Title>
            <Card.Description>{o.description}</Card.Description>
            <Text color="gray.400" mb={1}>
              Last Updated: {timeAgoUTC(o.lastUpdated)}
            </Text>
            <Text color="gray.400" mb={1}>
              Created On: {formatDateFromUTC(o.createdOn)}
            </Text>
            <Text color="gray.400">Total Media: {o.totalMedia}</Text>
          </Card.Body>
        </Card.Root>
      </Link>
    </Flex>
  );
}
