import { Box, Flex, Text } from "@chakra-ui/react";
import { ACTIVITY_TYPE } from "@static/traceability";
import React from "react";

import LotShowPanel from "./panel";

export default function LotActivity({ rows }) {
  return (
    <LotShowPanel icon="📜" title="Activity" isOpen={true}>
      <>
        {rows.length > 0 ? (
          rows.map((row, index) => (
            <Box
              key={index}
              p={4}
              borderWidth={1}
              borderColor={"gray.200"}
              rounded="md"
              my={2}
              shadow={"md"}
            >
              <Flex justify="space-between">
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {ACTIVITY_TYPE[row["activityType"]]}
                  </Text>
                  <Text fontSize="sm" color={"gray.500"}>
                    {row["activityDescription"]}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color={"gray.500"}>
                    {new Date(row["dateCreated"]).toLocaleString()}
                  </Text>
                  <Text fontSize="sm" color={"gray.500"}>
                    UserId: {row["authorId"]}
                  </Text>
                </Box>
              </Flex>
              <Text>{row["note"]}</Text>
            </Box>
          ))
        ) : (
          <Text>No activity found</Text>
        )}
      </>
    </LotShowPanel>
  );
}
