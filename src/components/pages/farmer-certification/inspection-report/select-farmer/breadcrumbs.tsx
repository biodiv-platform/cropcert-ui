import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/core";
import React from "react";

export default function Breadcrumbs({ ccName, coName, unionName }) {
  return (
    <Breadcrumb
      bg="white"
      px={4}
      py={2}
      borderRadius="md"
      border="1px solid"
      borderColor="gray.200"
      mb={8}
    >
      <BreadcrumbItem>
        <BreadcrumbLink>{unionName}</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="/farmer-certification/manage-farmers">{coName}</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">{ccName}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
