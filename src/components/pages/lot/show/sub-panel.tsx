import { Box, Text } from "@chakra-ui/react";
import DataTable from "@components/@core/table";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

export default function SubAccordionPanel({ column, index }) {
  const subAccordionColumns = [
    {
      name: "Field Name",
      selector: (row) => row["label"],
    },
    {
      name: "Value",
      selector: (row) => row["value"],
    },
  ];

  const columnStatus = {
    ADD: (
      <Box
        color="blue.600"
        px={1}
        borderRadius={4}
        borderColor={"blue.600"}
        borderWidth={1}
        fontSize={"sm"}
      >
        To be done
      </Box>
    ),
    EDIT: (
      <Box
        color="orange.600"
        px={1}
        borderRadius={4}
        borderColor={"orange.600"}
        borderWidth={1}
        fontSize={"sm"}
      >
        In Progress
      </Box>
    ),
    DONE: (
      <Box
        color="green.600"
        px={1}
        borderRadius={4}
        borderColor={"green.600"}
        borderWidth={1}
        fontSize={"sm"}
      >
        Finalized
      </Box>
    ),
  };
  return (
    <AccordionRoot multiple key={index} mb={4}>
      <AccordionItem
        boxShadow="md"
        bg="gray.50"
        mb={2}
        px={2}
        borderRadius="md"
        borderWidth={1}
        value="dataTable"
      >
        <h2>
          <AccordionItemTrigger>
            <Box
              as="h4"
              flex="1"
              textAlign="left"
              display={"flex"}
              gap={2}
              alignItems={"center"}
              justifyContent={"space-between"}
              pr={2}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Text color={"gray.800"}>{column.columnName}</Text>
                <Text fontSize="xs" color={"gray.600"}>
                  {new Date(column.lastUpdatedAt).toLocaleString()}
                </Text>
              </Box>
              <Box>{columnStatus[column.columnStatus]}</Box>
            </Box>
          </AccordionItemTrigger>
        </h2>
        <AccordionItemContent pb={4} bg="white" p={6} borderRadius="md">
          <DataTable
            keyField={column.modalFieldId}
            columns={subAccordionColumns}
            noHeader={true}
            data={column.fields.filter((f) => f.fieldType === "input")}
          />
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
