import Tooltip from "@components/@core/tooltip";
import VerifiedIcon from "@icons/verified";
import React from "react";

const Badge = ({ isAdmin }) =>
  isAdmin ? (
    <Tooltip showArrow={true} positioning={{ placement: "right" }} title="Administrator">
      <VerifiedIcon color="green.500" />
    </Tooltip>
  ) : null;

export default Badge;
