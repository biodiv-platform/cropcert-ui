import Tooltip from "@components/@core/tooltip";
import React from "react";
import { LuBadgeCheck } from "react-icons/lu";

const Badge = ({ isAdmin }) =>
  isAdmin ? (
    <Tooltip showArrow={true} positioning={{ placement: "right" }} title="Administrator">
      <LuBadgeCheck color="green" />
    </Tooltip>
  ) : null;

export default Badge;
