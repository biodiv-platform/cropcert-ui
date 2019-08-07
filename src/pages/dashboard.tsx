import Container from "@components/@core/container";
import Dashboard from "@components/@core/dashboard";
import { BACKGROUND, ROLES } from "@utils/constants";
import React from "react";

export default function DashboardPage() {
  return (
    <Container roles={[ROLES.AUTHORIZED]} background={BACKGROUND.GRAY}>
      <Dashboard />
    </Container>
  );
}
