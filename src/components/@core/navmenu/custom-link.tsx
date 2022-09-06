import { chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function CustomLink({ children, item }) {
  return (
    <NextLink href={item?.url ? item.url : `/page/show/${item.id}`} passHref={true}>
      <chakra.a>{children}</chakra.a>
    </NextLink>
  );
}
