import "../styles/global.scss";

import { Box, ChakraProvider } from "@chakra-ui/react";
import Footer from "@components/@core/container/footer";
import Navbar from "@components/@core/navmenu";
import { GlobalStateProvider } from "@hooks/use-global-store";
import { axListPages } from "@services/page.service";
import { SITE_TITLE } from "@static/constants";
import { customTheme } from "@static/theme";
import { getParsedUser } from "@utils/auth.util";
import App, { AppContext } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import BusProvider from "react-gbus";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MainApp({ Component, pageProps, user, pages }) {
  return (
    <GlobalStateProvider user={user} pages={pages}>
      <BusProvider>
        <ChakraProvider theme={customTheme}>
          <Head>
            <title>{SITE_TITLE}</title>
          </Head>
          <Navbar />
          <Box width="full" maxWidth="1280px" mx="auto" p={6} minHeight="var(--page-height)">
            <Component {...pageProps} />
          </Box>
          <Footer />
        </ChakraProvider>
      </BusProvider>
    </GlobalStateProvider>
  );
}

MainApp.getInitialProps = async (appContext: AppContext) => {
  const { pageProps } = await App.getInitialProps(appContext);
  const pages = await axListPages();
  const user = getParsedUser(appContext.ctx);

  return {
    pageProps,
    user,
    pages,
  };
};

export default MainApp;
