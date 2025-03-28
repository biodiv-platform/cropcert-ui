import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

import { Tag } from "@/components/ui/tag";

interface LinkTagProps {
  label;
  href?;
  hardLink?: boolean;
}

export default function LinkTag({ label, href = "/observation/list" }: LinkTagProps) {
  return (
    <Link href={{ pathname: href, query: { tags: label } }}>
      <ChakraLink>
        <Tag size="sm" key={label} colorPalette="blue" mb={2} mr={2}>
          {label}
        </Tag>
      </ChakraLink>
    </Link>
  );
}
