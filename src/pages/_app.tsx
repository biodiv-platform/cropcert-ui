import "../styles/global.scss";

import { ChakraProvider } from "@chakra-ui/react";
import AuthWall from "@components/@core/container/authwall";
import Footer from "@components/@core/container/footer";
import Metadata from "@components/@core/container/metadata";
import Navbar from "@components/@core/navmenu";
import SITE_CONFIG from "@configs/site-config";
import { GlobalStateProvider } from "@hooks/use-global-state";
import { axGetTree } from "@services/pages.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getParsedUser } from "@utils/auth";
import App, { AppContext } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import BusProvider from "react-gbus";

import { Toaster } from "@/components/ui/toaster";
import { customTheme } from "@/static/theme";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MainApp({ Component, pageProps, user, pages, languageId }) {
  const config = { footer: true, ...Component?.config };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={customTheme}>
        <GlobalStateProvider user={user} pages={pages} languageId={languageId}>
          <BusProvider>
            <Toaster />
            <Metadata />
            <Navbar />
            <main>
              <Component {...pageProps} />
            </main>
            {config?.footer && <Footer />}
            <AuthWall />
          </BusProvider>
        </GlobalStateProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

MainApp.getInitialProps = async (appContext: AppContext) => {
  const languageId = SITE_CONFIG.LANG.LIST[appContext.ctx.locale]?.ID;
  const { pageProps } = await App.getInitialProps(appContext);
  const pages = await axGetTree({ languageId });
  const user = getParsedUser(appContext.ctx);

  return {
    pageProps,
    user,
    pages: pages.data,
    languageId,
  };
};

export default MainApp;
