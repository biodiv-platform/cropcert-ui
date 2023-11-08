import Container from "@components/@core/container";
import { RestrictedAccess } from "@components/@core/layout";
import FarmerMemberPageComponent from "@components/pages/farmer-member/list";
import React from "react";

export default function FarmerMemberListPage() {
  return (
    <RestrictedAccess>
      <Container>
        <FarmerMemberPageComponent />
      </Container>
    </RestrictedAccess>
  );
}
