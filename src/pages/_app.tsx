import "../styles/global.scss";

import { ChakraProvider } from "@chakra-ui/react";
import AppContainer from "@components/@core/container";
import { axListPages } from "@services/page.service";
import { SITE_TITLE } from "@static/constants";
import { customTheme } from "@static/theme";
import { parseNookies } from "next-nookies-persist";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import BusProvider from "react-gbus";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        nookies: parseNookies(ctx),
        pages: (await axListPages()) || [],
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  }

  render() {
    return (
      <BusProvider>
        <ChakraProvider theme={customTheme}>
          <Head>
            <title>{SITE_TITLE}</title>
          </Head>
          <AppContainer extras={this.props} />
        </ChakraProvider>
      </BusProvider>
    );
  }
}
