import { Button, Flex, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { LuUndoDot } from "react-icons/lu";

import {
  MenuCheckboxItem,
  MenuContent,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Tooltip } from "@/components/ui/tooltip";

export default function ManageColumnDropdown({ columnList, allColumns, setVisibleColumns }) {
  const { t } = useTranslation();
  const [defaultColumns, setDefaultColumns] = useState(columnList);

  useEffect(() => {
    setDefaultColumns([...columnList]);
  }, []);

  const isAllSelected = columnList.length === allColumns.length;
  const isIndeterminate = columnList.length > 0 && columnList.length < allColumns.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setVisibleColumns([]);
    } else {
      const sortedColumns = [...allColumns].sort(
        (a, b) =>
          allColumns.findIndex((col) => col.name === a.name) -
          allColumns.findIndex((col) => col.name === b.name)
      );
      setVisibleColumns(sortedColumns);
    }
  };

  const toggleColumnVisibility = (columnName) => {
    setVisibleColumns((prevColumns) => prevColumns.filter((column) => column.name !== columnName));
  };

  const restoreColumn = (columnName) => {
    const columnToRestore = allColumns.find((col) => col.name === columnName);

    if (columnToRestore) {
      setVisibleColumns((prevColumns) => {
        // Check if the column is already in the visible columns
        if (prevColumns.some((col) => col.name === columnToRestore.name)) {
          return prevColumns;
        }

        const newColumns = [...prevColumns, columnToRestore];
        return newColumns.sort(
          (a, b) =>
            allColumns.findIndex((col) => col.name === a.name) -
            allColumns.findIndex((col) => col.name === b.name)
        );
      });
    }
  };

  return (
    <MenuRoot positioning={{ placement: "top-end" }} closeOnSelect={false}>
      <MenuTrigger asChild position={"absolute"} bottom="8px" left="10px">
        <Button variant="outline" size="sm">
          {t("traceability:table.manage_columns")}
        </Button>
      </MenuTrigger>
      <MenuContent
        maxHeight={"400px"}
        maxWidth={"200px"}
        overflowY={"scroll"}
        shadow={"md"}
        borderWidth={1}
        borderColor={"gray.200"}
      >
        <MenuItemGroup>
          <Flex justifyContent="space-between" alignItems="center" py={1} pl={1}>
            <Text fontWeight={"bold"}>{t("traceability:table.columns")}</Text>
            <Tooltip showArrow openDelay={100} content={t("traceability:table.restore_columns")}>
              <Button
                variant="ghost"
                onClick={() => setVisibleColumns([...defaultColumns])}
                size="xs"
                focusRingStyle={"none"}
              >
                <LuUndoDot />
              </Button>
            </Tooltip>
          </Flex>
          <MenuCheckboxItem
            value="select-all"
            checked={isAllSelected}
            onCheckedChange={toggleAll}
            className={isIndeterminate ? "indeterminate" : ""}
          >
            {t("traceability:table.select_all")}
          </MenuCheckboxItem>
          {allColumns.map((column) => (
            <MenuCheckboxItem
              key={column.name}
              value={column.name}
              checked={columnList.some((col) => col.name === column.name)}
              onCheckedChange={() =>
                columnList.some((col) => col.name === column.name)
                  ? toggleColumnVisibility(column.name)
                  : restoreColumn(column.name)
              }
            >
              {column.name}
            </MenuCheckboxItem>
          ))}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
}
