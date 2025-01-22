import { Box } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import WKTCoverage from "./wkt-coverage";

export default function Coverage() {
  const { t } = useTranslation();

  return (
    <Box mb={6}>
      <PageHeading mr={4} size={"3xl"}>
        ⭐ {t("form:coverage.title")}
      </PageHeading>
      <WKTCoverage name="docCoverageData" />
    </Box>
  );
}
