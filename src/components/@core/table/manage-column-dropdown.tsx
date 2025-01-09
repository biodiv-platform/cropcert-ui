import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";

export default function ManageColumnDropdown({ columnList, allColumns, setVisibleColumns }) {
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
    <Menu>
      <MenuButton as={Button} position={"absolute"} bottom="8px" left="10px" variant={"outline"}>
        Manage Columns
      </MenuButton>
      <MenuList maxHeight={"400px"} overflowY={"scroll"} shadow={"md"}>
        {allColumns.map((column) => (
          <MenuItem key={column.name}>
            <Checkbox
              isChecked={columnList.some((col) => col.name === column.name)}
              onChange={() =>
                columnList.some((col) => col.name === column.name)
                  ? toggleColumnVisibility(column.name)
                  : restoreColumn(column.name)
              }
            >
              {column.name}
            </Checkbox>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
