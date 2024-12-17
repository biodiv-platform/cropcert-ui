import { Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export const inspectionReportColumns = [
  {
    name: "Farmer ID",
    selector: (row) => row["farmerId"],
    sortable: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row["name"],
  },
  {
    name: "Cooperative",
    selector: (row) => row["cooperativeName"],
  },
  {
    name: "CC Name",
    selector: (row) => row["collectionCenterName"],
  },
  {
    name: "Last Approved Certification",
    selector: (row) => row["version"],
    cell: ({ lastApprovedReportId }) =>
      lastApprovedReportId ? (
        <NextLink
          href={`/farmer-certification/inspection-report/show?pid=${lastApprovedReportId}`}
          passHref={true}
          legacyBehavior
        >
          <Button variant="outline" colorScheme="blue" size="xs" as={Link}>
            View Report
          </Button>
        </NextLink>
      ) : (
        "No Previous Report"
      ),
  },
  {
    name: "Pending Reports",
    selector: (row) => row["isReportFinalized"],
    width: "160px",
    cell: ({ isReportFinalized, reportId, lastApprovedReportId }) =>
      isReportFinalized ? (
        "No Pending Report"
      ) : (
        <NextLink
          href={`/farmer-certification/inspection-report/show?cid=${reportId}&pid=${lastApprovedReportId}`}
          passHref={true}
          legacyBehavior
        >
          <Button variant="outline" colorScheme="blue" size="xs" as={Link}>
            Manage Report
          </Button>
        </NextLink>
      ),
  },
];
