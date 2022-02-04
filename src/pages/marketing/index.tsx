import MarketingPageComponent from "@components/pages/marketing";
import { MarketingProvider } from "@components/pages/marketing/use-marketing";
import React from "react";

export default function MarketingPage() {
  return (
    <MarketingProvider>
      <MarketingPageComponent />
    </MarketingProvider>
  );
}
