import { Heading } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { removeCookies } from "@utils/auth";
import React, { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    removeCookies();
    window.location.assign("/");
  }, []);

  return (
    <Container>
      <Heading fontStyle="italic">Logging you out...</Heading>
    </Container>
  );
};

export default LogoutPage;
