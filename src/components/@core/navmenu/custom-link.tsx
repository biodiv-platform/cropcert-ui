import { chakra } from "@chakra-ui/react";
import React from "react";

export default function CustomLink({ children, item }) {
  return <chakra.a href={item?.url ? item.url : `/page/show/${item.id}`}>{children}</chakra.a>;
}
