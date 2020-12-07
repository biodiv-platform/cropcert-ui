import { Icon } from "@chakra-ui/core";
import React from "react";

export default function Arrow({ direction = "d" }) {
  switch (direction) {
    case "r":
      return <Icon name="chevron-right" />;

    case "h":
      return <Icon name="menu" />;

    default:
      return <Icon name="chevron-down" />;
  }
}
