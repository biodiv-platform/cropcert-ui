import { Box, Stack, Text } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import Badge from "@components/@core/user/badge";
import useActivity from "@hooks/use-activity";
import { ACTIVITY_UPDATED } from "@static/events";
import { toKey } from "@utils/basic";
import { formatTimeStampFromUTC, timeAgoUTC } from "@utils/date";
import { getUserImage } from "@utils/media";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { useListener } from "react-gbus";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Tooltip from "../tooltip";
import ContentBox from "./content-box";

export default function ActivityList({ resourceId, resourceType }) {
  const { t } = useTranslation();
  const activity = useActivity();

  const loadActivity = (reset) => {
    activity.loadMore(resourceType, resourceId, reset);
  };

  useEffect(() => {
    loadActivity(true);
  }, []);

  useListener(
    (oId) => {
      if (oId === resourceId) {
        loadActivity(true);
      }
    },
    [ACTIVITY_UPDATED]
  );

  const ActivityType = ({ type }) => (
    <Text color="gray.600" as="i">
      {t(`activity:${toKey(type).toLowerCase()}`)}
    </Text>
  );

  return (
    <>
      {activity.data.list.map((a: any) => (
        <Stack
          key={a?.activityIbp?.dateCreated}
          direction={"row"}
          gap={3}
          p={4}
          borderBottom="1px"
          borderColor="gray.300"
          className="fade"
        >
          <Avatar
            size="sm"
            name={a.userIbp.name}
            src={getUserImage(a.userIbp.profilePic, a.userIbp.name)}
          />
          <Box>
            <BlueLink fontWeight="bold" mr={2} href={`/user/show/${a.userIbp.id}`}>
              {a.userIbp.name} <Badge isAdmin={a.userIbp.isAdmin} />
            </BlueLink>
            <ActivityType type={a.activityIbp.activityType} />
            <ContentBox activity={a} />
            <Box>
              <Tooltip title={formatTimeStampFromUTC(a.activityIbp.lastUpdated)} showArrow={true}>
                <Text color="gray.600" as="small">
                  {timeAgoUTC(a.activityIbp.lastUpdated)}
                </Text>
              </Tooltip>
            </Box>
          </Box>
        </Stack>
      ))}
      {activity.data.hasMore && (
        <Button
          w="full"
          rounded={0}
          loading={activity.isLoading}
          onClick={() => loadActivity(false)}
          variant={"subtle"}
          fontWeight={"bold"}
        >
          {t("activity:load_more_activity")}
        </Button>
      )}
    </>
  );
}
