import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const UserBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  padding: 1rem;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

export default function CaptionOverlay({ caption }) {
  const truncatedCaption = caption?.length > 50 ? caption.slice(0, 45) + "..." : caption;

  return (
    <UserBox>
      <Text color="white">
        <Flex alignItems="center">
          <div className="ellipsis-1">{truncatedCaption}</div>
        </Flex>
      </Text>
    </UserBox>
  );
}
