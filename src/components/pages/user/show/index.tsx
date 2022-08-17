import { Heading, Image } from "@chakra-ui/react";
import Container from "@components/@core/container";
import useGlobalState from "@hooks/use-global-store";
import { ENDPOINT } from "@static/constants";
import React from "react";

export default function UserShowPageComponent() {
  const { user } = useGlobalState();

  return (
    <Container pt={6}>
      <Heading>{user.name}</Heading>
      <Image src={`${ENDPOINT.ODK}/v1/app-user/qr-code?xmlFormId=pd_form_v2&projectId=2`} />
    </Container>
  );
}
