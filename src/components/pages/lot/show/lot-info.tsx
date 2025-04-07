import { Badge, Box, Stack, Text } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import LotCell from "@components/@core/table/lot-cell";
import tooltipCell from "@components/@core/table/tooltip-cell";
import dynamic from "next/dynamic";
import React from "react";

import LotShowPanel from "./panel";
import SubAccordionPanel from "./sub-panel";

const FarmerMap = dynamic(
  () => import("@components/pages/farmer-member/map/geoJson-featureCollection-map"),
  { ssr: false }
);

export default function LotInfo({ lot, geojsonData }) {
  const geojsonWithFeatColl = Array.isArray(geojsonData)
    ? {
        type: "FeatureCollection",
        features: geojsonData,
      }
    : geojsonData;
  const basicInfoHeader = [
    {
      name: "#",
      selector: (row) => row["lotId"],
      maxWidth: "100px",
      sortable: true,
      cell: (row) => <LotCell {...row} />,
    },
    {
      name: "Name",
      selector: (row) => row["lotName"],
      width: "280px",
    },
    {
      name: "Type",
      selector: (row) => row["type"]?.toUpperCase(),
      maxWidth: "100px",
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
      maxWidth: "100px",
    },
    {
      name: "Lot Status",
      selector: (row) => row["lotStatus"],
      cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
    },
    {
      name: "Created At",
      selector: (row) => row["createdAt"],
      cell: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      name: "Note",
      selector: (row) => row["note"],
      cell: (row) => (row.note ? tooltipCell(row.note) : "N/A"),
    },
  ];

  return (
    <LotShowPanel icon="ℹ️" title="Information" isOpen={true}>
      <DataTable keyField="_id" columns={basicInfoHeader} noHeader={true} data={[lot]} />

      <Stack my={4}>
        <Text as={"b"} pl={2}>
          Parameters:
        </Text>
        <Box>
          {lot.modalFieldCombined &&
            lot.modalFieldCombined.map(
              (column, index) =>
                (column.columnStatus === "ADD" ||
                  column.columnStatus === "EDIT" ||
                  column.columnStatus === "DONE") && (
                  <SubAccordionPanel key={index} column={column} index={index} />
                )
            )}
        </Box>
      </Stack>

      {geojsonWithFeatColl && (
        <Stack direction={"column"} gap={2} width={"full"} my={4} mb={8} height={"400px"}>
          <Box
            rounded="md"
            borderWidth={1}
            borderColor={"gray.200"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <FarmerMap geojson={geojsonWithFeatColl} setGeojson={null} mode={"view"} />
          </Box>
        </Stack>
      )}
    </LotShowPanel>
  );
}
