import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
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
      <BreadcrumbItem isCurrentPage={true}>
        <BreadcrumbLink>
          Union: <b>{unionName}</b>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="/farmer-certification/manage-farmers">
          Cooperative: <b>{coName}</b>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink as="span">
          Collection Center: <b>{ccName}</b>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
