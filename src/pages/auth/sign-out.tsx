import { Heading } from "@chakra-ui/core";
import { TOKEN } from "@static/constants";
import { removeNookie } from "next-nookies-persist";
import Router from "next/router";
import React, { useEffect } from "react";

const SignOutPage = () => {
  useEffect(() => {
    removeNookie(TOKEN.AUTH);
    removeNookie(TOKEN.USER);
    Router.push("/");
  }, []);

  return <Heading fontStyle="italic">Logging you out...</Heading>;
};

SignOutPage.getInitialProps = ({ ctx }) => {
  removeNookie(TOKEN.AUTH, ctx);
  removeNookie(TOKEN.USER, ctx);
};

export default SignOutPage;
