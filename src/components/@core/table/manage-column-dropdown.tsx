import { Button } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  MenuCheckboxItem,
  MenuContent,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

export default function ManageColumnDropdown({ columnList, allColumns, setVisibleColumns }) {
  const { t } = useTranslation();

  const toggleColumnVisibility = (columnName) => {
    setVisibleColumns((prevColumns) => prevColumns.filter((column) => column.name !== columnName));
  };

  const restoreColumn = (columnName) => {
    const columnToRestore = allColumns.find((col) => col.name === columnName);

    if (columnToRestore) {
      setVisibleColumns((prevColumns) => {
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
    <MenuRoot positioning={{ placement: "top-end" }}>
      <MenuTrigger asChild position={"absolute"} bottom="8px" left="10px">
        <Button variant="outline" size="sm">
          {t("traceability:table.manage_columns")}
        </Button>
      </MenuTrigger>
      <MenuContent maxHeight={"400px"} overflowY={"scroll"} shadow={"md"}>
        <MenuItemGroup title="Features">
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
