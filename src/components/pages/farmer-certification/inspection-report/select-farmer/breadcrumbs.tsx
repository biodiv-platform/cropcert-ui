import Link from "next/link";
import React from "react";

import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb";

export default function Breadcrumbs({ ccName, coName, unionName }) {
  return (
    <BreadcrumbRoot
      bg="white"
      px={4}
      py={2}
      borderRadius="md"
      border="1px solid"
      borderColor="gray.200"
      mb={8}
    >
      <BreadcrumbCurrentLink>
        Union: <b>{unionName}</b>
      </BreadcrumbCurrentLink>
      <Link href="/farmer-certification/manage-farmers">
        <BreadcrumbLink>
          Cooperative: <b>{coName}</b>
        </BreadcrumbLink>
      </Link>
      <BreadcrumbCurrentLink as="span">
        Collection Center: <b>{ccName}</b>
      </BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  );
}
