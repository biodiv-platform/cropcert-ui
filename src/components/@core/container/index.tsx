import { NookiesProvider } from "next-nookies-persist";
import React from "react";

import StoreContainer from "./store-container";

const AppContainer = ({ extras }) => (
  <NookiesProvider initialValue={extras.pageProps.nookies}>
    <StoreContainer extras={extras} />
  </NookiesProvider>
);

export default AppContainer;
