import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

import UserInfoSidebar from "./sidebar";
import UserAbout from "./user-info-tabs/about/user-about";
import UserLocationMap from "./user-info-tabs/about/user-location-map";

export default function UserShowPageComponent({ user }) {
  return (
    <Container py={6}>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 0, md: 6 }}>
        <UserInfoSidebar user={user} />

        <GridItem colSpan={3}>
          <UserLocationMap coordinates={[user.longitude, user.latitude]} />
          <UserAbout user={user} />
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}
