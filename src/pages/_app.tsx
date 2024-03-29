import "../styles/global.scss";

import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import AuthWall from "@components/@core/container/authwall";
import Footer from "@components/@core/container/footer";
import Metadata from "@components/@core/container/metadata";
import Navbar from "@components/@core/navmenu";
import SITE_CONFIG from "@configs/site-config";
import { GlobalStateProvider } from "@hooks/use-global-state";
import { axGetTree } from "@services/pages.service";
import { customTheme } from "@static/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getParsedUser } from "@utils/auth";
import App, { AppContext } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import BusProvider from "react-gbus";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MainApp({ Component, pageProps, user, pages, languageId }) {
  const { ToastContainer } = createStandaloneToast({ theme: customTheme });
  const config = { footer: true, ...Component?.config };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider user={user} pages={pages} languageId={languageId}>
        <BusProvider>
          <ToastContainer />
          <ChakraProvider theme={customTheme}>
            <Metadata />
            <Navbar />
            <main>
              <Component {...pageProps} />
            </main>
            {config?.footer && <Footer />}
            <AuthWall />
          </ChakraProvider>
        </BusProvider>
      </GlobalStateProvider>
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
