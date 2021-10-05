import { Heading } from "@chakra-ui/react";
import { TOKEN } from "@static/constants";
import { useRouter } from "next/router";
import { removeNookie } from "next-nookies-persist";
import React, { useEffect } from "react";

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    removeNookie(TOKEN.AUTH);
    removeNookie(TOKEN.USER);
    router.push("/");
  }, []);

  return <Heading fontStyle="italic">Logging you out...</Heading>;
};

SignOutPage.getInitialProps = ({ ctx }) => {
  removeNookie(TOKEN.AUTH, ctx);
  removeNookie(TOKEN.USER, ctx);
};

export default SignOutPage;
