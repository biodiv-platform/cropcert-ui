import { TabIndices } from "@static/constants";
import React, { useMemo } from "react";

import ShowTabs from "./traceability-workflow";

const TraceabilityShowPage = ({ page }) => {
  const selectedTab = useMemo(() => {
    switch (page) {
      case "batch":
        return TabIndices.BATCH;
      case "lot":
        return TabIndices.LOT;
      default:
        return TabIndices.FARMER_PRODUCE;
    }
  }, [page]);

  return <ShowTabs selectedTab={selectedTab} />;
};

TraceabilityShowPage.getInitialProps = async (ctx) => {
  return { page: ctx.query.id };
};

export default TraceabilityShowPage;
