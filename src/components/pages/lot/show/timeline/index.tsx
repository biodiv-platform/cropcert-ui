import "./style.scss";

import { Badge, Icon } from "@chakra-ui/core";
import { formattedTimeStamp } from "@utils/basic.util";
import React from "react";

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
  <li className="event">
    <label className="icon" />
    <div className="body">
      <p className="title">{activity.activityType.toUpperCase()}</p>
      <div className="description">
        {getMessage(activity.activityType, activity.activityValue)}
        {activity.note && (
          <>
            <br />
            🗒️ {activity.note}
          </>
        )}
      </div>
      <div className="user mt-3">
        &mdash;&emsp;User {activity.userId} on {formattedTimeStamp()}
      </div>
    </div>
  </li>
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
          <Badge ml={1}>{type}</Badge> <Icon name="arrow-forward" />
          <Badge ml={1}>{formattedTimeStamp(value)}</Badge>
        </>
      ) : (
        <>
          ✏️ Updated
          <Badge ml={1}>{type}</Badge> <Icon name="arrow-forward" />
          <Badge ml={1}>{value}</Badge>
        </>
      );
  }
};
