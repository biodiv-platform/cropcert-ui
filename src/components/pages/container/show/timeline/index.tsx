import { Badge, Box, ListItem, Text, VStack } from "@chakra-ui/react";
import { formattedTimeStamp } from "@utils/basic";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import LotShowPanel from "../panel";

export const Timeline = ({ activities }) => (
  <LotShowPanel icon="🕓" title="Activity(s)" count={activities.length}>
    <div className="eco--timeline-container">
      <ul className="eco--timeline-container-list">
        {activities.reverse().map((activity) => (
          <Event key={activity.id} activity={activity} />
        ))}
      </ul>
    </div>
  </LotShowPanel>
);

const Event = ({ activity }) => (
  <ListItem display="flex" alignItems="flex-start" className="event">
    <Box as="span" className="icon" mr={3} />
    <VStack align="stretch" gap={2} className="body">
      <Text fontWeight="bold" textTransform="uppercase" className="title">
        {activity.activityType}
      </Text>

      <Text className="description">
        {getMessage(activity.activityType, activity.activityValue)}
        {activity.note && (
          <>
            <br />
            <Text as="span" display="inline">
              🗒️ {activity.note}
            </Text>
          </>
        )}
      </Text>

      <Text color="gray.500" fontSize="sm" className="user">
        &mdash;&emsp;User {activity.userId} on {formattedTimeStamp()}
      </Text>
    </VStack>
  </ListItem>
);

const getMessage = (type, value) => {
  switch (type) {
    case "lotCreation":
      return (
        <>
          ✨ Created <Badge>Lot</Badge> named <Badge>{value}</Badge>
        </>
      );

    default:
      return type.toLowerCase().includes("time") ? (
        <>
          🕓 Updated Time
          <Badge ml={1}>{type}</Badge> <LuArrowRight />
          <Badge ml={1}>{formattedTimeStamp(value)}</Badge>
        </>
      ) : (
        <>
          ✏️ Updated
          <Badge ml={1}>{type}</Badge> <LuArrowRight />
          <Badge ml={1}>{value}</Badge>
        </>
      );
  }
};
