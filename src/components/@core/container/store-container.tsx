import { Box } from "@chakra-ui/core";
import { TOKEN } from "@static/constants";
import authStore from "@stores/auth.store";
import pagesStore from "@stores/pages.store";
import { createStore, StoreProvider } from "easy-peasy";
import useNookies from "next-nookies-persist";
import React from "react";

import Navbar from "../navmenu";
import Footer from "./footer";

function StoreContainer({ extras }) {
  const { Component, pageProps } = extras;
  const { nookies } = useNookies();
  const hybridStore = createStore(
    { ...authStore, ...pagesStore },
    {
      initialState: { user: nookies[TOKEN.USER] || {}, pages: pageProps.pages },
    }
  );

  return (
    <StoreProvider store={hybridStore}>
      <Navbar />
      <Box width="full" maxWidth="1280px" mx="auto" p={6} minHeight="var(--page-height)">
        <Component {...pageProps} />
      </Box>
      <Footer />
    </StoreProvider>
  );
}

export default StoreContainer;
