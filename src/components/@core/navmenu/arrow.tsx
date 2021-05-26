import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";
import MenuIcon from "src/icons/menu";

export default function Arrow({ direction = "d" }) {
  switch (direction) {
    case "r":
      return <ChevronRightIcon />;

    case "h":
      return <MenuIcon />;

    default:
      return <ChevronDownIcon />;
  }
}
