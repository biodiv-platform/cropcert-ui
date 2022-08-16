import Container from "@components/@core/container";
import { InspectionReportProvider } from "@hooks/use-inspection-report";
import { DB_CONFIG } from "@static/inspection-report";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import IndexedDBProvider from "use-indexeddb";

import FarmerList from "./farmer-list";

export default function SelectFarmerComponent() {
  const [feCCCode, setfeCCCode] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      console.debug(router.query);
      setfeCCCode(router.query.feCCCode);
    }
  }, [router]);

  return (
    <Container>
      {feCCCode && (
        <IndexedDBProvider config={DB_CONFIG}>
          <InspectionReportProvider>
            <FarmerList feCCCode={feCCCode} />
          </InspectionReportProvider>
        </IndexedDBProvider>
      )}
    </Container>
  );
}
