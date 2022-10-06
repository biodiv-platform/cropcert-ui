import Container from "@components/@core/container";
import { InspectionReportProvider } from "@hooks/use-inspection-report";
import { setupDB } from "@utils/db";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import FarmerList from "./farmer-list";

export default function SelectFarmerComponent() {
  const [feCCCode, setfeCCCode] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    setupDB();
  }, []);

  useEffect(() => {
    if (router && router.query) {
      console.debug(router.query);
      setfeCCCode(router.query.feCCCode);
    }
  }, [router]);

  return (
    <Container>
      {feCCCode && (
        <InspectionReportProvider>
          <FarmerList feCCCode={feCCCode} />
        </InspectionReportProvider>
      )}
    </Container>
  );
}
