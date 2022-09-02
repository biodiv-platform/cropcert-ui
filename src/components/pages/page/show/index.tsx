import Container from "@components/@core/container";
import React from "react";

import { UsePagesProvider } from "../common/sidebar/use-pages-sidebar";
import { Content } from "./content.server";
import { PageHeader } from "./header";

interface PageShowPageComponentProps {
  page;
}

export default function PageShowPageComponent({ page }: PageShowPageComponentProps) {
  return (
    <UsePagesProvider currentPage={page} linkType="show">
      <PageHeader page={page} />

      <Container maxW="48rem" py={6}>
        <Content html={page.content} />
      </Container>
    </UsePagesProvider>
  );
}
