import { Heading } from "@chakra-ui/react";
import { removeCookies } from "@utils/auth.util";
import React, { useEffect } from "react";

const SignOutPage = () => {
  useEffect(() => {
    removeCookies();
    window.location.assign("/");
  }, []);

  return <Heading fontStyle="italic">Logging you out...</Heading>;
};

export default SignOutPage;
