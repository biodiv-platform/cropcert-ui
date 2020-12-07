import { Link } from "@chakra-ui/core";
import { PAGE_TYPE_OPTIONS } from "@static/constants";
import NextLink from "next/link";
import React from "react";

export default function CustomLink({ children, item }) {
  const link =
    item["pageType"] && item.pageType === PAGE_TYPE_OPTIONS.CONTENT.value
      ? `/page/show/${item.id}`
      : item.url;

  return (
    <NextLink href={link} passHref={true}>
      <Link>{children}</Link>
    </NextLink>
  );
}
