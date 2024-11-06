import { Box } from "@chakra-ui/react";
import { ShowActivityIbp } from "@interfaces/activity";
import React from "react";

import ACTIVITY_TYPE from "./activity-types";
import CommentRender from "./comment-render";

const ContentBox = ({ activity }: { activity: ShowActivityIbp }) => {
  const at = activity.activityIbp?.activityType;

  switch (at) {
    case ACTIVITY_TYPE.ADDED_A_COMMENT:
      return <CommentRender html={activity?.commentsIbp?.body} />;

    default:
      return (
        <Box>
          <Box whiteSpace="pre-line">{activity?.activityIbp?.activityDescription}</Box>
        </Box>
      );
  }
};

export default ContentBox;
