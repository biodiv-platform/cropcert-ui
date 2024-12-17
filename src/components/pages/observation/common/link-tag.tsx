import { Link, Tag } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface LinkTagProps {
  label;
  href?;
  hardLink?: boolean;
}

export default function LinkTag({ label, href = "/observation/list" }: LinkTagProps) {
  return (
    <NextLink href={{ pathname: href, query: { tags: label } }} legacyBehavior>
      <Link>
        <Tag size="sm" key={label} colorScheme="blue" mb={2} mr={2}>
          {label}
        </Tag>
      </Link>
    </NextLink>
  );
}
