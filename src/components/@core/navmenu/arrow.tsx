import React from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import MenuIcon from "src/icons/menu";

export default function Arrow({ direction = "d" }) {
  switch (direction) {
    case "r":
      return <LuChevronRight />;

    case "h":
      return <MenuIcon />;

    default:
      return <LuChevronDown />;
  }
}
