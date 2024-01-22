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

const EllipsisText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function CaptionOverlay({ caption }) {
  return (
    <UserBox>
      <Text color="white">
        <Flex alignItems="center">
          <EllipsisText>{caption}</EllipsisText>
        </Flex>
      </Text>
    </UserBox>
  );
}
