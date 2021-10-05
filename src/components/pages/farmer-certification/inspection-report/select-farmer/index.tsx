import { InspectionReportProvider } from "@hooks/use-inspection-report";
import { DB_CONFIG } from "@static/inspection-report";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import IndexedDBProvider from "use-indexeddb";

import FarmerList from "./farmer-list";

export default function SelectFarmerComponent() {
  const router = useRouter();
  const feCCCode = useMemo(() => Number(router.query.feCCCode) || -1, []);

  return (
    <div>
      <IndexedDBProvider config={DB_CONFIG}>
        <InspectionReportProvider>
          <FarmerList feCCCode={feCCCode} />
        </InspectionReportProvider>
      </IndexedDBProvider>
    </div>
  );
}
