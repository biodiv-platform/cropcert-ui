import { SimpleGrid } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

import SideBar from "./sidebar";
import UserEditTabs from "./tabs";

export interface UserEditPageComponentProps {
  user;
  isAdmin?: boolean;
}

export default function UserEditPageComponent({ user, isAdmin }: UserEditPageComponentProps) {
  return (
    <Container py={6}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 0, md: 6 }}>
        <SideBar user={user} />
        <UserEditTabs isAdmin={isAdmin} user={user} />
      </SimpleGrid>
    </Container>
  );
}
