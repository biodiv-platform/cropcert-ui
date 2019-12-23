import React from "react";
import { MdChevronRight, MdExpandMore, MdMenu } from "react-icons/md";

export default function Arrow({ direction = "d", ...props }) {
  switch (direction) {
    case "r":
      return <MdChevronRight />;

    case "h":
      return <MdMenu />;

    default:
      return <MdExpandMore />;
  }
}
