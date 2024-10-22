import { Badge, Box, Stack, Text } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import tooltipCell from "@components/@core/table/tooltip-cell";
import dynamic from "next/dynamic";
import React from "react";

import LotShowPanel from "./panel";
import SubAccordionPanel from "./sub-panel";

const MultiMarkerMap = dynamic(
  () =>
    import("@components/pages/farmer-member/list/modals/multi-marker-map/geojson-multi-marker-map"),
  { ssr: false }
);

export default function LotInfo({ lot, geojsonData }) {
  const basicInfoHeader = [
    {
      name: "Type",
      selector: (row) => row["type"],
    },
    {
      name: "Quantity",
      selector: (row) => row["quantity"],
    },
    {
      name: "Created At",
      selector: (row) => row["createdAt"],
      cell: (row) => new Date(row.createdAt).toLocaleString(),
    },
    {
      name: "Lot Status",
      selector: (row) => row["lotStatus"],
      cell: ({ lotStatus }) => <Badge>{lotStatus?.split("_").join(" ")}</Badge>,
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
        <Text variant={"title"} as={"b"} pl={2}>
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

      {geojsonData && (
        <Stack direction={"column"} spacing={2} width={"full"} my={4} mb={8} height={"400px"}>
          <Box
            rounded="md"
            borderWidth={1}
            borderColor={"gray.200"}
            width={{ base: "full" }}
            height={{ base: "400", md: "full", lg: "full", xl: "full" }}
            overflow={"hidden"}
            boxShadow="md"
          >
            <MultiMarkerMap geojsonData={geojsonData} />
          </Box>
        </Stack>
      )}
    </LotShowPanel>
  );
}
