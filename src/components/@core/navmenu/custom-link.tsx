import { chakra, Link } from "@chakra-ui/react";
import React from "react";

export default function CustomLink({ children, item }) {
  return (
    <Link href={item?.url ? item.url : `/page/show/${item.id}`}>
      <chakra.a>{children}</chakra.a>
    </Link>
  );
}
