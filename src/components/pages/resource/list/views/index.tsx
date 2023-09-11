import Loading from "@components/pages/common/loading";
import React, { Suspense } from "react";

import useResourceFilter from "../../common/use-resource-filter";

const GridView = React.lazy(() => import("./grid"));

export default function Views() {
  const { filter } = useResourceFilter();

  switch (filter?.view) {
    case "grid":
      return (
        <Suspense fallback={<Loading />}>
          <GridView />
        </Suspense>
      );

    default:
      return null;
  }
}
